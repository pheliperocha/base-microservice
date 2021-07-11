require('dotenv').config()
import { bootstrapServer } from '../bootstrap'

const PORT = process.env.PORT

const server = bootstrapServer()
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
