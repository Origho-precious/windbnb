import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { data } from "../../data/stays";

const Home = ({ search }) => {
	const [results, setResults] = useState(data);
	const [stays, setStays] = useState(data.length);

	useEffect(() => {
		const processSearchResult = () => {
			if (search) {
				const filteredResult = data.filter((item) => {
					return (
						`${item.city}, ${item.country}` === search.location &&
						item.maxGuests > search.guests
					);
				});

				setResults(filteredResult);
				setStays(filteredResult.length);
			}
		};

		processSearchResult();
	}, [search]);

	const renderHouses = () => {
		return results.map((item) => {
			return (
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
			);
		});
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
