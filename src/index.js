const express = require('express');
const mongoose= require('mongoose');
const redis= require('redis');
const client = redis.createClient({
    url: 'redis://redis:6379'
});
const PORT = process.env.PORT || 4000;
const app = express();
const DB_USER='root';
const DB_PASS='example';
const DB_PORT="27017";
const DB_HOST= '192.168.32.3';
const URI = 'mongodb://root:example@192.168.32.3:27017';

// Define the container name or ID and the network name
const containerNameOrId = 'appcon';
const networkName = 'tresmerge-docker-main_default';

//conect to db

mongoose.connect('mongodb://root:example@mongo:27017')
.then(() => console.log('connected to MongoDB...'))
.catch((err)=> console.log('faild to connect to DB:' ,err));

//connect to redis

client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', () => console.log('connected to Redis...'));
client.connect();


app.get('/', (req, res) =>{
client.set('products','products 1');
res.send('<h1> Node JS APP</h1>');
});

app.get('/data', async(req, res) =>{
    const a=await client.get('products');
    res.send(`<h1> redis is working</h1> <h2>${a}</h2`);
    });

app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`));
