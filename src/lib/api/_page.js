// Temporal file to help me getting the required data for each page
import { computeSitemap } from '../../../node_src/sitemap'
import rawSitemap from '../../../config/raw_sitemap.yml'
import omit from 'lodash/omit'
import compact from 'lodash/compact'
import upperFirst from 'lodash/upperFirst'
import indentString from 'indent-string'

const cleanIdString = id => id.replace(new RegExp('-', 'g'), '_')

export async function getPage(path) {
    const { flat } = await computeSitemap(rawSitemap)
    return flat.find(page => page.path === path)
}

export const getPageContext = page => {
    const context = omit(page, ['path', 'children'])
    context.basePath = page.path

    return {
        ...context,
        ...page.data
    }
}

export const getPageQuery = page => {
    const { id, blocks } = page
    if (!blocks) {
        return
    }
    const queries = compact(blocks.map(b => b.query))
    if (queries.length === 0) {
        return
    }
    const variables = compact(blocks.map(b => b.queryVariables))
    return `query page${upperFirst(cleanIdString(id))}Query${
        variables.length > 0 ? `(${variables.join(', ')})` : ''
    } {
${indentString(queries.join('\n'), '    ')}
}`
}
