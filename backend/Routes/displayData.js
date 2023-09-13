const express = require ('express');
const router = express.Router();

router.post('/foodData', (req,res) => {
    try {
        // console.log(global.food_item)
        res.send([global.food_item, global.foodCategory])

    } catch (error) {
        res.send("server error")
    }
})

module.exports = router