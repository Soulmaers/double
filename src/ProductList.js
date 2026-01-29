import React from "react";

function ProductList({ products, addToCart }) {
  return (
    <div>
      <h1 className="mb-4">Каталог обуви</h1>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <div className="card h-100 shadow-sm product-card">
              <img
                src={product.image}
                className="card-img-top product-image"
                alt={product.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text fw-bold mb-3">
                  {product.price.toLocaleString("ru-RU")} ₽
                </p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => addToCart(product)}
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

