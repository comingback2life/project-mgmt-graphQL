import {
	GraphQLEnumType,
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
				ProjectModel.find({ clientId: args.id }).then((projects) => {
					projects.forEach((project) => {
						project.remove();
					});
				});
				return ClientModel.findByIdAndRemove(args.id);
			},
		},

		//Add Project
		addProject: {
			type: ProjectType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLNonNull(GraphQLString) },
				status: {
					type: new GraphQLEnumType({
						name: 'ProjectStatus',
						values: {
							new: { value: 'Not Started' },
							progress: { value: 'In progress' },
							completed: { value: 'Completed' },
						},
					}),
					defaultValue: 'Not Started',
				},
				clientId: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				const project = new ProjectModel({
					name: args.name,
					description: args.description,
					status: args.status,
					clientId: args.clientId,
				});
				return project.save();
			},
		},

		//Delete a project
		deleteProject: {
			type: ProjectType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return ProjectModel.findByIdAndRemove(args.id);
			},
		},

		//Update a project
		updateProject: {
			type: ProjectType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				name: { type: GraphQLString },
				description: { type: GraphQLString },
				status: {
					type: new GraphQLEnumType({
						name: 'updateProjectStatus',
						values: {
							new: { value: 'Not Started' },
							progress: { value: 'In progress' },
							completed: { value: 'Completed' },
						},
					}),
				},
			},
			resolve(parent, args) {
				return ProjectModel.findByIdAndUpdate(
					args.id,
					{
						$set: {
							name: args.name,
							description: args.description,
							status: args.status,
						},
					},
					{ new: true }
				);
			},
		},
	},
});
const schema = new GraphQLSchema({ query: RootQuery, mutation });

export default schema;
