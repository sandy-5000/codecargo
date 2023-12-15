import DKUser from '~/server/models/user.model'

export default defineEventHandler(async (event) => {
    const users = await DKUser.find()
    console.log(users)
    return { message: 'Nuxt Server', users }
})