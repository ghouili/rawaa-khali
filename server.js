const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 5000;

const server = express();
server.use(bodyParser.json());

const UserRoutes = require('./routes/user');


server.get('/', (req, res) => {
    res.send('Hello Worlds!!');
})

server.use('/user', UserRoutes);    

mongoose.connect('mongodb+srv://admin:admin@bdpfe0.itztwah.mongodb.net/?retryWrites=true&w=majority').then(res => {
    server.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    })

}).catch(err =>
    console.log(er)
)