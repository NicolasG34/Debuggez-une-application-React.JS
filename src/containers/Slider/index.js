import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Trie du plus récent au plus ancien
  const byDateAsc = data?.focus
    ? [...data.focus].sort((evtA, evtB) =>
        new Date(evtB.date) - new Date(evtA.date)
      )
    : [];

  useEffect(() => {
    if (byDateAsc.length === 0) return () => {}; // fonction vide si pas d'éléments

    const timer = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateAsc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, byDateAsc.length]);

  return (
    <div className="SlideCardList">
      {byDateAsc.map((event, idx) => (
        <div key={event.id || event.title} className="SlideCardWrapper">
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.title || "événement"} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateAsc.map((event, radioIdx) => (
            <input
              key={event.id || radioIdx}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
              aria-label={`Aller à la diapositive ${radioIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;