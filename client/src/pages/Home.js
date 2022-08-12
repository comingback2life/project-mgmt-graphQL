import { Clients } from '../components/Clients';
import { Projects } from '../components/Projects';
import { AddClientModal } from '../Modal/AddClientModal';
import { AddProjectModal } from '../Modal/AddProjectModal';

export const Home = () => {
	return (
		<>
			<div className="d-flex gap-3 mb-4">
				<AddClientModal />
				<AddProjectModal />
			</div>
			<Clients />
			<hr />
			<Projects />
		</>
	);
};
