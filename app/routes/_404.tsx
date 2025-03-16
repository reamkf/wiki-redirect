import { NotFoundHandler } from 'hono'

const handler: NotFoundHandler = (c) => {
  return c.redirect('/')
}

export default handler