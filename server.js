const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose")
const model = require("./models/pb_mongoose")

let url = 'mongodb://localhost:27017/PersonalBudget';


app.use('/',express.static('public'));

app.use(express.json());


app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true ,  useUnifiedTopology: true })
                .then(() => {
                    console.log("Connected to database"); 
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                })
                

                model.find().then(data => {
                        
                    res.json(data);
                    mongoose.connection.close();
                    
                }).catch(err => {
                    console.log(err);
                })

    
});

app.post('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            var n = new model({
                title: req.body.title,
                budget: req.body.budget,
                color: req.body.color
            });

            model.insertMany(n)
                .then((data) => {
                    res.json(data);
                    mongoose.connection.close();
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.listen(port, () => {
    console.log(`Example app listen at http://localhost:${port}`)
});

