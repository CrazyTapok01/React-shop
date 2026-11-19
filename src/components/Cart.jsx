import CartItem from './CartItem.jsx';
import { formatPrice } from '../utils.js';

function Cart({ items, totalPrice, onChangeQty, onRemove, onClear, onCheckout }) {
  if (items.length === 0) {
    return <p className="empty">Корзина пуста</p>;
  }

  return (
    <>
      <ul className="cart-list">
        {items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onChangeQty={onChangeQty}
            onRemove={onRemove}
          />
        ))}
      </ul>
      <div className="cart-total">
        <span>Итого:</span>
        <strong>{formatPrice(totalPrice)}</strong>
      </div>
      <button className="btn btn-primary btn-block" onClick={onCheckout}>
        Оформить заказ
      </button>
      <button className="btn-link" onClick={onClear}>
        Очистить корзину
      </button>
    </>
  );
}

export default Cart;
