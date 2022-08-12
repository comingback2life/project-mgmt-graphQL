import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
import cors from 'cors';
import { connectDatabase } from './config/dbConfig.js';
import path from 'path';

const PORT = process.env.PORT || 8000;
const app = express();
const __dirname = path.resolve();

connectDatabase();
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'client', 'build')));
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === 'development', //for use in development
	})
);
app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
