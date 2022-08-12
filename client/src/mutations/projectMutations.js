import { gql } from '@apollo/client';

const ADD_PROJECT = gql`
	mutation addProject(
		$name: String!
		$description: String!
		$status: ProjectStatus!
		$clientId: ID!
	) {
		addProject(
			name: $name
			description: $description
			status: $status
			clienId: $clientID
		) {
			id
			name
			description
			status
			client {
				id
				name
				email
				phone
			}
		}
	}
`;
