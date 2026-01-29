import React, { useState } from "https://esm.sh/react@18.3.1";
import { Routes, Route, Link } from "https://esm.sh/react-router-dom@6.28.0";
import ProductList from "./ProductList.js";
import Cart from "./Cart.js";

const initialProducts = [
  {
    id: 1,
    name: "Кроссовки Runner Pro",
    price: 5990,
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Кеды Street Classic",
    price: 4290,
    image:
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Ботинки Hiking Pro",
    price: 7990,
    image:
      "https://images.pexels.com/photos/7691362/pexels-photo-7691362.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Кроссовки Air Light",
    price: 6490,
    image:
      "https://images.pexels.com/photos/102129/pexels-photo-102129.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const changeQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            ShoeStore
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Каталог
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link position-relative" to="/cart">
                  Корзина
                  {totalCount > 0 && (
                    <span className="badge bg-danger ms-1">
                      {totalCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="py-4">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <ProductList products={initialProducts} addToCart={addToCart} />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  items={cartItems}
                  removeFromCart={removeFromCart}
                  changeQuantity={changeQuantity}
                  clearCart={clearCart}
                />
              }
            />
          </Routes>
        </div>
      </main>

      <footer className="bg-dark text-light text-center py-3 mt-auto">
        <small>© {new Date().getFullYear()} ShoeStore. Все права защищены.</small>
      </footer>
    </div>
  );
}

export default App;

