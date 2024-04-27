const express = require('express')
const app = express()
const port = 5000 //on port 3000 , our frontend is running, so we use port 5000 for our backend.
const mongoDB = require('./db')
mongoDB();

// defacto used to send data from frontend to backend else you'll get the CORS error.
//next is a middleware that takes execution to the next line of code
// next is a function used to pass control to the next middleware function in the stack
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); //put URL where frontend is running
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})




//root path pr response generated is 'Hello world' on local host 5000 port numebr
// you can check this from thunderbolt too

app.use(express.json())

//middleware
// used to call the routes defined in ./Routes/

app.use('/api/', require('./Routes/CreateUser'));

//creating a new route
app.use('/api/', require('./Routes/DisplayData'));

// route for sending order history from frontend to backend
app.use('api/', require('./Routes/OrderData'));
app.get('/', (req, res) => {
    res.send('Hello World yaya!')
})

app.listen(port, () => {
    console.log('Example app listening on port '+ port)
})


//in this file we can mention all the end points in the application
//but this is not a good way as then this file will be highly crowded.
// therefore we create a routes folder and make files to mention all the end points
