const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path')
const hbs = require('hbs')
const request = require('postman-request');
const geoCode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

// define paths for express configuration
const publicDirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// static directory to serve 
app.use(express.static(publicDirectorypath))


// app.get('/', (req, res) => res.send('Hello World!'))    above exprees.static finds its match this will not work
// app.get('/help', (req, res)=>{
//     res.send([{
//         name : 'shubham',
//         age :24
//     },
//     {
//         name : 'sheba',
//         age:25
//     }
// ])
// })
// app.get('/about',(req, res)=>{
//     res.send('<h1>you are at aboutus</h1>')
// })

app.get('/', (req,res)=>{
    res.render('index', {
        title : 'weather app',
        name : 'shubham'
    })
})

app.get('/weather',(req, res)=>{
if(!req.query.address){
    return res.send({error : 'must provide address'})
}

geoCode(req.query.address , (error , {latitude,longitude,location}={})=>{
    
    if(error){
        return res.send({error})
    }

forecast(latitude,longitude, (error, forecastData) => {

    if (error) {
        return res.send({error});
    }
    res.send({
        forecast:forecastData,
        latitude,
        longitude,
        location
    })
})
})
})
app.get('/help', (req, res)=>{
        res.render('help', {
            help : 'this is our help page',
            title : 'help',
            name: 'shubham'
        })
    
    })



app.get('/about',(req, res)=>{
        res.render('about',{
            title:'About',
            name: 'shubham'
        })
    })

    
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'404 Error',
        msg:'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Error',
        msg : 'page not found'
    })
})


app.listen(port, () => console.log(`Example app listening on port`+port))