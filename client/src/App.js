import { Header } from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost:8000/graphql',
	cache: InMemoryCache(),
});
function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<div className="container">
					<Header />
					<h1>Hello</h1>
				</div>
			</ApolloProvider>
		</>
	);
}

export default App;
