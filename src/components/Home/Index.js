import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { data } from "../../data/stays";

const Home = (props) => {
	const [results, setResults] = useState(null);
	const [searchQuery, setSearchQuery] = useState(null);
	const [stays, setStays] = useState(0);

	useEffect(() => {
		const fetchData = () => {
			setResults(data);

			setSearchQuery(props.search);

			setStays(data.length);
		};

		fetchData();
	}, [searchQuery, props.search, results]);

	const renderHouses = () => {
		if (results && !searchQuery) {
			return results.map((item) => (
				<div className={styles.gridItem} key={item.title}>
					<img src={item.photo} alt="house" />
					<div className={styles.texts}>
						{item.superHost ? (
							<span className={styles.superHost}>SUPERHOST</span>
						) : null}
						<span>
							{item.type} &nbsp; {item.beds ? `${item.beds} beds` : null}
						</span>
						<span>
							<i className="fas fa-star"></i> {item.rating}
						</span>
					</div>
					<p>{item.title}</p>
				</div>
			));
		}

		if (results && searchQuery) {
			return results.map((item) => {
				return `${item.city}, ${item.country}` === searchQuery.location &&
					(item.maxGuests === searchQuery.guests ||
						item.maxGuests > searchQuery.guests) ? (
					<div className={styles.gridItem} key={item.title}>
						<img src={item.photo} alt="house" />
						<div className={styles.texts}>
							{item.superHost ? (
								<span className={styles.superHost}>SUPERHOST</span>
							) : null}
							<span>
								{item.type} &nbsp; {item.beds ? `${item.beds} beds` : null}
							</span>
							<span>
								<i className="fas fa-star"></i> {item.rating}
							</span>
						</div>
						<p>{item.title}</p>
					</div>
				) : null;
			});
		}
	};

	return (
		<div className={styles.Home}>
			<header>
				<h2>Stays in Finland</h2>
				<p>{stays ? `${stays} stay(s)` : "12+ stays"}</p>
			</header>
			<div className={styles.grid}>{renderHouses()}</div>
		</div>
	);
};

export default Home;
