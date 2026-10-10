// Slow on purpose, so the loading state is easy to see.
export default defineEventHandler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return {
    name: 'Ada Lovelace',
    role: 'Principal Engineer',
    bio: 'Writes analytical engines and the occasional Vue component. Enjoys long walks through the call stack.',
  }
})
