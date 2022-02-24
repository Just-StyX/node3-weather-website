import path from 'path'
import express from 'express'
import hbs from 'hbs'
import { geocode } from './utils/geocode.js'
import { forcast } from './utils/forcast.js'


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()

const publicDirectoryPatth = path.join(__dirname, '../public' )
const viewPath = path.join(__dirname, '../templates/views')
const patialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(patialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Justice Sam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Justice Sam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpTex: 'This is some helpful text',
        name: 'Justice Sam'
    })
})

app.use(express.static(publicDirectoryPatth))

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forcast(req.query.address, (error, forcastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forcast: forcastData,
                location,
                address: req.query.address.toUpperCase()
            })
        })
    })
   
})

app.get('/help/*', (req, res) => {
    res.render('PageNotFound', {
        title: "Page not found",
        message: 'Help article not found',
        name: 'Justice Sam'
    })
})

app.get('*', (req, res) => {
    res.render('PageNotFound', {
        title: "Ooops. Check url",
        message: 'Page not found',
        name: 'Justice Sam'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})