import authRoute from 'src/routes/authRoute'
import userRoute from 'src/routes/userRoute'
import express from 'express'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/',
    route: authRoute
  },
  {
    path: '/',
    route: userRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
