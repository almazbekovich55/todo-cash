import React, { useEffect, useState } from "react";
import { ToDoContext } from ".";
import axios from "axios";

const RootContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cash, setCash] = useState(10000);
  const [expen, setExpen] = useState(0);

  async function getData() {
    let res = await axios(
      `https://api-crud.elcho.dev/api/v1/3323c-63f0b-9a337/todocash`
    );
    setProducts(res.data.data);
    console.log("products:", res.data.data);
  }
  useEffect(() => {
    getData();
  }, [products]);

  return (
    <ToDoContext.Provider
      value={{ expen, cash, products, setExpen, setCash, setProducts }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export default RootContext;
