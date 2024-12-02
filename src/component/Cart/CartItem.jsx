import { useState } from "react";
import { addQuantity, removeFromCart, removeQuantity, updateCart } from "../../service/cartService";

export default function CartItem(props) {
  const [quantity, setQuantity] = useState(props.item.quantity);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  async function handleAddQuantity() {
    setQuantity(quantity + 1);
    try {
      const response = await addQuantity(
        userId,
        props.item.foodItems.id,
      );
      props.handleGetCartItems()
      props.handleTotalCost();
    } catch (error) {}
  }

  async function handleRemoveQuantity() {
    if (quantity != 1) {
      setQuantity(quantity - 1);
      try {
        const response = await removeQuantity(
          userId,
          props.item.foodItems.id,
        );
        props.handleGetCartItems();
        props.handleTotalCost();
      } catch (error) {}
    }
  }

  async function handleRemove() {
    try {

        const response = await removeFromCart(userId, props.item.foodItems.id);
        if(response.status == 200) {
            props.handleGetCartItems();
        }
    } catch(error) {

    }
  }

  return (
    <div key={props.id} className="border border-dark p-2 m-2 rounded-md">
      <div className="flex justify-between p-2">
        <div>{props.item.foodItems.name}</div>
        <div>Rs. {props.item.price}/-</div>
      </div>
      <div className="p-2">{props.item.foodItems.description}</div>
      <div className="flex justify-between pt-2">
      <div className="flex gap-2 items-center">
        <button className="btn btn-dark" onClick={handleRemoveQuantity}>
          -
        </button>
        <div>{quantity}</div>
        <button className="btn btn-dark" onClick={handleAddQuantity}>
          +
        </button>
      </div>
      <div>
        <button className="btn btn-dark" onClick={handleRemove}>remove from cart</button>
      </div>
      </div>
    </div>
  );
}