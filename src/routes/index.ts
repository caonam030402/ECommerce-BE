import authRoute from 'src/routes/authRoute'
import express from 'express'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/',
    route: authRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
