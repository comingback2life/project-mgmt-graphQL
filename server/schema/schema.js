import { projects, clients } from '.././sampleData.js';
import {
	GraphQLID,
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

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			client: {
				type: ClientType,
				args: { id: { type: GraphQLID } },
				resolve(parentValue, args) {
					return clients.find((client) => client.id === args.id);
				},
			},
		},
	}),
});

export default schema;
