import { projects, clients } from '.././sampleData.js';
import {
	GraphQLID,
	GraphQLList,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from 'graphql';

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
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		clients: {
			type: new GraphQLList(ClientType), //List of Client Types.
			resolve(parentValue, args) {
				return clients;
			},
		},
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, args) {
				return clients.find((client) => client.id === args.id);
			},
		},
		projects: {
			type: new GraphQLList(ProjectType), //List of Client Types.
			resolve(parentValue, args) {
				return projects;
			},
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, args) {
				return projects.find((project) => project.id === args.id);
			},
		},
	},
});

const schema = new GraphQLSchema({ query: RootQuery });

export default schema;
