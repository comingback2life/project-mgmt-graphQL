import { Clients } from '../components/Clients';
import { Projects } from '../components/Projects';
import { AddClientModal } from '../Modal/AddClientModal';

export const Home = () => {
	return (
		<>
			<div className="d-flex gap-3 mb-4">
				<AddClientModal />
			</div>
			<Clients />
			<hr />
			<Projects />
		</>
	);
};
