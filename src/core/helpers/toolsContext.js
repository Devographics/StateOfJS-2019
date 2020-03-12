import { createContext, useContext } from 'react'
import get from 'lodash/get'

export const ToolsContext = createContext()

export const ToolsContextProvider = ({ survey, children }) => {
    const { tools } = survey
    const getToolName = ({ id }) => {
        const tool = tools.find(t => t.id === id)
        return get(tool, 'entity.name')
    }

    return <ToolsContext.Provider value={{ getToolName }}>{children}</ToolsContext.Provider>
}

export const useTools = () => useContext(ToolsContext)
