const express = require('express')
const app = express()
const paciente = require('./routes/paciente')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const mongoose = require('mongoose')
const SwaggerUI = require('swagger-ui-express')
const SwaggerDoc = require('./Swagger.json')


mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/final').then(() =>{
    console.log('conectado')
}).catch((err) => {
    console.log("ERRO: "+err)
})


app.get('/', (req, res) => {
    res.json({message: "vai"})
})

app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerDoc))


app.use('/paciente', paciente)

const PORT = 3000
app.listen(PORT, () => {
    console.log('Iniciado')
})