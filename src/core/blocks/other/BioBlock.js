import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import styled from 'styled-components'
import mq from 'core/theme/mq'

const BioBlock = ({ subheading, heading, photo, bio }) => {
    return (
        <Bio className="Bio">
            {subheading && <h3 className="BioSubHeading">{subheading}</h3>}
            <BioContent className="BioContent">
                <BioPhoto className="BioPhoto">
                    <img src={photo} alt={heading} />
                </BioPhoto>
                <BioBio className="BioBio">
                    <BioHeading
                        className="BioHeading"
                        dangerouslySetInnerHTML={{ __html: heading }}
                    />
                    <ReactMarkdown source={bio} escapeHtml={false} />
                </BioBio>
            </BioContent>
        </Bio>
    )
}

const Bio = styled.div`
    background: ${({ theme }) => theme.colors.backgroundAlt};
    margin-top: ${({ theme }) => theme.spacing * 2}px;
    box-shadow: ${({ theme }) => theme.blockShadow};
`

const BioHeading = styled.h3`
    margin-bottom: ${({ theme }) => theme.spacing / 3}px;
`

const BioContent = styled.div`
    @media ${mq.large} {
        display: grid;
        grid-template-columns: 170px auto;
    }

    p:last-child {
        margin: 0;
    }
`

const BioBio = styled.div`
    padding: ${({ theme }) => theme.spacing}px;
    font-size: ${({ theme }) => theme.typography.sizes.smallish};
`

const BioPhoto = styled.div`
    overflow: hidden;

    @media ${mq.smallMedium} {
        max-width: 120px;
        margin: 0 auto;
        padding-top: ${({ theme }) => theme.spacing}px;
    }

    img {
        display: block;
        width: 100%;
    }
`

export default BioBlock
