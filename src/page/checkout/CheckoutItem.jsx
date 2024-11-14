import { getSizeName } from "@/utils/getSizeName"
import Image from "next/image"

const CheckoutItem = ({item}) => {
  return (
    <div className="cart-item">
    <div className="cart-item-details">
      <Image
        className="item-image"
        src={item?.imageurl}
        alt="Black Hoodie"
        width={80}
        height={80}
      />
      <div>
        <h4 className="item-name">{item?.name}</h4>
        <p className="item-size">Size: {getSizeName(item?.size)}</p>
      </div>
    </div>
    <div className="item-pricing">
      <p className="item-quantity">Quantity: {item?.quantity}</p>
      <p className="item-total">₹ {item?.price}</p>
    </div>
  </div>
  )
}

export default CheckoutItem