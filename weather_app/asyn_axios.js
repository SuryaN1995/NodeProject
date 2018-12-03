const yargs = require('yargs')
const axios = require('axios')
const GOOGLE_KEY = "AIzaSyAizFF1W4z7-xxPEtNzAQ8n5M4mipDCUGI"
const FORCAST_KEY = "a5b226fe5532a99a48021133a0a97094"

var argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'address to fetch weather',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv

var encode = encodeURIComponent(argv.address)
var googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encode}&key=${GOOGLE_KEY}`

axios.get(googleUrl).then((result) => {
    if (result.data.status == 'ZERO_RESULTS') {
        throw new Error('Unablr to find addr')
    }
    var latitude = result.data.results[0].geometry.lat
    var longitude = result.data.results[0].geometry.lng
    var weatherUrl = `https://api.darksky.net/forecast/${FORCAST_KEY}/${latitude},${longitude}`
    return axios.get(weatherUrl)
}).then((weatherResponse)=>{
    var temprature = weatherResponse.data.currently.temperature
    console.log(temprature)
}).catch((error) => {
    if (error.code == 'ENOTFOUND')
        console.log('Unable to connect to servers')
    else
        console.log(error.message)
})