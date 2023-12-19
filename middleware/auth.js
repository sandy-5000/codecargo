const authorized = false

export default defineNuxtRouteMiddleware((to, from) => {
    if (authorized) {
        return navigateTo(to.path)
    } else {
        return navigateTo('/login?redirect=' + to.path)
    }
})
