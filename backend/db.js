const mongoose = require("mongoose");
const URL =
  "mongodb+srv://Yash:Yashanpal6^@cluster0.kchkhqs.mongodb.net/FoodCart?retryWrites=true&w=majority";
const mongo = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected Successfully");
    const food_items = await mongoose.connection.db.collection("food_items");
    const data = await food_items.find({}).toArray();

    const food_category = await mongoose.connection.db.collection("food_category");
    const catData = await food_category.find({}).toArray();

    global.food_items = data;
    global.food_category = catData;

    //console.log(global.food_category);
    //console.log(global.food_items);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};
module.exports = mongo;