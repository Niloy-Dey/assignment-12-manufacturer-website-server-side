const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
// const path = require('path')
require('dotenv').config();


//middle ware 
app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://manufacturing-website:<password>@cluster0.otvqo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

