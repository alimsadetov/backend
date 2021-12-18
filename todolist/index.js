const mongoClient = require('mongodb').MongoClient;
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.post('/:username/:name/:opisanie', (req, res) => {
    mongoClient.connect("mongodb+srv://alimsadetov:135642@tododb.9pokh.mongodb.net/todolist?retryWrites=true&w=majority", (err, client) => {
        if (err){
            return console.log(err);
        }
        console.log("norm");

        client.db().collection("tasks").insertOne( { username: req.params.username, name: req.params.name, opisanie: req.params.opisanie} )
        client.db().collection("tasks").find().toArray((err, result) => {
            console.log(result);
            client.close
        })

    })
})

app.delete('/:username/:name/:opisanie', (req, res) => {
    mongoClient.connect("mongodb+srv://alimsadetov:135642@tododb.9pokh.mongodb.net/todolist?retryWrites=true&w=majority", (err, client) => {
        if (err){
            return console.log(err);
        }
        console.log("norm");

        client.db().collection("tasks").deleteOne( { username: req.params.username, name: req.params.name, opisanie: req.params.opisanie} )
        client.db().collection("tasks").find().toArray((err, result) => {
            console.log(result);
            client.close
        })

    })
})

app.get('/get/:username', async (req, res) => {
    let tasks = [];
    await mongoClient.connect("mongodb+srv://alimsadetov:135642@tododb.9pokh.mongodb.net/todolist?retryWrites=true&w=majority", (err, client) => {
        if (err){
            return console.log(err);
        }
        console.log("norm");
        client.db().collection("tasks").find({username: req.params.username}).toArray((err, result) => {
            console.log(result);
            tasks = result;
            res.send(tasks)
            client.close
        })

    })

    
})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
