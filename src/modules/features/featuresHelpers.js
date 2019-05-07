export const mergeFeaturesResources = (features, resources) => {
    return features.map(feature => {
        return {
            ...feature,
            resources: resources.find(r => r.id === feature.id) || {}
        }
    })
}
