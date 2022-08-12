import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import { NotFound } from './pages/NotFound';
import { ProjectPage } from './pages/ProjectPage';
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
	uri: '/graphql',
	cache,
});
function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<BrowserRouter>
					<div className="container">
						<div className="mt-3">
							<Link to="/" className="text-decoration-none">
								<Header />
							</Link>
						</div>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/projects/:id" element={<ProjectPage />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</BrowserRouter>
			</ApolloProvider>
		</>
	);
}

export default App;
