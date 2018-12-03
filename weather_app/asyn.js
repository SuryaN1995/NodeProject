const geocode = require('./geocode')
const yargs = require('yargs')

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

geocode.encoder(argv.address, (error, results) => {
    if (error)
        console.log(error)
    else {
        console.log(results.latitude)
        geocode.forcast(results.latitude, results.longitude, (error, results) => {
            if (error)
                console.log(error)
            else {
                console.log(results)
            }
        })
    }
})