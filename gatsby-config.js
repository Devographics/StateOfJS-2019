require('dotenv').config()

module.exports = {
    siteMetadata: {
        title: `The State Of JavaScript`
    },
    plugins: [
        'gatsby-transformer-yaml',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: `${__dirname}/src/pages/`,
            }
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: `data`,
                path: `${__dirname}/src/data/`
            }
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: `translations`,
                path: `${__dirname}/src/translations/`
            }
        },
        {
            resolve: 'gatsby-source-graphql',
            options: {
                typeName: 'SurveyApi',
                fieldName: 'surveyApi',
                url: process.env.API_URL
            }
        },
        'gatsby-transformer-remark',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-plugin-netlify',
        'gatsby-plugin-styled-components'
        // 'gatsby-plugin-webpack-bundle-analyzer',
    ]
}
