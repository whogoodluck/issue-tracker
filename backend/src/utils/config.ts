import { config } from 'dotenv'

config()

const PORT: number | undefined = Number(process.env.PORT) || 3001

export default {
  PORT
}
