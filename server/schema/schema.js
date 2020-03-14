const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLInt, 
	GraphQLSchema, 
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = graphql;

//dummy data
/*
var books = [
	{ id:'1', name:'ABC', genre: 'A', authorId: '1' },
	{ id:'2', name:'BCD', genre: 'B', authorId: '2' },
	{ id:'3', name:'CDE', genre: 'A', authorId: '3' },
	{ id:'4', name:'DEF', genre: 'B', authorId: '3' }
];

var authors = [
	{ id:'1', name:'Patel', age: 39 },
	{ id:'2', name:'Shah', age: 40 },
	{ id:'3', name:'Bhatt', age: 41 }
];
*/

const BookType = new GraphQLObjectType({
	name: 'Book',
	//fields are wrapped inside function for late binding, else it will throw error as AuthorType is defined later
	fields: () => ({
		id: { type: GraphQLID},
		name: { type: GraphQLString},
		genre: {type: GraphQLString},
		author: {
			type: AuthorType,
			resolve(parent, args) {
				console.log(parent);
				return Author.findById(parent.authorId);
				//return _.find(authors, {id: parent.authorId});
			}
		}
	})
});


const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books : {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				//return _.filter(books, {authorId: parent.id});
				return Book.find({authorId: parent.id});
			} 
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {id : {
				type: GraphQLID
			}},
			resolve(parent, args) {
				//return _.find(books, {id: args.id});
				return Book.findById(args.id);
			}
		},
		author: {
			type: AuthorType,
			args: {id :{
				type: GraphQLID
			}},
			resolve(parent, args) {
				//return _.find(authors, {id: args.id});
				return Author.findById(args.id);
			}
		},
		books : {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				//return books;
				return Book.find({});
			}
		},
		authors : {
			type : new GraphQLList(AuthorType),
			resolve(parent, args) {
				//return authors;
				return Author.find({});
			}
		}
	}
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name:{type: new GraphQLNonNull(GraphQLString)},
				age:{type: new GraphQLNonNull(GraphQLInt)}
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age
				});
				return author.save();
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: {type: new GraphQLNonNull(GraphQLString)},
				genre: {type: new GraphQLNonNull(GraphQLString)},
				authorId: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				});
				return book.save();
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});