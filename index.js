const express = require('express');
const cors = require('cors');
const { connection } = require('./configs/db');
const { noteRouter } = require('./routes/note.router');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/',(req, res) => {
    res.status(200).send({msg:'Basic API endpoint'});
})

app.use('/',noteRouter);

app.listen(process.env.port,async () => {
    try {
        await connection
        console.log('connected to DB');
    }
    catch (error) {
        console.log(error);
    }
    console.log(`Server is running at ${process.env.port}`);
})