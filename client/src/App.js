import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Projects } from './components/Projects';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import { NotFound } from './pages/NotFound';
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
				<BrowserRouter>
					<div className="container">
						<Header />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</BrowserRouter>
			</ApolloProvider>
		</>
	);
}

export default App;
