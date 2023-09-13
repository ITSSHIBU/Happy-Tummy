const express = require('express')
const router = express.Router()
const axios = require('axios')

router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        console.log("latlong....",lat, long)
        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                // console.log(`statusCode: ${res.status}`)
                console.log("respons...",res.data.results)
                // let response = stringify(res)
                // response = await JSON.parse(response)
                let response = res.data.results[0].components;
                console.log("finalresponce..",response)
                let { city ,country, state, road, postcode } = response
                return String(city + "," + country + "," + state + "," + road + " - " + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

module.exports = router