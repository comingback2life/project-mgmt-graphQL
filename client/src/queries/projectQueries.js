import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
	query getProjects {
		projects {
			id
			name
			status
			description
		}
	}
`;

export const GET_SINGLE_PROJECT = gql`
	query getSingleProject($id: ID!) {
		project(id: $id) {
			id
			name
			status
			description
			client {
				id
				name
				email
				phone
			}
		}
	}
`;
