import ProductErrors from '../dictionaries/product.errors.dictionary'
import { HttpStatus } from '@nestjs/common'

const ProductExceptions: {
  [Property in keyof typeof ProductErrors]: {
    message: string
    statusCode: number
  }
} = {
  NOT_FOUND: {
    message: 'Product not found',
    statusCode: HttpStatus.NOT_FOUND,
  },
}

export default ProductExceptions
