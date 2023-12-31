/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCity } from "../contexts/useCity";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity, handleDelete } = useCity();

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <p className={styles.date}>({formatDate(date)})</p>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            handleDelete(id);
          }}
        >
          x
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
