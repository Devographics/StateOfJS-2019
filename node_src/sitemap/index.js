const fs = require('fs')
const { findIndex, findLastIndex, omit, template, pick } = require('lodash')
const yaml = require('js-yaml')

const rawPageTemplates = fs.readFileSync('./config/page_templates.yml', 'utf8')
const rawBlockTemplates = fs.readFileSync('./config/block_templates.yml', 'utf8')
const globalVariables = yaml.safeLoad(fs.readFileSync('./config/variables.yml', 'utf8'))

const injectVariables = (yamlObject, variables) => {
    // convert template object back to string for variables injection
    const templateString = yaml.dump(yamlObject)
    // Inject variables in raw yaml templates
    const interpolatedTemplate = template(templateString)(variables)
    // convert raw populated template to object
    const populatedTemplate = yaml.safeLoad(interpolatedTemplate)

    return populatedTemplate
}

const applyTemplate = (config, templateName, rawTemplates, parent) => {
    // load raw templates
    const templates = yaml.safeLoad(rawTemplates)

    // pick the corresponding template
    const templateObject = templates[templateName]
    if (!templateObject) {
        throw new Error(`No template named "${templateName}" found.`)
    }

    // defines all available variables to be injected
    // at build time in the GraphQL queries
    const variables = {
        ...(templateObject.defaultVariables || {}),
        ...globalVariables,
        id: config.id,
        ...(config.variables || {})
    }
    if (parent) {
        variables.parentId = parent.id
    }

    const populatedTemplate = injectVariables(templateObject, variables)

    return {
        ...populatedTemplate,
        ...config
    }
}

exports.pageFromConfig = (stack, config, parent, pageIndex) => {
    // if template has been provided, apply it
    if (config.template) {
        config = applyTemplate(config, config.template, rawPageTemplates, parent)
    }

    const pagePath = config.path || `/${config.id}`
    const page = {
        ...config,
        path: parent === undefined ? pagePath : `${parent.path.replace(/\/$/, '')}${pagePath}`,
        is_hidden: !!config.is_hidden,
        children: [],
        pageIndex
    }
    // if page has no defaultBlockType, get it from parent
    if (!page.defaultBlockType) {
        page.defaultBlockType = (parent && parent.defaultBlockType) || 'default'
    }

    if (!page.path.endsWith('/')) {
        page.path = `${page.path}/`
    }

    if (Array.isArray(page.blocks)) {
        page.blocks = page.blocks.map(block => {
            // if template has been provided, apply it

            // if block has variables, inject them based on current page and global variables
            if (block.variables) {
                block.variables = injectVariables(block.variables, {
                    ...config,
                    ...globalVariables
                })
            }

            if (block.template) {
                block = applyTemplate(block, block.template, rawBlockTemplates, page)
            }

            // if block type is missing, get it from parent
            if (!block.blockType) {
                block.blockType = page.defaultBlockType
            }

            return {
                ...block,
                path: `${page.path}${block.id}/`
            }
        })
    }

    if (parent === undefined) {
        stack.hierarchy.push(page)
    }
    stack.flat.push(page)

    if (Array.isArray(config.children)) {
        config.children.forEach(child => {
            page.children.push(exports.pageFromConfig(stack, child, page, pageIndex))
        })
    }

    return page
}

let computedSitemap = null

exports.computeSitemap = async rawSitemap => {
    if (computedSitemap !== null) {
        return computedSitemap
    }

    const stack = {
        flat: [],
        hierarchy: []
    }

    rawSitemap.forEach((item, pageIndex) => {
        exports.pageFromConfig(stack, item, undefined, pageIndex)
    })

    // assign prev/next page using flat pages
    stack.flat.forEach(page => {
        // if the page is hidden, do not generate pagination for it
        if (page.is_hidden) return

        const index = findIndex(stack.flat, p => p.path === page.path)
        const previous = stack.flat[index - 1]

        // we exclude hidden pages from pagination
        if (previous !== undefined && previous.is_hidden !== true) {
            page.previous = omit(previous, ['is_hidden', 'previous', 'next', 'children', 'blocks'])
        }

        const lastIndex = findLastIndex(stack.flat, p => p.path === page.path)
        const next = stack.flat[lastIndex + 1]

        // we exclude hidden pages from pagination
        if (next !== undefined && next.is_hidden !== true) {
            page.next = omit(next, ['is_hidden', 'previous', 'next', 'children', 'blocks'])
        }
    })

    const now = new Date()
    const sitemapContent = [
        `###################################################################`,
        `# DO NOT EDIT`,
        `###################################################################`,
        `# this file was generated by \`gatsby-node.js\``,
        `# please edit \`raw_sitemap.yaml\` instead.`,
        `# generated on: ${now.toISOString()}`,
        `###################################################################`,
        yaml.dump(stack.hierarchy, { noRefs: true })
    ].join('\n')
    await fs.writeFileSync('./config/sitemap.yml', sitemapContent)

    return stack
}
