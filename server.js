//dependencies
let { buildSchema, graphQLObjectType, graphQLObject } = require('graphql');
let express = require('express');
let graphqlHTTP = require('express-graphql');
let schema = require('./schemas/mainSchema');



// define app
let app = express();

// define port
let port = process.env.PORT || 3000


// place graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true

}));


// listen
app.listen(port);
console.log(`running ice and fire graphql server at port ${port}`);