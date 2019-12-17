import React, { createContext, useContext } from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import variables from '../../../config/variables.yml'
import get from 'lodash/get'

export const ToolsContext = createContext()

const toolsQuery = graphql`
    query {
        surveyApi {
            survey(survey: js, year: 2019) {
                tools {
                    id
                    entity {
                        name
                    }
                }
            }
        }
    }
`

export const ToolsContextProvider = ({ children }) => {
    return (
        <StaticQuery query={toolsQuery}>
            {data => {
                const tools = get(data, 'surveyApi.survey.tools')
                const getToolName = ({ id }) => {
                    const tool = tools.find(t => t.id === id)
                    return get(tool, 'entity.name')
                }
                return (
                    <ToolsContext.Provider value={{ getToolName }}>
                        {children}
                    </ToolsContext.Provider>
                )
            }}
        </StaticQuery>
    )
}

export const useTools = () => useContext(ToolsContext)
