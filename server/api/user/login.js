import DKUser from '~/server/models/user.model'

export default defineEventHandler(async (event) => {
    const req = event.node.req
    const res = event.node.res
    res.setHeader('Content-Type', 'application/json')
    if (req.method === 'POST') {
        const body = await readBody(event)
        if (!body.username || !body.passwd) {
            res.statusCode = 400
            return res.end(str({ error: 'Missing parameters' }))
        }
        const data = await post(body)
        res.end(str(data))
    } else {
        res.statusCode = 405
        return res.end(str({ error: 'Unsupported method' }))
    }
})

async function post({ username, passwd }) {
    const hash = await Hash(username + passwd + config.SALT)
    const user = await DKUser.findOne({ username, passwd: hash }, { passwd: 0 })
    if (user === null) {
        return {
            error: 'User Not Found'
        }
    }
    return user
}
