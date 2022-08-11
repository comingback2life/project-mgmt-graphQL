import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
const PORT = process.env.PORT || 8000;

const app = express();
app.use('/graphql', graphqlHTTP({}));
app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
