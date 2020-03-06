import { createContext, useContext } from 'react'

export const EntitiesContext = createContext()

const findEntity = (entities, key) =>
    entities.find(({ id, name, aliases }) => {
        const lowerCaseKey = key.toLowerCase()
        const idMatch = id.toLowerCase() === lowerCaseKey
        const nameMatch = name.toLowerCase() === lowerCaseKey
        const aliasMatch = aliases && aliases.some(a => a.toLowerCase() === lowerCaseKey)
        return idMatch || nameMatch || aliasMatch
    })

export const EntitiesContextProvider = ({
    entities: { entities, features, resources },
    children
}) => {
    const getName = id => {
        const entity = findEntity(entities, id)
        const feature = findEntity(features, id)
        const resource = findEntity(resources, id)
        return (
            (entity && entity.name) ||
            (feature && feature.name) ||
            (resource && resource.name) ||
            id
        )
    }

    const getUrl = id => {
        const entity = findEntity(entities, id)
        const resource = findEntity(resources, id)
        return (entity && entity.homepage) || (resource && resource.homepage) || null
    }

    return (
        <EntitiesContext.Provider value={{ getName, getUrl }}>{children}</EntitiesContext.Provider>
    )
}

export const useEntities = () => useContext(EntitiesContext)
