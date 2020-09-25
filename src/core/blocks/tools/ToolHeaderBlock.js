import React from 'react'
import { format } from 'd3-format'
import get from 'lodash/get'
import styled from 'styled-components'
import mq from 'core/theme/mq'
import ToolPeriodicElement from 'core/blocks/tools/ToolPeriodicElement'
import { useI18n } from 'core/i18n/i18nContext'
import periodicTableData from '../../../../config/periodic_table.yml'
import Button from 'core/components/Button'

const starsFormatter = format('.2s')

const ToolHeaderBlock = ({ block, data }) => {
    const { translate } = useI18n()

    const toolId = get(block, 'variables.toolId')
    const toolName = get(data, 'entity.name')
    const homepageLink = get(data, 'entity.homepage')
    const description = get(data, 'entity.description')
    const githubLink = get(data, 'entity.github.url')
    const stars = get(data, 'entity.github.stars')
    // const npmLink = get(data, 'entity.npm')

    return (
        <Container className="ToolHeader">
            <ElementWrapper className="ToolHeader__Element">
                <ToolPeriodicElement
                    tool={toolId}
                    name={toolName}
                    symbol={periodicTableData.tools[toolId] || '??'}
                />
            </ElementWrapper>
            <Content className="ToolHeader__Content">
                <Header className="ToolHeader__Header">
                    <Title className="ToolHeader__Title">{toolName}</Title>
                    {stars && (
                        <Stars className="ToolHeader__Stars">
                            {starsFormatter(stars)} {translate('block.tool.github_stars')}
                        </Stars>
                    )}
                </Header>
                <Description className="ToolHeader__Description">{description}</Description>
                <Links className="ToolHeader__Links">
                    {homepageLink && (
                        <Link
                            as="a"
                            size="small"
                            className="ToolHeader__Link"
                            href={homepageLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {translate('block.tool.homepage_link')}
                        </Link>
                    )}
                    {githubLink && (
                        <Link
                            as="a"
                            size="small"
                            className="ToolHeader__Link"
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </Link>
                    )}
                </Links>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    @media ${mq.small} {
        margin-bottom: ${props => props.theme.spacing * 2}px;
    }

    @media ${mq.mediumLarge} {
        display: flex;
        margin-bottom: ${props => props.theme.spacing * 4}px;
    }
`

const ElementWrapper = styled.div`
    svg {
        display: block;
    }

    @media ${mq.small} {
        max-width: 150px;
        margin: 0 auto ${props => props.theme.spacing / 4}px auto;
    }

    @media ${mq.mediumLarge} {
        flex-shrink: 1;
        flex-basis: 120px;
        margin-right: ${props => props.theme.spacing}px;
    }
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
`

const Title = styled.h2`
    margin: 0;
    padding: 0;
    align-items: baseline;

    @media ${mq.small} {
        display: none;
    }
    @media ${mq.medium} {
        font-size: 1.5rem;
    }
    @media ${mq.large} {
        font-size: 2rem;
    }
`

const Description = styled.div`
    @media ${mq.small} {
        text-align: center;
        margin: ${props => props.theme.spacing}px 0;
    }
`

const Content = styled.div`
    flex: 1;
`

const Stars = styled.div`
    @media ${mq.smallMedium} {
        display: none;
    }
`

const Links = styled.div`
    display: flex;
    align-items: center;
    margin-top: ${props => props.theme.spacing / 2}px;

    @media ${mq.small} {
        justify-content: center;
    }
`

const Link = styled(Button)`
    margin-right: ${props => props.theme.spacing / 2}px;
`

export default ToolHeaderBlock
