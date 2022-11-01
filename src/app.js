const path = require('path')
const { response } = require( 'express' )
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//lets say someone wants to visit any of the below, but how do we set up our server to send a response when someone tries to get something at a specific route(look above)
//app.com
//app.com/help
//app.com/about

//define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../temp/views')
const partialsPath = path.join(__dirname, '../temp/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'June Johnson'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'June Johnson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'working'
    })
})
//for weather app
app.get('/weather', (req, res) => {
    if (!req.query.address) {
       return res.send({
           error: 'Kindly provide your address'
       })
    }

     geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
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
    // res.send([{
    //     forecast: 'It is 20 degrees',
    //     location: 'Portharcourt',
    //     address: req.query.address
    // }])
})
//setting up a url that calls back json
//creating an endpoints that send products to be displayed on the browser of an ecommerce
app.get('/products', (req, res) => {
    if (!req.query.search) {
     return  res.send({
           error: 'you must provide a search term'
       }) 
    }

   console.log( req.query.search);
res.send({
    products:[]
   })
})


app.get('/help/*', (req, res) => {
   res.render('404', {
       title: '404',
       name: 'June Johnson',
       errorMessage: 'Help article not found.'
   })
})//this is used to let the user know that they are not trying to access help page, that is why the global character is beside /help
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found'
    })
})
app.listen(port, () => {
    console.log('Server is up on port 3000' + port);
})
