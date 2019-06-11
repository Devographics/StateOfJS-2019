import React, { createContext, useContext } from 'react'
import { StaticQuery, graphql } from 'gatsby'

export const EntitiesContext = createContext()

const entitiesQuery = graphql`
    query {
        entities: allEntitiesYaml {
            edges {
                node {
                    id
                    name
                    homepage
                    aliases
                }
            }
        }
        features: allFeaturesYaml {
            edges {
                node {
                    id
                    name
                    aliases
                }
            }
        }
        resources: allResourcesYaml {
            edges {
                node {
                    id
                    name
                    homepage
                    aliases
                }
            }
        }
    }
`

const findEntity = (entities, key) =>
    entities.find(({ id, name, aliases }) => {
        const lowerCaseKey = key.toLowerCase()
        const idMatch = id.toLowerCase() === lowerCaseKey
        const nameMatch = name.toLowerCase() === lowerCaseKey
        const aliasMatch = aliases && aliases.some(a => a.toLowerCase() === lowerCaseKey)
        return idMatch || nameMatch || aliasMatch
    })

export const EntitiesContextProvider = ({ children }) => {
    return (
        <StaticQuery query={entitiesQuery}>
            {({ entities: _entities, features: _features, resources: _resources }) => {
                const entities = _entities.edges.map(t => t.node)
                const features = _features.edges.map(t => t.node)
                const resources = _resources.edges.map(t => t.node)

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
                    <EntitiesContext.Provider value={{ getName, getUrl }}>
                        {children}
                    </EntitiesContext.Provider>
                )
            }}
        </StaticQuery>
    )
}

export const useEntities = () => useContext(EntitiesContext)
