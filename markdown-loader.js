const marked = require('marked')
const matter = require('gray-matter')

module.exports = markdown => {
    const { content } = matter(markdown)
    return marked(content)
}
