const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')
// Here we are creating the end point for the backend now to hit this endpoint from the frotnend we will do changes in the cart.js
router.post('/orderData', async (req, res) =>{
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date})

    // if email not existing in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email' : req.body.email })
    console.log(eId)
    // email doesnt exist in the Orders collection in the DB -> first order of the user
    if (eId === null) {
        try{
            await Order.create({
                email: req.body.email, 
                order_data : [data]

            }).then( ()=>{
                res.json({ success : true})
            })

        }
        catch(error){
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
    // this is not the first order of  the user
    else{
        try{
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(()=>{
                    res.json({ success: true })
                })
        }catch (error){
            res.send("Server Erorr", error.message)
        }
    }
})

router.post('/myorderData', async (req, res) => {
    try{
        let myData = await Order.findOne({ 'email' : req.body.email})
        res.json({ orderData:myData})
    }catch(error){
        res.send("Server Error", error.message)
    }
})

module.exports = router;