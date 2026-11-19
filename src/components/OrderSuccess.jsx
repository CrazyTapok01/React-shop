import { formatPrice, orderNumber } from '../utils.js';

function OrderSuccess({ order, onClose }) {
  const count = order.items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="success">
      <p className="success-title">Спасибо, {order.customer.name}!</p>
      <p>
        Заказ № {orderNumber(order)} оформлен: {count} шт. на сумму {formatPrice(order.total)}.
      </p>
      <p>
        {order.delivery === 'courier'
          ? 'Курьер свяжется с вами по телефону.'
          : 'Заказ можно забрать в пункте выдачи.'}
      </p>
      <button className="btn btn-primary btn-block" onClick={onClose}>
        Продолжить покупки
      </button>
    </div>
  );
}

export default OrderSuccess;
