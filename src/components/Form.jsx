// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import Button from "./Button";
import BackButton from "./BackButton";
import useURLPosition from "../hooks/useURLPosition";
import Message from "./Message";
import Spinner from "./Spinner";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useCity } from "../contexts/useCity";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useURLPosition();
  const [cityName, setCityName] = useState("");
  const [country, setcountry] = useState();
  const [isLoadingCityData, setIsLoadingCityData] = useState();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState();
  const [geoError, setGeoError] = useState();

  const { postData, isLoading } = useCity();

  useEffect(() => {
    async function fetchReverseGPS() {
      try {
        if (!lat && !lng) return;
        setGeoError("");
        setIsLoadingCityData(true);
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "that doesn't seem to be an actual country, click somewhere else"
          );
        setCityName(data.city || data.locality || "");
        setcountry(data.country || "");
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeoError(error.message);
      } finally {
        setIsLoadingCityData(false);
      }
    }
    fetchReverseGPS();
  }, [lat, lng]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!cityName && !date) return;

    const cityDetail = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
      // id: Math.floor(Math.random() * 1000000)
    };
    postData(cityDetail);
  }

  if (isLoadingCityData) return <Spinner />;
  if (!lat && !lng)
    return <Message message="start by clicking somewhere on the map" />;
  if (geoError) return <Message message={geoError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/mm/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
