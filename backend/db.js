
const mongoose = require('mongoose');

const mongoDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/food', {
    useNewUrlParser: true,
  }, async (err, result) => {
    if (err) console.log("database not connected", err)
    else {
      console.log('Connected to MongoDB')

      const fetch_data = await mongoose.connection.db.collection("fooditem");
      
      // console.log("fetch_data",fetch_data)
      
      fetch_data.find({}).toArray(async function (err, data) {
      
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
      
        foodCategory.find({}).toArray(async function (err, catData) {
      
          if (err) console.log(err)
      
          global.food_item = data;
          global.foodCategory = catData
      
        })
      })
    }
  })

}

mongoDB()
// module.exports = mongoDB