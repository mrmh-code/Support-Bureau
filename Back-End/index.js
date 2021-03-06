const express=require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId=require('mongodb').ObjectId
require('dotenv').config()
const cors=require('cors');

const app=express();
const port=5000;
app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nq0twuc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run(){
    try{
        await client.connect();
        const database=client.db('CarService');
        const servicesCollection=database.collection('Service');
        
        //get API load Data
        app.get('/services', async (req,res)=>{
            const cursor=servicesCollection.find()
            const service=await cursor.toArray();

            res.send(service);
        })

        //get single Service
        app.get('/services/:id', async(req,res)=>{
            const id=req.params.id;
            console.log('Getting Specific service.....',id);
            const query={_id: ObjectId(id)};

            const service=await servicesCollection.findOne(query);
            res.json(service);
        })

        app.post('/services',async (req,res)=>{
            const service=req.body;

            const result=await servicesCollection.insertOne(service);
            console.log('hit post')
            res.json(result);
        })

        app.delete('/services/:id', async (req,res)=>{
            const id=req.params.id;
            const query={_id: ObjectId(id)};
            const result=await servicesCollection.deleteOne(query)

            res.json(result)
        })
 
    }
    finally{
        // await client.close();
    }
 }
 run().catch(console.dir);


app.get('/' , (req,res)=>{
    res.send('Server is running .....')
})

app.listen(port, (req,res)=>{
    console.log('listen to port ....',port);
})