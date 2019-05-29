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
    }
`

export const EntitiesContextProvider = ({ children }) => {

    return (
        <StaticQuery query={entitiesQuery}>
            {({ entities: _entities, features: _features }) => {
                const entities = _entities.edges.map(t => t.node)
                const features = _features.edges.map(t => t.node)
                
                const getName = id => {
                  const entity = entities.find(e => e.id === id)
                  const feature = features.find(e => e.id === id)
                  return entity && entity.name || feature && feature.name || id
                }

                return (
                    <EntitiesContext.Provider value={{ getName }}>
                        {children}
                    </EntitiesContext.Provider>
                )
            }}
        </StaticQuery>
    )
}

export const useEntities = () => useContext(EntitiesContext)
