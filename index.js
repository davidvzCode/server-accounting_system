const express = require('express')
const routerApi = require('./routes')
const cors = require('cors')
const {
    logErrors,
    errorHandler,
    boomErrorHandler,
    ormErrorHandler,
} = require('./middleware/error.handler')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.json())
app.use(cors())
require('./utils/auth')

app.get('/', (req, res) => {
    res.render('index')
})

routerApi(app)

app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
