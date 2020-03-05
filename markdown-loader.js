const marked = require('marked')
const matter = require('gray-matter')

module.exports = markdown => {
    // console.log('MARKDOWN', marked(markdown))
    const { content } = matter(markdown)
    return marked(content)
}
