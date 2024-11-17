const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')
const middleware = require('./middleware')

// Setting the port
const port = process.env.PORT || 3000


const app = express()

// Register middleware
app.use(middleware.cors)
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.updateProduct)
app.delete('/products/:id', api.deleteProduct)

// Error handling middleware
app.use(middleware.handleError)
app.use(middleware.notFound)


app.listen(port, () => console.log(`Server listening on port ${port}`))