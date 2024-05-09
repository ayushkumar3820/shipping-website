const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Connection = require('./Database/Connection');
const router = require('./routes/routes');
const defaultData = require('./default.js');

dotenv.config();



const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);
app.use(express.urlencoded({extended: true}));



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server started listening on PORT ${PORT}`);
});

Connection();
defaultData();

