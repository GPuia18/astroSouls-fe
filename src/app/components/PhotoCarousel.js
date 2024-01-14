"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function PhotoCarousel({ username, nrPics }) {
  const [picNr, setPicNr] = useState(1);
  const [picName, setPicName] = useState(
    nrPics > 0 ? "/" + username + "-" + picNr + ".png" : "/test-1.png"
  );
  const maxPicNr = nrPics > 0 ? nrPics : 1;

  const picNrBack = () => {
    if (picNr > 1) {
      setPicNr(picNr - 1);
    } else {
      setPicNr(maxPicNr);
    }
  };

  const picNrNext = () => {
    if (picNr < maxPicNr) {
      setPicNr(picNr + 1);
    } else {
      setPicNr(1);
    }
  };

  const changePicName = useEffect(() => {
    setPicName("/" + username + "-" + picNr + ".png");
  }, [picNr]);

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
      <div className="carousel-pic">
        <Image src={picName} width={300} height={300} alt="Profile pic"></Image>
      </div>
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
