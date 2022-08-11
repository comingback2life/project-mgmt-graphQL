import {
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from 'graphql';

//Mongoose Models
import ClientModel from '../models/Client.model.js';
import ProjectModel from '../models/Project.model.js';

//Client Type
const ClientType = new GraphQLObjectType({
	name: 'Client',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
	}),
});

const ProjectType = new GraphQLObjectType({
	name: 'Projects',
	fields: () => ({
		id: { type: GraphQLID },
		clientId: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
		client: {
			type: ClientType,
			resolve(parent, args) {
				return ClientModel.findById(parent.clientId);
			},
		}, //relationships between different types
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		clients: {
			type: new GraphQLList(ClientType), //List of Client Types.
			resolve(parent, args) {
				return ClientModel.find(); //mongoose method to return everything
			},
		},
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return ClientModel.findById(args.id);
			},
		},
		projects: {
			type: new GraphQLList(ProjectType), //List of Client Types.
			resolve(parent, args) {
				return ProjectModel.find();
			},
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return ProjectModel.findById(args.id);
			},
		},
	},
});

//Mutations - Essential for Modifying Data
const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		//addClient
		addClient: {
			type: ClientType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				email: { type: GraphQLNonNull(GraphQLString) },
				phone: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				const client = new ClientModel({
					name: args.name,
					email: args.email,
					phone: args.phone,
				});
				return client.save(); //save the client object  to the schema
			},
		},
		//Delete Client
		deleteClient: {
			type: ClientType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return ClientModel.findByIdAndDelete(args.id);
			},
		},
	},
});
const schema = new GraphQLSchema({ query: RootQuery, mutation });

export default schema;
