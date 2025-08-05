import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <div className="aboutus-text">
        <h2>O nama</h2>
        <p>
          Dobrodošli na našu stranicu! Mi smo posvećeni pružanju najboljih usluga dostave, 
          sa fokusom na brzinu, kvalitet i zadovoljstvo kupaca. Naša misija je da vaša narudžbina 
          stigne na vašu adresu brzo i sigurno, uz najviši nivo profesionalizma.
        </p>
        <p>
          Naš tim se sastoji od iskusnih stručnjaka koji koriste moderne tehnologije kako bi osigurali
          da svaki korak procesa bude efikasan i transparentan. Verujemo u transparentnost, 
          povratne informacije i neprestano usavršavanje.
        </p>
      </div>
      <div className="aboutus-image">
        <img src="/images/onama.jpg" alt="O nama" />
      </div>
    </div>
  );
};

export default AboutUs;
