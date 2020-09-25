import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import styled from 'styled-components'
import Trans from 'core/i18n/Trans'
import { emailOctopusUrl, emailOctopusCode, emailOctopusSiteKey } from 'core/constants'
const postUrl = emailOctopusUrl

const Container = styled.div``

const Email = styled.input`
    display: block;
    padding: ${props => props.theme.spacing / 2}px;
    border: none;
    margin-right: ${props => props.theme.spacing / 2}px;
    flex-grow: 1;
    width: 100%;
    max-width: 300px;
`

const ErrorFeedback = styled.div`
    padding: ${props => props.theme.spacing}px;
    margin-bottom: ${props => props.theme.spacing}px;
`

const SuccessFeedback = styled.div`
    border: ${props => props.theme.separationBorder};
    padding: ${props => props.theme.spacing}px;
`

export default class Newsletter extends Component {
    static propTypes = {
        line: PropTypes.string
    }

    state = {
        email: '',
        submitted: false,
        loading: false,
        error: null,
        success: null
    }

    handleChange = e => {
        const email = e.target.value
        this.setState({
            email
        })
    }

    handleSubmit = async e => {
        const { email } = this.state

        this.setState({ loading: true })

        e.preventDefault()
        ReactGA.event({
            category: 'Subscribe',
            action: `Newsletter subscribe`
        })
        const response = await fetch(postUrl, {
            method: 'POST',
            body: `field_0=${encodeURIComponent(email)}`,
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        const result = await response.json()
        const { error, message } = result

        this.setState({ loading: false })

        if (error) {
            this.setState({ error, success: null })
        } else {
            this.setState({ error: null, success: { message } })
        }
    }

    render() {
        const { email, loading, error, success } = this.state

        return (
            <Trans>
                {translate => {
                    const { submitLabel = translate('general.notify_me') } = this.props

                    return (
                        <Container className={`Newsletter Newsletter--${loading ? 'loading' : ''}`}>
                            {error && (
                                <ErrorFeedback className="Newsletter__Error">
                                    {error.message}
                                </ErrorFeedback>
                            )}
                            {success ? (
                                <SuccessFeedback>{success.message}</SuccessFeedback>
                            ) : (
                                <form
                                    method="post"
                                    action={postUrl}
                                    datasitekey={emailOctopusSiteKey}
                                    onSubmit={this.handleSubmit}
                                >
                                    <Email
                                        className="Newsletter__Email"
                                        id="field_0"
                                        name="field_0"
                                        type="email"
                                        placeholder={translate('general.your_email')}
                                        onChange={this.handleChange}
                                        value={email}
                                        disabled={loading}
                                    />
                                    <input
                                        type="text"
                                        name={emailOctopusCode}
                                        tabIndex="-1"
                                        autoComplete="nope"
                                        className="Newsletter__Hidden"
                                    />
                                    <button
                                        type="submit"
                                        name="subscribe"
                                        className="Newsletter__Button Button"
                                    >
                                        {submitLabel}
                                    </button>
                                </form>
                            )}
                        </Container>
                    )
                }}
            </Trans>
        )
    }
}
