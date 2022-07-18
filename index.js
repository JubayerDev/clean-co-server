const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

//! Warning! Do not use in production
app.use(cors({
    origin: '*'
}))
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d1snq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const serviceCollection = client.db('cleanCo').collection('service')

        app.get('/service', async (req, res) => {
            const query = {};
            const service = await serviceCollection.find(query).toArray();
            res.send(service)
        })
    }
    finally {
        // await client.close()
    }
    console.log('DB Connected');
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Server Runnning')
})

app.listen(port, () => {
    console.log('listenning to port: ', port);
})