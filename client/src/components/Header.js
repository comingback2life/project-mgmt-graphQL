import logo from './assets/logo.png';
export const Header = () => {
	return (
		<nav className="navbarbg-light mb-4 p-0">
			<div className="container">
				<div className="navbar-brand">
					<div className="d-flex">
						<img src={logo} alt="logo" className="mr-2" />
						<div>Project Management GraphQL</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
