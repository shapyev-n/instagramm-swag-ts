import Card from '../contents/Card';
import Hero from '../contents/Hero';
import './pages.scss';

const HomePage = () => {
	return (
		<div id="list">
			<Hero />
			<div className="container">
				<div className="list">
					<Card />
					<Card />
					<Card />
					<Card />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
