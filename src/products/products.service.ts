import { Injectable } from '@nestjs/common'
import Product from './interfaces/product.interface'
import ProductErrors from './dictionaries/product.errors.dictionary'

@Injectable()
export default class ProductsService {
  products: Product[] = []

  create(product: Pick<Product, 'name' | 'price'>) {
    this.products.push({
      id: this.products.length,
      ...product,
    })

    return this.products[this.products.length - 1]
  }

  find() {
    return this.products
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id)

    if (!product) throw new Error(ProductErrors.NOT_FOUND)

    return product
  }

  update(id: number, partialProduct: Partial<Product>) {
    const productIndex = this.products.findIndex((product) => product.id === id)

    if (productIndex === -1) throw new Error(ProductErrors.NOT_FOUND)

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...partialProduct,
    }

    return this.products[productIndex]
  }

  delete(id: number) {
    const productIndex = this.products.findIndex((product) => product.id === id)

    if (productIndex === -1) throw new Error(ProductErrors.NOT_FOUND)

    const product = this.products[productIndex]

    this.products.splice(productIndex, 1)

    return product
  }
}
