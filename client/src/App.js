import { Header } from './components/Header';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Clients } from './components/Clients';
import { AddClientModal } from './Modal/AddClientModal';
import { Projects } from './components/Projects';

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				clients: {
					merge(existingData, incomingData) {
						return incomingData;
					},
				},
				projects: {
					merge(existingData, incomingData) {
						return incomingData;
					},
				},
			},
		},
	},
});
const client = new ApolloClient({
	uri: 'http://localhost:8000/graphql',
	cache,
});
function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<div className="container">
					<Header />
					<AddClientModal />
					<Clients />
					<hr />
					<Projects />
				</div>
			</ApolloProvider>
		</>
	);
}

export default App;
