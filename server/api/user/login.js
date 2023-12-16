export default defineEventHandler(async (event) => {
    const req = event.node.req
    const res = event.node.res
    if (req.method === 'POST') {
        const body = await req.json()
        if (!body.username || !body.passwd) {
            res.statusCode = 400
            const error = { error: 'Missing parameters' }
            return res.end(JSON.stringify(error))
        }
        const data = await post(body)
        res.end(JSON.stringify(data))
    } else {
        res.statusCode = 405
        const error = { error: 'Unsupported method' }
        return res.end(JSON.stringify(error))
    }
})

async function post(data) {
    console.log(data)
    return data
}
