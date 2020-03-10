import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import styled, { ThemeContext } from 'styled-components'
import Modal from 'react-modal'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import mq from 'core/theme/mq'
import Button from 'core/components/Button'
import { useI18n } from 'core/i18n/i18nContext'

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next')

const ExportIcon = () => (
    <Icon
        className="mobile"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        x="0"
        y="0"
        viewBox="0 0 24 24"
    >
        <g
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth={1}
        >
            <path d="M20.5 23.5L3.5 23.5 3.5 0.5 14.5 0.5 20.5 6.5z"></path>
            <path d="M14.5 0.5L14.5 6.5 20.5 6.5"></path>
            <path d="M6.5 8.5H17.5V20.5H6.5z"></path>
            <path d="M6.5 11.5L17.5 11.5"></path>
            <path d="M6.5 14.5L17.5 14.5"></path>
            <path d="M6.5 17.5L17.5 17.5"></path>
            <path d="M10.5 8.5L10.5 20.5"></path>
        </g>
    </Icon>
)

const BlockExport = ({ data, block, title }) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const theme = useContext(ThemeContext)
    const { translate } = useI18n()

    const { id, query } = block

    const closeModal = () => {
        setIsOpen(false)
    }

    const isArray = Array.isArray(data)

    // try to remove entities data
    const cleanedData = isArray
        ? data.map(row => {
              const { entity, ...rest } = row
              return rest
          })
        : data

    const jsonExport = JSON.stringify(cleanedData, '', 2)

    // Split the query by new lines
    const queryParts = query.split('\n')
    // Use the length of the last line (it's an empty line) as the tab size
    const tabLength = queryParts[queryParts.length - 1].length
    // Regex to remove the tabs
    const tabRegex = new RegExp(`^\\s{${tabLength}}`)
    const trimmedQuery = queryParts
        .slice(1, -1)
        .map(s => s.replace(tabRegex, ''))
        .join('\n')

    const graphQLExport = `query ${camelCase(id)}Query {
${trimmedQuery}
}`

    const customStyles = {
        overlay: {
            backgroundColor: `${theme.colors.backgroundInverted}bb`
        },
        content: {
            borderWidth: 0,
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0
        }
    }

    return (
        <>
            <ButtonWrapper>
                <ExportButton
                    className="ExportButton"
                    size="small"
                    onClick={() => {
                        setIsOpen(true)
                    }}
                >
                    <span className="desktop">{translate('export.export')}</span>
                    <ExportIcon />
                </ExportButton>
            </ButtonWrapper>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Content>
                    <h3>{translate('export.title', { values: { title } })}</h3>
                    <Tabs>
                        <TabList>
                            <Tab>JSON</Tab>
                            <Tab>GraphQL</Tab>
                        </TabList>
                        <TabPanel>
                            <Text value={jsonExport} />
                        </TabPanel>
                        <TabPanel>
                            <Text value={graphQLExport} />
                            <Message
                                dangerouslySetInnerHTML={{ __html: translate('export.graphql') }}
                            />
                        </TabPanel>
                    </Tabs>
                </Content>
            </Modal>
        </>
    )
}

const Text = ({ value }) => {
    const text = React.createRef()
    const handleClick = () => {
        text.current.select()
    }
    return <TextArea value={value} readOnly ref={text} onClick={handleClick} />
}

BlockExport.propTypes = {
    id: PropTypes.string.isRequired
}

const ButtonWrapper = styled.div`
    .capture & {
        display: none;
    }
`

const ExportButton = styled(Button)`
    margin-left: ${({ theme }) => theme.spacing / 2}px;

    @media ${mq.small} {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        &.Button--small {
            padding: 0;
        }
    }
`

const Icon = styled.svg`
    stroke: ${({ theme }) => theme.colors.link};
    height: 16px;
    width: 16px;

    ${ExportButton}:hover & {
        stroke: ${({ theme }) => theme.colors.contrast};
    }
`

const Content = styled.div`
    padding: ${({ theme }) => theme.spacing}px;
    background: ${({ theme }) => theme.colors.background};

    .react-tabs__tab {
        border: 0;
        border-radius: 3px 3px 0 0;
    }

    .react-tabs__tab--selected {
        color: ${({ theme }) => theme.colors.textInverted};
    }

    .react-tabs__tab-list {
        margin: 0;
        border-bottom: 0;
    }

    .react-tabs__tab--selected {
        background: ${({ theme }) => theme.colors.backgroundInverted};
    }

    .react-tabs__tab-panel {
        background: ${({ theme }) => theme.colors.backgroundInverted};
        padding: ${({ theme }) => theme.spacing / 2}px;
        color: ${({ theme }) => theme.colors.textInverted};
    }

    p {
        padding: ${({ theme }) => theme.spacing / 2}px;
        margin: 0;
    }
`

const Message = styled.div`
    max-width: 600px;
    font-size: ${({ theme }) => theme.typography.sizes.small};
`

const TextArea = styled.textarea`
    width: 100%;
    font-size: ${({ theme }) => theme.typography.sizes.small};
    padding: ${({ theme }) => theme.spacing / 2}px;
    border: 0;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.text};

    &:focus {
        outline: 0;
    }

    @media ${mq.small} {
        height: 150px;
    }
    @media ${mq.mediumLarge} {
        height: 400px;
    }
`

export default BlockExport
