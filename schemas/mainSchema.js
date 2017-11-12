// dependencies
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');
const axios = require('axios');




// Character Type
const CharacterType = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({

        gender: { type: GraphQLString },
        name: { type: GraphQLString },
        born: { type: GraphQLString },
        culture: { type: GraphQLString },
        father: { type: GraphQLString },
        mother: { type: GraphQLString },
        spouse: { type: GraphQLString },
        died: { type: GraphQLString },
        books: {type: new GraphQLList(GraphQLString)},
        died: { type: GraphQLString }
    })
})

// House Type
const HouseType = new GraphQLObjectType({
    name: 'House',
    fields: () => ({

        coatOfArms: { type: GraphQLString },
        name: { type: GraphQLString },
        region: { type: GraphQLString },
        heir: { type: GraphQLString },
        founded: { type: GraphQLString },
        founder: { type: GraphQLString },
        diedOut: { type: GraphQLString },
        words: { type: GraphQLString },
        titles: { type: new GraphQLList(GraphQLString) },
        seats: { type: new GraphQLList(GraphQLString) },
        ancestralWeapons: { type: new GraphQLList(GraphQLString) },
        cadetBranches: { type: new GraphQLList(GraphQLString) },
        swornMembers: { type: new GraphQLList(GraphQLString) },
        
    })
})

// Book Type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({

        isbn: { type: GraphQLString },
        name: { type: GraphQLString },
        numberOfPages: { type: GraphQLInt },
        publisher: { type: GraphQLInt },
        country: { type: GraphQLString },
        mediaType: { type: GraphQLString },
        released: { type: GraphQLString},
        characters: { type: new GraphQLList(GraphQLString) },
        authors: { type: new GraphQLList(GraphQLString) },
        
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        character: {
            type: CharacterType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {


                return axios.get('https://anapioficeandfire.com/api/characters/' + args.id)
                    .then((res) => {

                        return res.data;
                    })
            }
        },
        characters: {
            type: new GraphQLList(CharacterType),
            resolve(parentValue, args) {

                return axios.get('https://anapioficeandfire.com/api/characters')
                    .then((res) => {

                        return res.data;
                    })

            }
        },
        house: {
            type: HouseType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {

                return axios.get("https://anapioficeandfire.com/api/houses/" +args.id)
                    .then((res) => {
                        return res.data;
                    })
            }
        },
        houses: {
            type: new GraphQLList(HouseType),
            resolve(parentValue, args) {

                return axios.get('https://anapioficeandfire.com/api/houses')
                    .then((res) => {

                        return res.data;
                    })

            }
        },
        book: {
        	type: BookType,
        	args:{
        		id: { type:GraphQLString}
        	},
        	resolve(parentValue, args) {

                return axios.get("https://anapioficeandfire.com/api/books/" +args.id)
                    .then((res) => {
                        return res.data;
                    })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parentValue, args) {

                return axios.get('https://anapioficeandfire.com/api/books')
                    .then((res) => {

                        return res.data;
                    })

            }
        }
    }
})






module.exports = new GraphQLSchema({

    query: RootQuery

})