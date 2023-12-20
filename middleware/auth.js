const { session } = await useSession()

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!session.value || !session.value._id) {
        return navigateTo('/login?redirect=' + to.path)
    }
})
