import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
export const AddClientModal = () => {
	const [form, setForm] = useState({});
	const [addClient] = useMutation(ADD_CLIENT, {
		variables: { name: form.name, email: form.email, phone: form.phone },
		update(cache, { data: { addClient } }) {
			const { clients } = cache.readQuery({
				query: GET_CLIENTS,
			});
			cache.writeQuery({
				query: GET_CLIENTS,
				data: { clients: [...clients, addClient] },
			});
		},
	});
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleOnSubmit = (e) => {
		const { name, email, phone } = form;
		console.log(name, email, phone);
		e.preventDefault();
		if (name === undefined || email === undefined || phone === undefined) {
			alert('All the fields must be filled');
		}
		return addClient(name, email, phone);
		setForm('');
	};
	return (
		<>
			<button
				type="button"
				className="btn btn-secondary"
				data-bs-toggle="modal"
				data-bs-target="#addClientModal"
			>
				<div className="d-flex align-items-center">
					<FaUser className="icon" />
					Add Client
				</div>
			</button>

			<div
				className="modal fade"
				id="addClientModal"
				tabIndex="-1"
				aria-labelledby="addClientModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addClientModalLabel">
								Add New Client
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
									<label className="form-label">Email</label>
									<input
										type="email"
										className="form-control"
										name="email"
										id="email"
										onChange={handleOnChange}
									/>
								</div>
								<div className="mb-3">
									<label className="form-label">Phone</label>
									<input
										type="text"
										className="form-control"
										name="phone"
										id="phone"
										onChange={handleOnChange}
									/>
								</div>
								<button
									className="btn btn-secondary"
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
