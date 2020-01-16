import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { mq } from 'core/theme'
import Cell from './LogoCell'

const LogoCompact = () => {
    const theme = useContext(ThemeContext)

    return (
        <Container className="Logo">
            <Cell text="St" color={theme.colors.text} index={0} />
            <Cell text="Js" color={theme.colors.text} index={1} />
            <Cell text="20" color={theme.colors.contrast} index={2} />
            <Cell text="19" color={theme.colors.contrast} index={3} />
        </Container>
    )
}

const Container = styled.span`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-bottom: ${props => props.theme.separationBorder};

    @media ${mq.smallMedium} {
        border-bottom: 0;
    }
`

export default LogoCompact
