import React, { useState, useEffect } from "react";
import "./Carousel.css";

const images = [
  "/images/slika1.png",
  "/images/slika2.png",
  "/images/slika3.png",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // menja sliku na svakih 3 sekunde

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <img src={images[currentIndex]} alt={`Slika ${currentIndex + 1}`} />
      <div className="carousel-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={idx === currentIndex ? "dot active" : "dot"}
            onClick={() => setCurrentIndex(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
