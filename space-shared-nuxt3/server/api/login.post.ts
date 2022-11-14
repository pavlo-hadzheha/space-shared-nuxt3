export default defineEventHandler(async () => {
  console.log('here')
  console.log(await $fetch(`${process.env.BASE_URL}/auth/login`))

  return await $fetch(`${process.env.BASE_URL}/auth/login`)
})
