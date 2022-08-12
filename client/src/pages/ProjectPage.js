import { useQuery } from '@apollo/client';
import { GET_SINGLE_PROJECT } from '../queries/projectQueries';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { ClientInfo } from '../components/ClientInfo';
import { DeleteProjectButton } from '../components/DeleteProjectButton';
export const ProjectPage = () => {
	const { id } = useParams();
	const { loading, data, error } = useQuery(GET_SINGLE_PROJECT, {
		variables: { id },
	});
	if (loading) return <Spinner />;
	if (error) return <p>Something went wrong!</p>;
	return (
		<>
			{!loading && !error && (
				<div className="mx-auto w-75 card p-5">
					<Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
						Go Back!
					</Link>
					<h3>{data.project.name}</h3>
					<p>{data.project.description}</p>
					<h6 className="mt-3">Project Status</h6>
					<p className="lead">{data.project.status}</p>
					<ClientInfo client={data.project.client} />
					<DeleteProjectButton projectId={data.project.id} />
				</div>
			)}
		</>
	);
};
