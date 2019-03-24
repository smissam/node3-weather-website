
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)

app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Missam'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Addess is mandatory'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'search is mandatory'
        })
    }
    res.send( {
        products: []
    })
})


app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me!!',
        name: 'Missam'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some help text!!',
        title: 'Help',
        name: 'Missam'
    })
})

app.get('/help/*', (req,res) => {
    res.render('notfound', {
        errorInfo: 'Help not found!!'
    })
})

app.get('*', (req,res) => {
    res.render('notfound', {
        errorInfo: 'Page not found!!',
        name: "Missam"
    })
})
// app.get('', (req,res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req,res) => {
//     res.send([{
//         name: 'Missam',
//         age: 43
//     },
//     {
//         name: 'Anu',
//         age: 38
//     }])
// })

// app.get('/about', (req,res) => {
//     res.send('<h1>About</h1>')
// })

// app.get('/weather', (req,res) => {
//     res.send([{
//         forecast: 'It is snowing',
//         location: 'Philadelphia'
//     }])
// })
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})