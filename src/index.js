const express = require('express');
const mongoose= require('mongoose');
const redis= require('redis');
const { Pool, Client } = require('pg')
const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
 
const client = redis.createClient({
    url: 'redis://redis:6379'
});
const PORT = process.env.PORT || 4000;
const app = express();


// Define the container name or ID and the network name
const containerNameOrId = 'appcon';
const networkName = 'tresmerge-docker-main_default';

//conect to db

mongoose.connect('mongodb://root:example@mongo:27017')
.then(() => console.log('connected to MongoDB...'))
.catch((err)=> console.log('faild to connect to DB:' ,err));

//connect to redis

client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', () => console.log('connected to Redissssss...'));
client.connect();

// const posturi=`postgres://root:example@postgres:5432`
// postClient = new Client({
//     connectionString:posturi,
// })
// postClient.connect()
// .then(() => console.log('connected to postgres...'))
// .catch((err)=> console.log('faild to connect to postgres:' ,err));


app.get('/', (req, res) =>{
client.set('products','test 2');
res.send('<h1> Nginx APP is working on AWS using dockerhubbb a7a</h1>');
});

app.get('/data', async(req, res) =>{
    const a=await client.get('products');
    res.send(`<h1> redis is working</h1> <h2>${a}</h2`);
    });

app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`));
