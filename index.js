const express = require('express');
const app = express ();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/postschema')

// const { ApolloServer } = require('apollo-server-express');

const dotenv = require('dotenv')
dotenv.config()

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(process.env.MONGODB_URI, config)
.then(()=> {(
    console.log('Mongo DB connected successfully'))
})
.catch(err => {
    console.log('Connection unsuccessful', err)
})


app.use('*', cors());
app.use('/graphql', cors(), 
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true,
}));



app.use(bodyParser.json());

app.listen({ port: 4000 }, () => 
console.log(`Server ready`))