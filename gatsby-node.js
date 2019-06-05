const yaml = require('js-yaml')
const _ = require('lodash')
const fs = require('fs')
const path = require(`path`)
const { computeSitemap } = require('./node_src/sitemap')
const {
    fetchMdnResource,
    fetchCaniuseResource,
    fetchGithubResource,
    normalizeGithubResource
} = require('./node_src/resources')
const { omit } = require('lodash')

const rawSitemap = yaml.safeLoad(fs.readFileSync('./config/raw_sitemap.yml', 'utf8'))
const locales = yaml.safeLoad(fs.readFileSync('./config/locales.yml', 'utf8'))
const features = yaml.safeLoad(fs.readFileSync('./config/features.yml', 'utf8'))
const entities = yaml.safeLoad(fs.readFileSync('./config/entities.yml', 'utf8'))

const guessPageTemplate = type => {
    let template
    switch (type) {
        case 'features':
            template = 'modules/features/Features'
            break

        case 'tools':
            template = 'modules/tools/Tools'
            break

        default:
            throw new Error(`no template defined for page type: ${type}`)
    }

    return path.resolve(`./src/${template}Template.js`)
}

const localizedPath = (path, locale) =>
    locale.path === 'default' ? path : `/${locale.path}${path}`

const getPageContext = page => {
    const context = omit(page, ['path', 'children', 'is_hidden'])
    context.basePath = page.path

    return {
        ...context,
        ...page.data
    }
}

const createBlockPages = (page, context, createPage) => {
    if (!Array.isArray(page.blocks) || page.blocks.length === 0) {
        return
    }

    page.blocks.forEach(block => {
        locales.forEach(locale => {
            createPage({
                path: localizedPath(block.path, locale),
                component: path.resolve(`./src/core/share/ShareBlockTemplate.js`),
                context: {
                    ...context,
                    redirect: `${localizedPath(page.path, locale)}#${block.id}`,
                    block: block.id,
                    locale: locale.locale,
                    localePath: locale.path === 'default' ? '' : `/${locale.path}`
                }
            })
        })
    })
}

exports.createPages = async ({ actions: { createPage } }) => {
    const { flat } = await computeSitemap(rawSitemap)

    flat.forEach(page => {
        const context = getPageContext(page)
        if (page.type !== 'page') {
            const template = guessPageTemplate(page.type)

            locales.forEach(locale => {
                createPage({
                    path: localizedPath(page.path, locale),
                    component: template,
                    context: {
                        ...context,
                        locale: locale.locale,
                        localeLabel: locale.label,
                        localePath: locale.path === 'default' ? '' : `/${locale.path}`
                    }
                })
            })
        }

        createBlockPages(page, context, createPage)
    })
}

/**
 * Fix case for pages path, it's not obvious on OSX which is case insensitive,
 * but on some environments (eg. travis), it's a problem.
 *
 * Many pages are created from components, and we use upper first in that case
 * for the file name, so when gatsby generates the static page, it has the same name.
 *
 * Implement the Gatsby API “onCreatePage”.
 * This is called after every page is created.
 */
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage, deletePage } = actions

    const { flat } = await computeSitemap(rawSitemap)

    // handle 404 page separately
    const is404 = page.path.includes('404')

    const pagePath = page.path.toLowerCase()
    const matchingPage = flat.find(p => p.path === (is404 ? '/404/' : pagePath))

    // if there's no matching page
    // it means we're dealing with an internal page
    // thus, we don't create one for each locale
    if (matchingPage === undefined) {
        if (pagePath !== page.path) {
            deletePage(page)
            createPage({
                ...page,
                path: pagePath
            })
        }
        return
    }

    // add context, required for pagination
    const context = {
        ...page.context,
        ...getPageContext(matchingPage)
    }
    const newPage = {
        ...page,
        path: pagePath,
        context
    }

    deletePage(page)

    // create page for each available locale
    for (let locale of locales) {
        createPage({
            ...newPage,
            path: localizedPath(newPage.path, locale),
            context: {
                ...newPage.context,
                locale: locale.locale,
                localeLabel: locale.label,
                localePath: locale.path === 'default' ? '' : `/${locale.path}`
            }
        })
    }

    createBlockPages(page, context, createPage)
}

// Allow absolute imports and inject `ENV`
exports.onCreateWebpackConfig = ({ stage, actions, plugins }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules']
        },
        plugins: [
            plugins.define({
                ENV: stage === `develop` || stage === `develop-html` ? 'development' : 'production'
            })
        ]
    })
}

/*

When GitHub API rate limits are hit, GraphQL API will break
unless default values are provided.

*/
const defaultGitHubObject = {
    name: 'n/a',
    full_name: 'n/a',
    description: 'n/a',
    url: 'n/a',
    stars: 'n/a',
    forks: 'n/a',
    opened_issues: 'n/a',
    homepage: 'n/a'
}

exports.onCreateNode = async ({ node, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === `FeaturesUsageYaml`) {
        const nodeResources = []
        for (const agg of node.aggregations) {
            const aggResources = {
                id: agg.id
            }
            const featureResourcesConfig = features[agg.id]

            if (featureResourcesConfig !== undefined) {
                if (featureResourcesConfig.mdn !== undefined) {
                    aggResources.mdn = await fetchMdnResource(featureResourcesConfig.mdn)
                }
                if (featureResourcesConfig.caniuse !== undefined) {
                    aggResources.caniuse = await fetchCaniuseResource(
                        featureResourcesConfig.caniuse
                    )
                }
            }
            nodeResources.push(aggResources)
        }

        await createNodeField({
            name: `resources`,
            node,
            value: nodeResources
        })
    }

    if (node.internal.type === 'ToolsYaml') {
        const nodeResources = []
        for (const agg of node.aggregations) {
            const aggResources = {
                id: agg.id,
                github: defaultGitHubObject // pass default object to avoid GraphQL errors
            }
            const entityResourcesConfig = entities[agg.id]
            if (entityResourcesConfig) {
                aggResources.entity = entityResourcesConfig
                if (entityResourcesConfig.github) {
                    aggResources.github = await fetchGithubResource(entityResourcesConfig.github)
                }
            }
            nodeResources.push(aggResources)
        }

        await createNodeField({
            name: `resources`,
            node,
            value: nodeResources
        })
    }
}
