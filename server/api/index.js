export default defineEventHandler(async () => {
  return { message: `Api [${getSiteName()}]` }
})
