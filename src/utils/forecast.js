
const request = require('postman-request')

const forecast = (latitude, longitude , callback)=>{

    const url ='http://api.weatherstack.com/current?access_key=cefbc1526d6e7e049cccafca010b70f9&query='+ latitude + ',' + longitude +'&units=f'
     
    request({url, json : true}, (error, {body})=>{
    if(error){
        callback('unable to connect with server', undefined)
    }else if (body.error) {
        callback('plz give correct coordinates', undefined)
    }else {
        callback(undefined, body.current.weather_descriptions[0] + '. Its a currently : ' + body.current.temperature + ' and it feels like : ' + body.current.feelslike,)
    }
    })
    }

    module.exports=forecast;