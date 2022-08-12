import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { GET_PROJECTS } from '../queries/projectQueries';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { Spinner } from '../components/Spinner';
export const AddProjectModal = () => {
	const [form, setForm] = useState({});
	const [addProject] = useMutation(ADD_PROJECT, {
		variables: {
			name: form.name,
			description: form.description,
			status: form.status,
			clientId: form.clientId,
		},
		update(cache, { data: { addProject } }) {
			const { projects } = cache.readQuery({ query: GET_PROJECTS });
			cache.writeQuery({
				query: GET_PROJECTS,
				data: { projects: [...projects, addProject] }, //alternatively use concat
			});
		},
	});
	const { error, loading, data } = useQuery(GET_CLIENTS);
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleOnSubmit = (e) => {
		const { name, description, status, clientId } = form;
		e.preventDefault();
		if (name === undefined || description === undefined) {
			return alert('All the fields must be filled');
		}
		if (!status) {
			form.status = 'new';
		}
		if (clientId === undefined) {
			return alert('Please select a client to associate with the project');
		}
		console.log(form);
		addProject(name, description, status, clientId);
	};
	if (loading) return <Spinner />;
	if (error) return <p>Something went wrong !</p>;
	return (
		<>
			{!loading && !error && (
				<>
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#addProjectModal"
					>
						<div className="d-flex align-items-center">
							<FaList className="icon" />
							New Project
						</div>
					</button>

					<div
						className="modal fade"
						id="addProjectModal"
						tabIndex="-1"
						aria-labelledby="addProjectModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="addProjectModalLabel">
										Add New Project
									</h5>
									<button
										type="button"
										className="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close"
									></button>
								</div>
								<div className="modal-body">
									<form onSubmit={handleOnSubmit}>
										<div className="mb-3">
											<label className="form-label">Name</label>
											<input
												type="text"
												className="form-control"
												name="name"
												id="name"
												onChange={handleOnChange}
											/>
										</div>
										<div className="mb-3">
											<label className="form-label">Description</label>
											<textarea
												className="form-control"
												name="description"
												id="description"
												onChange={handleOnChange}
											></textarea>
										</div>
										<div className="mb-3">
											<label className="form-label">Status</label>
											<select
												name="status"
												id="status"
												className="form-select"
												onChange={handleOnChange}
												defaultValue="new"
											>
												<option value="new">Not Started</option>
												<option value="progress">In progress</option>
												<option value="completed">Completed</option>
											</select>
										</div>
										<div className="mb-3 mt-2">
											<label className="form-label">
												<strong>Client</strong>
											</label>
											<select
												name="clientId"
												id="clientId"
												className="form-select"
												onChange={handleOnChange}
											>
												<option value="">Select Client</option>
												{data.clients.map((client) => (
													<option key={client.id} value={client.id}>
														{client.name}
													</option>
												))}
											</select>
										</div>
										<button
											className="btn btn-primary"
											type="submit"
											data-bs-dismiss="modal"
										>
											Submit
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};
