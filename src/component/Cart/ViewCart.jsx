import { useEffect, useState } from "react";
import { totalCost, viewCart } from "../../service/cartService";
import CartItem from "./CartItem";
import { palceOrder } from "../../service/orderService";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function ViewCart() {
  const [cartItems, setCartItems] = useState(null);

  const [palceOrderMsg, setPlaceOrderMsg] = useState(null);

  const navigate = useNavigate();
  const [total, setTotal] = useState(0);



  async function handleTotalCost() {
    try {
      const userId = localStorage.getItem("userId");
      const response = await totalCost(userId)
      if(response.status == 200) {
        setTotal(response.data)
      }
    } catch(error) {
      setTotal(0);
    }
  }

  async function handlePlaceOrder() {
    try {
      const userId = localStorage.getItem("userId");
      const response = await palceOrder(userId);
      console.log(response)
      if (response.status == 200) {
        setPlaceOrderMsg("success");
        navigate("/recent-order")
      }
    } catch (error) {
      console.log("error", error);
      setPlaceOrderMsg("failed");
    }
  }

  async function handleGetCartItems() {
    try {
      const userId = localStorage.getItem("userId");
      const response = await viewCart(userId);
      console.log(response);
      if (response.status == 200) {
        setCartItems(response.data);
      }
    } catch (error) {
      setCartItems([]);
    }
  }

  useEffect(() => {
    handleTotalCost();
  }, [])

  useEffect(() => {
    handleGetCartItems();
  }, [palceOrderMsg]);

  return (
    <div>
      <div className="flex justify-between p-3 bg-slate-300">
        <div className="text-xl font-bold" onClick={() => navigate("/home")}>
          Restaurant
        </div>
        <div>
          <button
            className="btn btn-dark mr-2"
            onClick={() => navigate("/orders")}
          >
            View Orders
          </button>
          <button className="btn btn-dark" onClick={() => navigate("/home")}>
            Home
          </button>
        </div>
      </div>

      {palceOrderMsg && palceOrderMsg == "success" ? (
        <div className="bg-green-50 rounded-xl m-3 p-3 text-center">
          Order placed successfully
        </div>
      ) : palceOrderMsg == "failed" ? (
        <div className="bg-red-50 p-3 text-center rounded-xl m-3">
          Order failed, please try again
        </div>
      ) : (
        <div></div>
      )}
      {cartItems == null ? (
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : Array.isArray(cartItems) ? (
        cartItems.length == 0 ? (
          <div className="bg-green-50 rounded-xl m-3 p-3 text-center">
            there are no items in your cart
          </div>
        ) : (
          <div className="px-3">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleTotalCost={handleTotalCost}
                handleGetCartItems={handleGetCartItems}
              />
            ))}

            <div className="">
              <div className="p-2">Total price: {total}/-</div>

              <button className="btn btn-dark ml-2" onClick={handlePlaceOrder}>
                place order
              </button>
            </div>
          </div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
}