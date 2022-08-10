const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')

const bodyParser = require('body-parser');
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors());
app.use(express.json()); //req.body
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//middlewear
//app.use(cors());
//app.use(express.json());

const db = require("./models");
db.sequelize.sync();


// set routes 
require('./routes/todo.routes')(app);


app.listen(port, () => {
  console.log(`server started on ${port}`)
})



