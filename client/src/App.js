import { Header } from './components/Header';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Clients } from './components/Clients';

const client = new ApolloClient({
	uri: 'http://localhost:8000/graphql',
	cache: new InMemoryCache(),
});
function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<div className="container">
					<Header />
					<Clients />
				</div>
			</ApolloProvider>
		</>
	);
}

export default App;
