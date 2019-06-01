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
                }
            }
        }
        features: allFeaturesYaml {
            edges {
                node {
                    id
                    name
                }
            }
        }
        resources: allResourcesYaml {
            edges {
                node {
                    id
                    name
                    homepage
                }
            }
        }
    }
`

export const EntitiesContextProvider = ({ children }) => {
    return (
        <StaticQuery query={entitiesQuery}>
            {({ entities: _entities, features: _features, resources: _resources }) => {
                const entities = _entities.edges.map(t => t.node)
                const features = _features.edges.map(t => t.node)
                const resources = _resources.edges.map(t => t.node)

                const getName = id => {
                    const entity = entities.find(e => e.id === id)
                    const feature = features.find(e => e.id === id)
                    const resource = resources.find(e => e.id === id)
                    return (
                        (entity && entity.name) ||
                        (feature && feature.name) ||
                        (resource && resource.name) ||
                        id
                    )
                }

                const getUrl = id => {
                    const entity = entities.find(e => e.id === id)
                    const resource = resources.find(e => e.id === id)
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
