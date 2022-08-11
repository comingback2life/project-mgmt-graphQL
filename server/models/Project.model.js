import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	status: {
		type: String,
		enum: ['Overdue', 'In Progress', 'Completed'],
	},
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client',
	},
});

export default mongoose.model('ProjectSchema', ProjectSchema);
