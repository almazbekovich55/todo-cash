import React, { useContext, useState } from "react";
import "./Main.scss";
import axios from "axios";
import { ToDoContext } from "../../../context";
import { toast, Slide } from "react-toastify";

const Main = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { expen, cash, products, setExpen, setCash, setProducts } =
    useContext(ToDoContext);

  function postData() {
    if (!price || !name) {
      toast.error("Заполните все поля !", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    } else if (Number(price) > cash) {
      toast.error("Недостаточно средств!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    } else {
      const newData = {
        price,
        name,
      };
      axios.post(
        `https://api-crud.elcho.dev/api/v1/3323c-63f0b-9a337/todocash`,
        newData
      );
      setPrice("");
      setName("");
      setCash(cash - Number(price));
      setExpen(expen + Number(price));
      toast.success("Продукт успешно куплен !", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  }

  function deleteProducts(id) {
    const searchProduct = products.find((el) => el._id === id);
    axios
      .delete(
        `https://api-crud.elcho.dev/api/v1/3323c-63f0b-9a337/todocash/${id}`
      )
      .then(() => {
        const del = products.filter((el) => el._id !== id);
        setProducts(del);
        const productPrice = Number(searchProduct.price);
        setCash(cash + productPrice);
        setExpen(expen - productPrice);

        toast.success("Продукт успешно удалён и деньги возвращены !", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      });
  }

  return (
    <div id="main">
      <div className="container">
        <div className="main">
          <div className="main--money">
            <div className="main--money__left">
              <h1>
                Expenses <span>{expen}c</span>
              </h1>
            </div>

            <div className="main--money__rigth">
              <h1>
                Cash <br /> <span>{cash}c</span>
              </h1>
            </div>
          </div>
          <div className="main--post">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="number"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
            <button onClick={() => postData()}>Buy Product</button>
          </div>
          <div className="main--view">
            <div className="main--view__list">
              <h2>Name</h2>
              <h2>Price</h2>
              <h2>Action</h2>
            </div>
            {products.map((el) => (
              <div className="main--view__list--products" key={el._id}>
                <h2>{el.name}</h2>
                <h2>{el.price}</h2>
                <button onClick={() => deleteProducts(el._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
