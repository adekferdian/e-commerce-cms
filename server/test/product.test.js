const request = require('supertest')
const server = require('../server.js')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User } = require('../models')
const jwt = require('jsonwebtoken')

let access_token = ""
let product;

afterAll( (done) => {
    queryInterface.bulkDelete("Users", {})
    .then(data => {
        return queryInterface.bulkDelete("Products", {})
    })
    .then(deleteProduct => {
        done()
    })
    .catch(err => {
        done(err)
    })
})
beforeAll ((done) => {
    User.create({
        email: 'test@admin.com',
        password: '1234',
        role: 'admin',
    })
    .then(newUser => {
        access_token = jwt.sign(newUser, 'rahasia')
    })
})

describe("Product Routes", () => {
    test("401 Unauthorized - should return json message", (done) => {
        return request(server)
                .get('/products')
                .set("Accept", "application/json")
                .set("access_token", "sadsaddasdasdnbvas")
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "Not authroized to do the actions")
                    done()
                })
                .catch (err => {
                    done (err)
                })
    })
    describe("POST /products", () => {
        test("201 created - should return json message", (done) => {
            const newProduct = {
                name: "windows",
                image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftekno.kompas.com%2Fread%2F2019%2F05%2F09%2F15160047%2Fjadwal-update-windows-10-bakal-bisa-diatur-oleh-pengguna-&psig=AOvVaw1_OkTkaARc5V7aBLa0lGLt&ust=1595432231230000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjGsK_W3uoCFQAAAAAdAAAAABAD",
                price: 2000000,
                stock: 10,
            }
            return request(server)
                .post(`/products/`)
                .set("Accept", "application/json")
                .set("access_token", access_token)
                .send(newProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("id")
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("stock")
                    expect(body).toHaveProperty("createdAt")
                    expect(body).toHaveProperty("updatedAt")
                    product = body
                    done()
                })
                .catch (err => {
                    done (err)
                })
        })
        test("400 name cannot be empty! - should return json message", (done) => {
            const newProduct = {
                name: "",
                image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftekno.kompas.com%2Fread%2F2019%2F05%2F09%2F15160047%2Fjadwal-update-windows-10-bakal-bisa-diatur-oleh-pengguna-&psig=AOvVaw1_OkTkaARc5V7aBLa0lGLt&ust=1595432231230000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjGsK_W3uoCFQAAAAAdAAAAABAD",
                price: 2000000,
                stock: 10,
            }
            return request(server)
                .post(`/products/`)
                .set("Accept", "application/json")
                .set("access_token", access_token)
                .send(newProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "name cannot be empty!")
                    done()
                })
                .catch (err => {
                    done (err)
                })
        })
        test("400 image_url cannot be empty! - should return json message", (done) => {
            const newProduct = {
                name: "windows",
                image_url: "",
                price: 2000000,
                stock: 10,
            }
            return request(server)
                .post(`/products/`)
                .set("Accept", "application/json")
                .set("access_token", access_token)
                .send(newProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "image_url cannot be empty!")
                    done()
                })
                .catch (err => {
                    done (err)
                })
        })
        test("400 price cannot be empty! - should return json message", (done) => {
            const newProduct = {
                name: "windows",
                image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftekno.kompas.com%2Fread%2F2019%2F05%2F09%2F15160047%2Fjadwal-update-windows-10-bakal-bisa-diatur-oleh-pengguna-&psig=AOvVaw1_OkTkaARc5V7aBLa0lGLt&ust=1595432231230000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjGsK_W3uoCFQAAAAAdAAAAABAD",
                price: "",
                stock: 10,
            }
            return request(server)
                .post(`/products/`)
                .set("Accept", "application/json")
                .set("access_token", access_token)
                .send(newProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "price cannot be empty!")
                    done()
                })
                .catch (err => {
                    done (err)
                })
        })
        test("400 name cannot be empty! - should return json message", (done) => {
            const newProduct = {
                name: "windows",
                image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftekno.kompas.com%2Fread%2F2019%2F05%2F09%2F15160047%2Fjadwal-update-windows-10-bakal-bisa-diatur-oleh-pengguna-&psig=AOvVaw1_OkTkaARc5V7aBLa0lGLt&ust=1595432231230000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjGsK_W3uoCFQAAAAAdAAAAABAD",
                price: 2000000,
                stock: "",
            }
            return request(server)
                .post(`/products/`)
                .set("Accept", "application/json")
                .set("access_token", access_token)
                .send(newProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "stock cannot be empty!")
                    done()
                })
                .catch (err => {
                    done (err)
                })
        })
    })
    describe("GET /products/", () => {
        test("200 succes get all products - should return json message", (done) => {
            return request(server)
                .get('/products')
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toEqual(expect.any(Array))
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
    })
    describe("GET /products/:id", () => {
        test("200 succes get  product - should return json message", (done) => {
            return request(server)
                .get(`/products/${product.id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("id")
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("stock")
                    expect(body).toHaveProperty("createdAt")
                    expect(body).toHaveProperty("updatedAt")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
        test("404 product not found - should return json message", (done) => {
            return request(server)
                .get(`/products/10000`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("message", "product not found")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
    })
    describe("PUT /product/:id", () => {
        test("200 succes updated product - should return json message", (done) => {
            const edittedProduct = {
                name: "linux",
                image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftekno.kompas.com%2Fread%2F2019%2F05%2F09%2F15160047%2Fjadwal-update-windows-10-bakal-bisa-diatur-oleh-pengguna-&psig=AOvVaw1_OkTkaARc5V7aBLa0lGLt&ust=1595432231230000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjGsK_W3uoCFQAAAAAdAAAAABAD",
                price: 1500000,
                stock: 5,
            }
            return request(server)
                .put(`/products/${product.id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .send(edittedProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("id")
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("stock")
                    expect(body).toHaveProperty("createdAt")
                    expect(body).toHaveProperty("updatedAt")
                    product = body
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
        test("400 name cannot be empty - should return json message", (done) => {
            const edittedProduct = {
                name: "",
                image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftekno.kompas.com%2Fread%2F2019%2F05%2F09%2F15160047%2Fjadwal-update-windows-10-bakal-bisa-diatur-oleh-pengguna-&psig=AOvVaw1_OkTkaARc5V7aBLa0lGLt&ust=1595432231230000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjGsK_W3uoCFQAAAAAdAAAAABAD",
                price: 1500000,
                stock: 5,
            }
            return request(server)
                .put(`/products/${product.id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .send(edittedProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "name cannot be empty")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
        test("400 image_url cannot be empty - should return json message", (done) => {
            const edittedProduct = {
                name: "linux",
                image_url: "",
                price: 1500000,
                stock: 5,
            }
            return request(server)
                .put(`/products/${product.id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .send(edittedProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "image_url cannot be empty")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
        test("400 price cannot be empty - should return json message", (done) => {
            const edittedProduct = {
                name: "linux",
                image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftekno.kompas.com%2Fread%2F2019%2F05%2F09%2F15160047%2Fjadwal-update-windows-10-bakal-bisa-diatur-oleh-pengguna-&psig=AOvVaw1_OkTkaARc5V7aBLa0lGLt&ust=1595432231230000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjGsK_W3uoCFQAAAAAdAAAAABAD",
                price: "",
                stock: 5,
            }
            return request(server)
                .put(`/products/${product.id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .send(edittedProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "price cannot be empty")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
        test("400 stock cannot be empty - should return json message", (done) => {
            const edittedProduct = {
                name: "linux",
                image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftekno.kompas.com%2Fread%2F2019%2F05%2F09%2F15160047%2Fjadwal-update-windows-10-bakal-bisa-diatur-oleh-pengguna-&psig=AOvVaw1_OkTkaARc5V7aBLa0lGLt&ust=1595432231230000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjGsK_W3uoCFQAAAAAdAAAAABAD",
                price: 1500000,
                stock: "",
            }
            return request(server)
                .put(`/products/${product.id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .send(edittedProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "stock cannot be empty")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
        test("404 product not found - should return json message", (done) => {
            const edittedProduct = {
                name: "linux",
                image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftekno.kompas.com%2Fread%2F2019%2F05%2F09%2F15160047%2Fjadwal-update-windows-10-bakal-bisa-diatur-oleh-pengguna-&psig=AOvVaw1_OkTkaARc5V7aBLa0lGLt&ust=1595432231230000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjGsK_W3uoCFQAAAAAdAAAAABAD",
                price: 1500000,
                stock: 5,
            }
            return request(server)
                .put(`/products/10000`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .send(edittedProduct)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(404)
                    expect(body).toHaveProperty("message", "product not found")
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
    })
    describe("DELETE /products/:id", () => {
        test("200 succes deleted product - should return json message", (done) => {
            return request(server)
                .delete(`/products/${product.id}`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("id")
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("stock")
                    expect(body).toHaveProperty("createdAt")
                    expect(body).toHaveProperty("updatedAt")
                    product = body
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
        test("404 product not found - should return json message", (done) => {
            return request(server)
                .delete(`/products/1000`)
                .set("access_token", access_token)
                .set("Accept", "application/json")
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(404)
                    expect(body).toHaveProperty("message", "product not found")
                    product = body
                    done()
                })
                .catch(err => {
                    done (err)
                })
        })
    })
})