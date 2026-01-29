import React from "https://esm.sh/react@18.3.1";
import { Link } from "https://esm.sh/react-router-dom@6.28.0";

function Cart({ items, removeFromCart, changeQuantity, clearCart }) {
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!items.length) return;
    alert("Спасибо за заказ! (демо-оформление)");
    clearCart();
  };

  return (
    <div>
      <h1 className="mb-4">Корзина</h1>
      {items.length === 0 ? (
        <div className="text-center py-5">
          <p className="mb-3">Ваша корзина пуста.</p>
          <Link className="btn btn-primary" to="/">
            Перейти к каталогу
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive mb-4">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Товар</th>
                  <th className="text-center">Количество</th>
                  <th className="text-end">Цена</th>
                  <th className="text-end">Сумма</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-image me-3"
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => changeQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="btn btn-light px-3">
                          {item.quantity}
                        </span>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => changeQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-end">
                      {item.price.toLocaleString("ru-RU")} ₽
                    </td>
                    <td className="text-end">
                      {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div className="fw-bold fs-5">
              Итого: {totalPrice.toLocaleString("ru-RU")} ₽
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" onClick={clearCart}>
                Очистить корзину
              </button>
              <button className="btn btn-success" onClick={handleCheckout}>
                Оформить заказ
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

