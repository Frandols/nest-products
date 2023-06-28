import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, HttpServer } from '@nestjs/common'
import * as request from 'supertest'
import ProductsModule from '../../src/products/products.module'

describe('ProductController (e2e)', () => {
  let app: INestApplication
  let server: HttpServer

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    server = app.getHttpServer()
  })

  const productToSend = { name: 'iPhone XR', price: 650 }
  const productExpected = { id: 0, ...productToSend }

  it('/products (POST)', async () => {
    return request(server)
      .post('/products')
      .send(productToSend)
      .expect(201)
      .expect(productExpected)
  })

  it('/products (GET)', () => {
    return request(server)
      .get('/products')
      .expect(200)
      .expect([productExpected])
  })

  it('/products/0 (GET)', () => {
    return request(server)
      .get('/products/0')
      .expect(200)
      .expect(productExpected)
  })

  const newData = { price: 700 }

  const updatedProductExpected = { ...productExpected, ...newData }

  it('/products/0 (PATCH)', () => {
    return request(server)
      .patch('/products/0')
      .send(newData)
      .expect(200)
      .expect(updatedProductExpected)
  })

  it('/products/0 (DELETE)', () => {
    return request(server)
      .delete('/products/0')
      .expect(200)
      .expect(updatedProductExpected)
  })
})
