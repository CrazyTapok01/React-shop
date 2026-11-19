import { formatPrice } from '../utils.js';

function CartItem({ item, onChangeQty, onRemove }) {
  return (
    <li className="cart-item">
      <div className="cart-item-emoji" aria-hidden="true">{item.emoji}</div>
      <div>
        <p className="cart-item-title">{item.title}</p>
        <p className="cart-item-price">
          {formatPrice(item.price)} × {item.qty} = {formatPrice(item.price * item.qty)}
        </p>
        <div className="qty">
          <button
            onClick={() => onChangeQty(item.id, -1)}
            disabled={item.qty <= 1}
            aria-label="Уменьшить количество"
          >
            −
          </button>
          <span>{item.qty}</span>
          <button
            onClick={() => onChangeQty(item.id, 1)}
            disabled={item.qty >= item.stock}
            aria-label="Увеличить количество"
          >
            +
          </button>
          <button className="btn-link" onClick={() => onRemove(item.id)}>
            Удалить
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
