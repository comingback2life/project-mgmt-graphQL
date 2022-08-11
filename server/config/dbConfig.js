import mongoose from 'mongoose';

export const connectDatabase = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`Database has been connected : ${conn.connection.host}`).magenta
			.underline;
	} catch (error) {}
};
