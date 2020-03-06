import fetch from 'node-fetch'

async function getGraphqlError(res) {
    try {
        const { errors } = await res.json()
        return errors[0]
    } catch (err) {
        return { message: res.statusText }
    }
}

async function getError(res) {
    const graphqlError = await getGraphqlError(res)
    const error = new Error(`GraphQL API error (${res.status}): ${graphqlError.message}`)

    error.status = res.status
    error.headers = res.headers.raw()

    return error
}

export default async function graphqlFetch(url, body) {
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(body)
    })

    if (res.ok) return res.json()
    throw await getError(res)
}
