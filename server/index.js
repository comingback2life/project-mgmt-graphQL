if (process.env.NODE_ENV === 'development') {
	require('dotenv/config');
}
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
import cors from 'cors';
import { connectDatabase } from './config/dbConfig.js';
const PORT = process.env.PORT || 8000;
const app = express();
connectDatabase();
app.use(cors());
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === 'development', //for use in development
	})
);
app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
