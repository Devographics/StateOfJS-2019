import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown/with-html'
import { useI18n } from 'core/i18n/i18nContext'
import mq from 'core/theme/mq'

const images = [
    'stateofjs2019tshirt1.jpg',
    'stateofjs2019tshirt2.jpg',
    'stateofjs2019tshirt-illustration.png'
]

const TshirtBlock = () => {
    const { translate } = useI18n()

    return (
        <Container>
            <ImagesContainer>
                {images.map((image, i) => (
                    <Image key={i}>
                        <a
                            href={`/images/tshirt/${image}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={`/images/tshirt/${image}`}
                                alt={translate('tshirt.stateofjs')}
                            />
                        </a>
                    </Image>
                ))}
            </ImagesContainer>
            <Description>
                <h2>{translate('tshirt.about')}</h2>
                <div>
                    <ReactMarkdown source={translate('tshirt.description')} escapeHtml={false} />
                </div>
                <a
                    className="Button Tshirt__Button gumroad-button"
                    href="https://gumroad.com/l/stateofjs-tshirt"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {translate('tshirt.getit')} –{' '}
                    {translate('tshirt.price', { values: { price: 24 } })}
                </a>
            </Description>
        </Container>
    )
}

const Container = styled.div`
    border: ${props => props.theme.separationBorder};

    @media ${mq.mediumLarge} {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`

const ImagesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;

    @media ${mq.small} {
        border-bottom: ${props => props.theme.separationBorder};
    }
    @media ${mq.mediumLarge} {
        border-right: ${props => props.theme.separationBorder};
    }

    img {
        display: block;
        width: 100%;
    }
`

const Image = styled.div`
    &:nth-child(1) {
        border-bottom: ${props => props.theme.separationBorder};
        grid-column-start: 1;
        grid-column-end: 3;
    }

    &:nth-child(2) {
        border-right: ${props => props.theme.separationBorder};
    }
`

const Description = styled.div`
    @media ${mq.small} {
        padding: ${props => props.theme.spacing}px;
    }
    @media ${mq.mediumLarge} {
        padding: ${props => props.theme.spacing * 2}px;
    }
    h2 {
        margin-bottom: ${props => props.theme.spacing / 4}px;
    }
    h3 {
        font-size: ${props => props.theme.typography.sizes.medium};
    }
`

export default TshirtBlock
