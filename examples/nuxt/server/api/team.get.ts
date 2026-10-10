export default defineEventHandler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return [
    { name: 'Grace Hopper', role: 'Compiler Lead' },
    { name: 'Alan Turing', role: 'Research' },
    { name: 'Katherine Johnson', role: 'Flight Dynamics' },
  ]
})
