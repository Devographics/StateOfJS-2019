import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useI18n } from 'core/i18n/i18nContext'
import Modal from 'react-modal'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { Parser } from 'json2csv'

const parser = new Parser()

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0
    }
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#___gatsby')

const ExportIcon = () => (
    <svg
        className="Share__Icon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
    >
        <g
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            id="New_icons_1_"
            strokeWidth={2}
        >
            <line x1="11.5" y1="13.5" x2="11.5" y2="0.5" />
            <polyline points="7,5 11.5,0.5 16,5" />
            <polyline points="14.5,8.5 19.5,8.5 19.5,23.5 3.5,23.5 3.5,8.5 8.5,8.5" />
        </g>
    </svg>
)

const BlockExport = ({ data, block, title }) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const { translate } = useI18n()

    const { id, query } = block

    const closeModal = () => {
        setIsOpen(false)
    }

    const isArray = Array.isArray(data)
    const hasCSV = isArray

    // try to remove entities data
    const cleanedData = isArray
        ? data.map(row => {
              const { entity, ...rest } = row
              return rest
          })
        : data

    const jsonExport = JSON.stringify(cleanedData, '', 2)
    const csvExport = hasCSV && parser.parse(cleanedData)

    // remove first and last lines of query to remove "surveyApi" field
    const trimmedQuery = query
        .split('\n')
        .slice(1, -2)
        .join('\n')

    const graphQLExport = `query ${id}Query{
${trimmedQuery}
}`

    return (
        <div>
            <div className="export">
                <div
                    className="export-button button"
                    onClick={() => {
                        setIsOpen(true)
                    }}
                >
                    <span className="desktop">{translate('export.export')}</span>
                    <span className="mobile">
                        <ExportIcon />
                    </span>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="Export__Modal">
                    <h3>{translate('export.title', { title })}</h3>
                    <Tabs>
                        <TabList>
                            <Tab>JSON</Tab>
                            <Tab>CSV</Tab>
                            <Tab>GraphQL</Tab>
                        </TabList>
                        <TabPanel>
                            <textarea className="Export__Textarea" value={jsonExport} readOnly />
                        </TabPanel>
                        <TabPanel>
                            {hasCSV ? (
                                <textarea className="Export__Textarea" value={csvExport} readOnly />
                            ) : (
                                <div className="Export__Message Export__NoCSVMessage">
                                    {translate('export.nocsv')}
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel>
                            <textarea className="Export__Textarea" value={graphQLExport} readOnly />
                            <div className="Export__Message Export__GraphQLMessage">
                                {translate('export.nocsv')}
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </Modal>
        </div>
    )
}

BlockExport.propTypes = {
    id: PropTypes.string.isRequired
}

export default BlockExport
