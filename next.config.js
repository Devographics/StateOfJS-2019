module.exports = {
    webpack(cfg) {
        cfg.module.rules.push({
            test: /\.ya?ml$/,
            use: 'js-yaml-loader'
        })
        return cfg
    }
}
