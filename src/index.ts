import app from './server'

const port = 5000

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
