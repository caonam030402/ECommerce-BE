import authRoute from 'src/routes/authRoute'
import userRoute from 'src/routes/userRoute'
import productRoute from '~/routes/product/productRoute'
import categoryRoute from '~/routes/product/categoryRoute'
import purchaseRoute from '~/routes/purchaseRoute'
import dashboardRoute from '~/routes/dashboardRoute'
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
  },
  {
    path: '/products',
    route: productRoute
  },
  {
    path: '/categories',
    route: categoryRoute
  },
  {
    path: '/purchases',
    route: purchaseRoute
  },
  { path: '/dashboard', route: dashboardRoute }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
