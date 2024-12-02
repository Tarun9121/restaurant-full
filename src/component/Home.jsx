import { useEffect, useState } from "react";
import { getAllAVLFoodItems, getCategories, searchFood } from "../service/dishService";
import { addToCart } from "../service/cartService";
import { useNavigate } from "react-router-dom";
import { getAllDishes, removeDish } from "../service/adminService";

export default function Home() {
  const [searchbar, setSearchbar] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [allFood, setAllFood] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isClicked, setIsClicked] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [addCartError, setAddCartError] = useState(null);
  const [removalMsg, setRemovalMsg] = useState();
  const [veg, setVeg] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();

  async function handleGetCategories() {
    try {
      const response = await getCategories();
      if (response.status === 200) {
        setAllCategories(response.data);
      }
    } catch (error) {
      setAllCategories([]);
    }
  }

  function filter() {
    if (!allFood) return;

    let filteredItems = [...allFood];

    if (category) {
      filteredItems = filteredItems.filter((item) => item.foodCategory === category);
    }

    if (veg) {
      filteredItems = filteredItems.filter((item) => item.isVeg);
    }

    setFoodItems(filteredItems);
  }

  useEffect(() => {
    filter();
  }, [veg, category]);

  async function search() {
    try {
      const response = searchbar
        ? await searchFood(searchbar)
        : role === "ADMIN"
        ? await getAllDishes()
        : await getAllAVLFoodItems();

      if (response.status === 200) {
        setFoodItems(response.data);
        setAllFood(response.data);
      } else {
        setFoodItems([]);
        setAllFood([]);
      }
    } catch (error) {
      setErrorMsg("Sorry, something went wrong.");
      setFoodItems([]);
    }
  }

  async function handleAddCart(dishId) {
    try {
      const userId = localStorage.getItem("userId");
      const response = await addToCart(userId, dishId, quantity);
      if (response.status === 200) {
        setAddCartError("success");
      }
    } catch (error) {
      setAddCartError(error.response?.data?.message || "failed");
    }
  }

  async function handleRemoveDish(dishId) {
    try {
      const response = await removeDish(dishId);
      if (response.status === 200) {
        setRemovalMsg("success");
        search();
      }
    } catch (error) {
      setRemovalMsg("failed");
    }
  }

  function addQuantity() {
    setQuantity(quantity + 1);
  }

  function removeQuantity() {
    if (quantity > 1) setQuantity(quantity - 1);
  }

  function handleClose() {
    setAddCartError(null);
    setQuantity(1);
  }

  function handleCloseButton() {
    setIsClicked("");
  }

  useEffect(() => {
    search();
    handleGetCategories();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-slate-300">
        <div className="text-xl font-bold">Restaurant</div>
        <div className="flex items-center gap-4">
          <form className="flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              name="searchbar"
              value={searchbar}
              placeholder="Search something"
              className="p-2 border border-gray-300 rounded"
              onChange={(e) => setSearchbar(e.target.value)}
            />
            <button className="px-3 py-2 text-white bg-black rounded" onClick={search}>
              Search
            </button>
          </form>
          <div>
            <select
              value={category}
              className="p-2 border border-gray-300 rounded"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              {Array.isArray(allCategories) &&
                allCategories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="veg"
              checked={veg}
              onChange={(e) => setVeg(e.target.checked)}
            />
            <span>Veg</span>
          </div>
          {role === "ADMIN" && (
            <button
              className="px-3 py-2 text-white bg-black rounded"
              onClick={() => navigate("/add-dish")}
            >
              Add Dishes
            </button>
          )}
          <button
            className="px-3 py-2 text-white bg-black rounded"
            onClick={() => navigate("/view-profile")}
          >
            View Profile
          </button>
          <button
            className="px-3 py-2 text-white bg-black rounded"
            onClick={() => {
              localStorage.setItem("userId", "");
              localStorage.setItem("role", "");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {errorMsg && <div className="p-3 text-center bg-red-50">{errorMsg}</div>}
   
      <div>
        {foodItems.length === 0 ? (
          <div className="p-3 text-center bg-red-50">Sorry, there are no items.</div>
        ) : (
          <ul>
            {foodItems.map((item) => (
              <li key={item.id} className="p-3 border border-black rounded">
                <div onClick={() => setIsClicked(item.id)}>
                  <div className="flex justify-between p-2">
                    <div className="text-xl font-bold">{item.name}</div>
                    <div>{item.price}</div>
                  </div>
                  <div className="p-2">
                    <div className="text-justify">{item.description}</div>
                  </div>
                </div>
                {item.id === isClicked && (
                  <div>
                    <h4>Add this item to cart</h4>
                    {addCartError === "success" && (
                      <div className="p-3 text-center bg-green-50">Item added successfully</div>
                    )}
                    <div>
                      <div className="flex item-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-2 text-white bg-black rounded" onClick={removeQuantity}>
                            -
                          </button>
                          {quantity}
                          <button className="px-3 py-2 text-white bg-black rounded" onClick={addQuantity}>
                            +
                          </button>
                        </div>
                        {role === "ADMIN" && (
                          <div>
                            <button
                              className="px-3 py-2 text-white bg-black rounded"
                              onClick={() => handleRemoveDish(item.id)}
                            >
                              Remove Dish
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <button
                          className="px-3 py-2 text-white bg-black rounded"
                          onClick={() => handleAddCart(item.id)}
                        >
                          Add To Cart
                        </button>
                        <button
                          className="px-3 py-2 text-white bg-black rounded"
                          onClick={handleCloseButton}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-3 bg-slate-300">
        <button className="px-3 py-2 text-white bg-black rounded" onClick={() => navigate("/view-cart")}>
          View Cart
        </button>
      </div>
    </div>
  );
}
