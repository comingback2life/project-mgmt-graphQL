import mongoose from 'mongoose';
import 'colors';

export const connectDatabase = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`Database has been connected : ${conn.connection.host}`.cyan);
	} catch (error) {
		console.log(error.message);
	}
};
