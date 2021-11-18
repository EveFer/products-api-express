const express = require('express')
const Container = require('./class')

const app = express()
const PORT = process.env.PORT || 8080 

const products = new Container('./products.json')

const server = app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`)
})


app.get('/products', async (req, res) => {
    try {
        const allProducts = await products.getAll()
        res.send({
            products: allProducts
        })
    } catch (error) {
        res.status(400).json({
            error: 'Hubo un error D:'
        })
    }
})

app.get('/productRandom', async (req, res) => {
    try {
        const allProducts = await products.getAll()
        const numberRandom = Math.floor(Math.random() * ((allProducts.length + 1) - 1) + 1); 
        const product = await products.getById(numberRandom)
        res.send({
            product
        })
    } catch (error) {
        res.status(400).json({
            error: 'Hubo un error D:'
        })
    }
})