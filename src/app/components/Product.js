import Image from "next/image";
import PrimaryButton from "./PrimaryButton";

export default function Product({ title, description, price, buyAction }) {
  return (
    <div className="product">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p>{description}</p>
      <p className="text-lg font-semibold">{price}$</p>
      <div
        className="button-buy"
        onClick={() =>
          buyAction({
            accountType: title,
          })
        }
      >
        Buy
      </div>
    </div>
  );
}
