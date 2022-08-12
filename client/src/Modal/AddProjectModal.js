import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
export const AddProjectModal = () => {
	const [form, setForm] = useState({});
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleOnSubmit = (e) => {
		const { name, description, status } = form;
		e.preventDefault();
		if (name === undefined || description === undefined) {
			return alert('All the fields must be filled');
		}
		if (status === undefined) {
			form.status = 'new'; //explicilty setting the value to be not started
		}
		// addClient(name, email, phone);
		setForm('');
	};
	return (
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
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
