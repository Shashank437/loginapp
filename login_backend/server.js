const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config()

// Require routes Folder
const userRouter = require('./routes/user');
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../login_frontend/')));
app.get('/',(req, res) => {
  res.sendFile(path.join(`${__dirname}/../login_frontend/index.html`));
});


// DataBase Connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { 
    useNewUrlParser: true 

}).then(() => console.log('DataBase connection successful'))
  .catch((err) => console.log(err))


// api
app.use('/users', userRouter);


// Localhost
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log( `Server is Running on PORT: ${PORT}`));
