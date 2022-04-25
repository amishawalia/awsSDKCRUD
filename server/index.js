const express = require('express')
const app = express()
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use('/s3',require('./routes/s3'))
app.use('/ec2',require('./routes/ec2'));

app.get('/', (req,res) => {
    res.send('Welcome to the app');
});

app.listen(3001);
