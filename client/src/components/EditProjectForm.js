import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { GET_PROJECTS } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';
export const EditProjectForm = ({ project }) => {
	const [name, setName] = useState(project.name);
	const [description, setDescription] = useState(project.description);
	const [status, setStatus] = useState('');
	const [updateProject] = useMutation(UPDATE_PROJECT, {
		variables: { id: project.id, name, description, status },
		refetchQueries: [{ query: GET_PROJECTS, variables: { id: project.id } }],
	});
	const handleOnSubmit = (e) => {
		e.preventDefault();
		if (!name || !description || !status) {
			return alert('Please fill out all the fields');
		}
		updateProject(name, description, status);
	};
	return (
		<div className="mt-5">
			<h3>Update Project Details</h3>
			<form onSubmit={handleOnSubmit}>
				<div className="mb-3">
					<label className="form-label">Name</label>
					<input
						type="text"
						className="form-control"
						name="name"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Description</label>
					<textarea
						className="form-control"
						name="description"
						id="description"
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						value={description}
					></textarea>
				</div>
				<div className="mb-3">
					<label className="form-label">Status</label>
					<select
						name="status"
						id="status"
						className="form-select"
						onChange={(e) => setStatus(e.target.value)}
					>
						<option value="new">Not Started</option>
						<option value="progress">In progress</option>
						<option value="completed">Completed</option>
					</select>
				</div>
				<button
					className="btn btn-primary"
					type="submit"
					data-bs-dismiss="modal"
				>
					Update
				</button>
			</form>
		</div>
	);
};
