import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: inline-flex;
    vertical-align: middle;
`

const ButtonGroup = ({ className, ...props }) => (
    <Container className={`ButtonGroup${className ? ` ${className}` : ''}`} {...props} />
)

export default ButtonGroup
