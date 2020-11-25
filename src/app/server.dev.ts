require('dotenv').config()
import initializeApp from './app'

const PORT = 8888

const app = initializeApp()
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
