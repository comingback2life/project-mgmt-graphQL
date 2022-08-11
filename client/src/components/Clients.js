import { gql, useQuery } from '@apollo/client';

//gql makes the query and to use the Query useQuery hook is used
const GET_CLIENTS = gql`
	query getClients {
		clients {
			id
			name
			email
			phone
		}
	}
`;
export const Clients = () => {
	const { loading, error, data } = useQuery(GET_CLIENTS);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Something went wrong</p>;
	return <>{!loading && !error && <h1>Clients</h1>}</>;
};
