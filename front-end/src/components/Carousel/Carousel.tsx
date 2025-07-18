import React, { useState, useEffect } from "react";
import "./Carousel.css";

const images = [
  "/images/rostilj.jpg",
  "/images/salata.jpg",
  "/images/dezert.jpg",
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrentIndex((i) => (i + 1) % images.length),
      3000
    );
    return () => clearInterval(id);
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
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

