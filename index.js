const { MongoClient, ServerApiVersion , ObjectId} = require('mongodb');
const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
// const path = require('path')
require('dotenv').config();


//middle ware 
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.otvqo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        await client.connect();
        // console.log('database connected');
        const toolsCollection = client.db('manufacturing-website').collection('tools');
        const ordersCollection = client.db('manufacturing-website').collection('orderDetails');




        /* get method for all tools data loading in UI  */
        app.get('/tools', async (req, res) => {
            const query = {};
            const cursor = toolsCollection.find(query)
            const tools = await cursor.toArray();
            res.send(tools);

        })

        //  single data finding for showing 
        app.get('/tool/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await toolsCollection.findOne(query);
            res.send(product);
        });

        /* post method for orders details */
        app.post('/orderDetails', async(req, res) =>{
            const orders= req.body;
            const newOrder = await ordersCollection.insertOne(orders);
            res.send(newOrder);
        })


    }
    finally {

    }

}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('welcome manufacture website');
})

app.listen(port, () => {
    console.log(`manufacture website listening on port ${port}`)
})