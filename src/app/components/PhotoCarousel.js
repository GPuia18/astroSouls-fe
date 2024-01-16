"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function PhotoCarousel({ images }) {
  const [picNr, setPicNr] = useState(0);

  const maxPicNr = images.length;

  const picNrBack = () => {
    if (picNr > 0) {
      setPicNr(picNr - 1);
    } else {
      setPicNr(maxPicNr - 1);
    }
  };

  const picNrNext = () => {
    if (picNr < maxPicNr - 1) {
      setPicNr(picNr + 1);
    } else {
      setPicNr(0);
    }
  };

  return (
    <div className="carousel">
      <div className="pic-btn">
        <Image
          src={"/back.png"}
          width={10}
          height={10}
          alt="Back pic"
          onClick={picNrBack}
          className="cursor-pointer"
        ></Image>
      </div>
      {images.length === 0 ? (
        <div className="carousel-pic">
          <Image
            src={"/anonym.png"}
            width={300}
            height={300}
            alt="Profile pic"
          ></Image>
        </div>
      ) : (
        <div className="carousel-pic">
          <Image
            src={`/uploads/${images[picNr]}`}
            width={300}
            height={300}
            alt="Profile pic"
          ></Image>
        </div>
      )}
      <div className="pic-btn">
        <Image
          src={"/next.png"}
          width={10}
          height={10}
          alt="Next pic"
          onClick={picNrNext}
          className="cursor-pointer"
        ></Image>
      </div>
    </div>
  );
}
