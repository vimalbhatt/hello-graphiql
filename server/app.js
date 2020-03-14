const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

//allow cross origin request
app.use(cors());

mongoose.connect('mongodb+srv://vimal:bhatt@cluster0-kicxl.mongodb.net/test?retryWrites=true&w=majority');

mongoose.connection.once('open', () => {
	console.log('connected to mongo db');
});

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(4000,() => {
	console.log("now listening to port 4000");
});