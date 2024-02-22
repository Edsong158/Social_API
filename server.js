const express = require('express');

const connection = require('./config/connection');

const PORT = process.env.PORT || 3333;

const app = express();


const { users_route, thoughts_route } = require('./routes/api_routes')


app.use(express.json());


app.use('/api', [users_route, thoughts_route]);


connection.on('open', () => {
    app.listen(PORT, () => console.log('Server started on port', PORT));
})


