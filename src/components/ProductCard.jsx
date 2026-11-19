import { formatPrice } from '../utils.js';

function ProductCard({ product, qtyInCart, onAdd }) {
  const outOfStock = product.stock === 0;
  const limitReached = qtyInCart >= product.stock;

  let buttonText = 'В корзину';
  if (outOfStock) {
    buttonText = 'Нет в наличии';
  } else if (limitReached) {
    buttonText = 'Максимум в корзине';
  }

  return (
    <article className="card">
      <div className="card-emoji" aria-hidden="true">{product.emoji}</div>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-title">{product.title}</h3>
        <p className="card-rating">★ {product.rating}</p>
        <p className="card-price">{formatPrice(product.price)}</p>
        {!outOfStock && (
          <p className="card-stock">
            В наличии: {product.stock} шт.
            {qtyInCart > 0 && ` · в корзине: ${qtyInCart}`}
          </p>
        )}
        <button
          className="btn"
          onClick={() => onAdd(product)}
          disabled={outOfStock || limitReached}
        >
          {buttonText}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
