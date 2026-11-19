import { formatDate, formatPrice, orderNumber } from '../utils.js';

function OrderHistory({ orders, onClear }) {
  function handleClear() {
    if (window.confirm('Удалить всю историю заказов?')) {
      onClear();
    }
  }

  return (
    <section className="history" aria-label="История заказов">
      <h2>История заказов ({orders.length})</h2>
      {orders.length === 0 && <p className="empty">Заказов пока нет</p>}
      {orders.length > 0 && (
        <>
          <ul className="order-list">
            {orders.map(order => (
              <li key={order.id} className="order">
                <p className="order-head">
                  <strong>Заказ № {orderNumber(order)}</strong> от {formatDate(order.createdAt)}
                </p>
                <ul>
                  {order.items.map(item => (
                    <li key={item.id}>
                      {item.title} × {item.qty} = {formatPrice(item.price * item.qty)}
                    </li>
                  ))}
                </ul>
                <p className="order-total">
                  Итого: {formatPrice(order.total)} ·{' '}
                  {order.delivery === 'courier' ? `доставка: ${order.address}` : 'самовывоз'}
                </p>
              </li>
            ))}
          </ul>
          <button className="btn-link" onClick={handleClear}>
            Очистить историю
          </button>
        </>
      )}
    </section>
  );
}

export default OrderHistory;
