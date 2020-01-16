const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const _ = require('lodash')
const indentString = require('indent-string')
const { computeSitemap } = require('./node_src/sitemap/index.js')
// const {
//     fetchMdnResource,
//     fetchCaniuseResource,
//     fetchGithubResource,
//     normalizeGithubResource
// } = require('./node_src/resources')
const { omit } = require('lodash')

require('dotenv').config({
    path: `.env`
})

const rawSitemap = yaml.safeLoad(fs.readFileSync('./config/raw_sitemap.yml', 'utf8'))
const locales = yaml.safeLoad(fs.readFileSync('./config/locales.yml', 'utf8'))
const features = yaml.safeLoad(fs.readFileSync('./src/data/features.yml', 'utf8'))
const entities = yaml.safeLoad(fs.readFileSync('./src/data/entities.yml', 'utf8'))

const localizedPath = (path, locale) =>
    locale.path === 'default' ? path : `/${locale.path}${path}`

const getPageContext = page => {
    const context = omit(page, ['path', 'children'])
    context.basePath = page.path

    return {
        ...context,
        ...page.data
    }
}

const createBlockPages = (page, context, createPage) => {
    const blocks = page.blocks
    if (!Array.isArray(blocks) || blocks.length === 0) {
        return
    }

    blocks.forEach(block => {
        locales.forEach(locale => {
            const blockPage = {
                path: localizedPath(block.path, locale),
                component: path.resolve(`./src/core/share/ShareBlockTemplate.js`),
                context: {
                    ...context,
                    redirect: `${localizedPath(page.path, locale)}#${block.id}`,
                    block,
                    locale: locale.locale,
                    localePath: locale.path === 'default' ? '' : `/${locale.path}`
                }
            }
            createPage(blockPage)
        })
    })
}

const cleanIdString = id => id.replace(new RegExp('-', 'g'), '_')

/**
 * Loop over a page's blocks to assemble its page query
 *
 * Arguments: the page's $id
 */
const getPageQuery = page => {
    const { id, blocks } = page
    if (!blocks) {
        return
    }
    const queries = _.compact(blocks.map(b => b.query))
    if (queries.length === 0) {
        return
    }
    const variables = _.compact(blocks.map(b => b.queryVariables))
    return `query page${_.upperFirst(cleanIdString(id))}Query${variables.length > 0 ? `(${variables.join(', ')})` : ''} {
${indentString(queries.join('\n'), '    ')}
}`
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
    const { flat } = await computeSitemap(rawSitemap)
    for (const page of flat) {
        let pageData = {}
        const context = getPageContext(page)


        for (let index = 0; index < locales.length; index++) {
            const locale = locales[index]

            const pageQuery = getPageQuery(page)
            // console.log('// pageQuery')
    
            try {
                if (pageQuery) {
                    const queryResults = await graphql(`${pageQuery}`, { id: page.id, locale: locale.locale })
                    // console.log('// queryResults')
                    // console.log(JSON.stringify(queryResults.data, '', 2))
                    pageData = queryResults.data
                }
            } catch (error) {
                console.log(`// Error while loading data for page ${page.id}`)
                console.log(pageQuery)
                console.log(error)
            }

            createPage({
                path: localizedPath(page.path, locale),
                component: path.resolve(`./src/core/pages/PageTemplate.js`),
                context: {
                    ...context,
                    locale: locale.locale,
                    localeLabel: locale.label,
                    localePath: locale.path === 'default' ? '' : `/${locale.path}`,
                    pageData,
                    pageQuery, // passed for debugging purposes
                }
            })
        }

        createBlockPages(page, context, createPage)
    }
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
// const defaultGitHubObject = {
//     name: '',
//     full_name: '',
//     description: '',
//     url: '',
//     stars: -99,
//     forks: -99,
//     opened_issues: -99,
//     homepage: ''
// }

// exports.onCreateNode = async ({ node, actions }) => {
//     const { createNodeField } = actions

//     if (node.internal.type === `FeaturesUsageYaml`) {
//         const nodeResources = []
//         for (const agg of node.aggregations) {
//             const aggResources = {
//                 id: agg.id
//             }
//             const featureResourcesConfig = features.find(f => f.id === agg.id)

//             if (featureResourcesConfig !== undefined) {
//                 if (featureResourcesConfig.mdn !== undefined) {
//                     aggResources.mdn = await fetchMdnResource(featureResourcesConfig.mdn)
//                 }
//                 if (featureResourcesConfig.caniuse !== undefined) {
//                     aggResources.caniuse = await fetchCaniuseResource(
//                         featureResourcesConfig.caniuse
//                     )
//                 }
//             }
//             nodeResources.push(aggResources)
//         }

//         await createNodeField({
//             name: `resources`,
//             node,
//             value: nodeResources
//         })
//     }

//     if (node.internal.type === 'ToolsYaml') {
//         const nodeResources = []
//         for (const agg of node.aggregations) {
//             const aggResources = {
//                 id: agg.id,
//                 github: defaultGitHubObject // pass default object to avoid GraphQL errors
//             }
//             const entityResourcesConfig = entities.find(e => e.id === agg.id)
//             if (entityResourcesConfig) {
//                 aggResources.entity = entityResourcesConfig
//                 if (entityResourcesConfig.github) {
//                     aggResources.github = await fetchGithubResource(entityResourcesConfig.github)
//                 }
//             }
//             nodeResources.push(aggResources)
//         }

//         await createNodeField({
//             name: `resources`,
//             node,
//             value: nodeResources
//         })
//     }
// }
