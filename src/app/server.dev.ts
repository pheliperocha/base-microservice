require('dotenv').config()
import initializeApp from './app'

const PORT = 8000

const app = initializeApp()
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
