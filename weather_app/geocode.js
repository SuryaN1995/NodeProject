const GOOGLE_KEY = "AIzaSyAizFF1W4z7-xxPEtNzAQ8n5M4mipDCUGI"
const FORCAST_KEY = "a5b226fe5532a99a48021133a0a97094"
const request = require('request')

var encoder = (address,callback)=>{
    var encodedAddr = encodeURIComponent(address)
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}&key=${GOOGLE_KEY}`,
        json: true
    }, (error, response, body) => {
        // console.log(error)
        if (error) {
            callback('Unable to rech google')
        } else if (body.status == 'OK') {
            callback(undefined,{
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
        } else {
            callback("Invalid address")
        }
    
    })
}

var forcast = (latitude,longitude,callback)=>{
    request({
        url:`https://api.darksky.net/forecast/${FORCAST_KEY}/${latitude},${longitude}`,
        json : true
    },(error,response,body)=>{
        if(error)
            callback("Unable to reach server")
        else if(response.statusCode === 400)
        callback("Invalid request")
        else {
            callback(undefined,body.currently.temperature)
        }
    })

}

module.exports = { 
    encoder,
    forcast
}

