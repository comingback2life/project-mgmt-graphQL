import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema/schema.js';
import { projects, clients } from './sampleData.js';
const PORT = process.env.PORT || 8000;

const app = express();
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === 'development', //for use in development
	})
);
app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
