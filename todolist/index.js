const mongoClient = require('mongodb').MongoClient;
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const nodemailer = require('nodemailer')


  



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
        
    })

    
})

app.post('/email/onemail/:email/:username', (req, res) => {
    mongoClient.connect("mongodb+srv://alimsadetov:135642@tododb.9pokh.mongodb.net/todolist?retryWrites=true&w=majority", async (err, client) => {
        if (err){
            return console.log(err);
        }
        console.log("na pochtu");
        let testEmailAccount = await nodemailer.createTestAccount()

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
            user: testEmailAccount.user,
            pass: testEmailAccount.pass,
            },
        })

        client.db().collection("tasks").find({username: req.params.username}).toArray(async (err, result) => {
            console.log(result);
            await transporter.sendMail({
                from: '"Node js" <nodejs@example.com>',
                to: `${req.params.email}`,
                subject: 'Message from Node js',
                text: 'This message was sent from Node js server.',
                html:
                `This <i>message</i> was sent from <strong>Node js</strong> server. ${result}`,
            })
            client.close
        })


    })
})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;