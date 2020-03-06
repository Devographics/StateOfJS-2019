const path = require('path')

module.exports = {
    env: {
        API_URL: 'https://api.stateofjs.com'
    },
    webpack(cfg) {
        cfg.module.rules.push({
            test: /\.ya?ml$/,
            use: 'js-yaml-loader'
        })

        cfg.module.rules.push({
            test: /.md$/,
            use: ['html-loader', path.resolve('./markdown-loader')]
        })

        return cfg
    }
}
