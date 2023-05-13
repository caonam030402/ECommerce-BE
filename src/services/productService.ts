import { Product } from '~/models/productModel'
import { IProduct } from '~/types/productType'

const productService = {
  /**
   * Add product
   * @param {IProduct} productBody
   * @returns Product
   */
  createProduct: async (productBody: IProduct) => {
    return Product.create(productBody)
  }
}

export default productService
