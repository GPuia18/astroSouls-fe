"use client";
import Image from "next/image";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import React, { useEffect, useState } from "react";
import {
  getCall,
  getCallWithAuth,
  postCall,
  postCallWithAuth,
} from "../components/FetchData";
import Notification from "../components/Notification";
import { useRouter } from "next/navigation";
import Product from "../components/Product";
import Header from "../components/Header";

const LoginPage = () => {
  const router = useRouter();

  const userData = JSON.parse(localStorage.getItem("userData")) || null;

  const userDataExtended =
    JSON.parse(localStorage.getItem("userDataExtended")) || [];

  const [products, setProducts] = useState([]);

  const [getData, setGetData] = useState(true);

  const buyPlan = async (product) => {
    try {
      const data = await postCallWithAuth(
        "api/users/account-type",
        product,
        userData.token
      );
      console.log(data);
      userDataExtended.accountType = product.accountType;
      localStorage.setItem(
        "userDataExtended",
        JSON.stringify(userDataExtended)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async () => {
    try {
      const data = await getCallWithAuth("api/product", userData.token);
      console.log(data);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (getData) getProducts();
    setGetData(false);
  }, []);

  return (
    <div className="landing-back">
      {/* <Notification text={notificationText}></Notification> */}
      <Image
        src="/Stea.png"
        width={100}
        height={500}
        alt="Picture of the author"
        className="star"
      />
      <div className="main">
        <Header
          logo={true}
          premium={false}
          main={true}
          chat={true}
          profile={true}
        ></Header>

        <div className="content-main">
          <Image
            src={"/premium.png"}
            alt="premium"
            height={200}
            width={200}
          ></Image>
          <Image
            src={"/Cristal.png"}
            alt="cristal"
            height={200}
            width={200}
          ></Image>
          <div className="products">
            {products.map((product, index) => (
              <Product
                key={index}
                title={product.name}
                description={product.description}
                price={product.price}
                buyAction={buyPlan}
              ></Product>
            ))}
          </div>
        </div>
      </div>

      <Image
        src="/Stea.png"
        width={100}
        height={500}
        alt="Picture of the author"
        className="star"
      />
    </div>
  );
};

export default LoginPage;
