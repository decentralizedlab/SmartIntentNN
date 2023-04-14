const ROOT = require('app-root-path')
const express = require('express')
const serveIndex = require('serve-index')
const app = express()
const CTRL = require('app-root-path') + '/web/'
const bodyParser = require('body-parser')

// cross domain
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Credentials', 'true')
    if (req.method.toLowerCase() == 'options') res.send(200)
    else next()
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(allowCrossDomain)

app.get('/', (_, res) => {
    res.send(`
        <h1>SmartIntentNN API</h1>
        <a href="https://gitlab.com/web3se/smartintent">For the documentation, visit our GitLab</a>`)
})

const statics = ['evaluates', 'models']
app.use('/evaluates', express.static(`${ROOT}/tensorflow/evaluates`))
app.use('/evaluates', serveIndex(`${ROOT}/tensorflow/evaluates`, { icons: true }))
app.use('/models', express.static(`${ROOT}/tensorflow/models`))
app.use('/models', serveIndex(`${ROOT}/tensorflow/models`, { icons: true }))

app.all('*', (req, res, next) => {
    try {
        const path = req.path.toString()
        const ctl = path.split('/')[1]
        if (statics.includes(ctl)) return next()

        // MVC
        const act = path.split('/')[2]
        const fun = require(CTRL + ctl)
        fun[act](req, res, next)
    } catch (e) {
        console.error(e)
        next(e.message)
    }
})

app.listen(8080)
console.log('Server Started')
