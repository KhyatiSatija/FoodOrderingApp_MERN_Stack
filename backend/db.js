const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://satijakhyati2003:k443@cluster0.1aijkos.mongodb.net/q-buster-fullstack?retryWrites=true&w=majority'
// downgrade the URL version if you face any issues.

//async await used here to mitigate the error faced with mongoose.connection.db.collection
const mongoDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(mongoURI) 

        console.log('Mongo connected')
        const fetched_data = await mongoose.connection.db.collection('food_items'); //reads the collection (data) from mongoDB database once the connection is established.
        // fetched_data.find({}).toArray(function( err, data){
        //     if(err) console.log('Cant fetch data from MongoDB',err)
        //     else console.log(data);
        // })
        const data = await fetched_data.find({}).toArray();
        console.log('Data fetched');

        //by declaring a global variable we can use it anywhere in our application
        global.food_items = data;
        // console.log(global.food_items)
        const foodCategory =  await mongoose.connection.db.collection('foodCategory');
        const catData = await foodCategory.find({}).toArray();
        global.foodCategory = catData;
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
}
module.exports = mongoDB;
