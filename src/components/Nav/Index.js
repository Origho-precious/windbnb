import React, { useState } from "react";
import styles from "./nav.module.css";

const Search = (props) => {
	// Selected Location state
	const [location, setLocation] = useState(null);
	// Number of Guests state
	const [guests, setGuests] = useState(0);
	// Dropdown handler state
	const [locDropdown, setLocDropdown] = useState(false);
	const [guestsDropdown, setGuestsDropdown] = useState(false);

	const submitHandler = () => {
		const data = {
			location,
			guests,
		};

		if (location && guests) {
			props.getSearch(data);
		}
	};

	return (
		<div
			className={
				locDropdown || guestsDropdown
					? `${styles.Nav} ${styles.modal}`
					: `${styles.Nav}`
			}
		>
			<h6 className={styles.logo}>
				<i className="fab fa-airbnb"></i> windbnb
			</h6>
			<div className={styles.search}>
				<div
					onClick={() => {
						setLocDropdown(!locDropdown);
						setGuestsDropdown(false);
					}}
					className={styles.location}
				>
					<div className={styles.current}>
						<p>{location ? location : "Select Location"}</p>
					</div>
					<div
						className={
							locDropdown
								? `${styles.options} ${styles.show1}`
								: `${styles.options} ${styles.hide}`
						}
					>
						<p onClick={(e) => setLocation(e.target.textContent)}>
							<i className="fas fa-map-marker-alt"></i>Helsinki, Finland
						</p>
						<p onClick={(e) => setLocation(e.target.textContent)}>
							<i className="fas fa-map-marker-alt"></i>Turku, Finland
						</p>
						<p onClick={(e) => setLocation(e.target.textContent)}>
							<i className="fas fa-map-marker-alt"></i>Oulu, Finland
						</p>
						<p onClick={(e) => setLocation(e.target.textContent)}>
							<i className="fas fa-map-marker-alt"></i>Vaasa, Finland
						</p>
					</div>
				</div>
				<div
					onBlur={() => setGuestsDropdown(false)}
					onClick={() => {
						setGuestsDropdown(!guestsDropdown);
						setLocDropdown(false);
					}}
					className={styles.guests}
				>
					<div className={styles.current}>
						<p>{guests ? `${guests} Guest(s)` : "How Many Guests?"}</p>
					</div>
					<div
						onClick={(e) => e.stopPropagation()}
						className={
							guestsDropdown
								? `${styles.options} ${styles.show2}`
								: `${styles.options} ${styles.hide}`
						}
					>
						<p>Maximum of 10 guests</p>
						<div className={styles.controls}>
							<div
								onClick={
									guests <= 10 && guests > 0
										? (e) => setGuests(guests - 1)
										: null
								}
							>
								-
							</div>
							<p>{guests}</p>
							<div onClick={guests <= 9 ? (e) => setGuests(guests + 1) : null}>
								+
							</div>
						</div>
						<button
							onClick={() => setGuestsDropdown(!guestsDropdown)}
							type="button"
						>
							Close
						</button>
					</div>
				</div>
				<div onClick={submitHandler} className={styles.searchBtn}>
					<i className="fas fa-search"></i>
				</div>
			</div>
		</div>
	);
};

export default Search;
