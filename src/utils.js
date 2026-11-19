export function formatPrice(value) {
  return `${value.toLocaleString('ru-RU')} ₽`;
}

export function validateOrder(form) {
  const errors = {};

  if (form.name.trim().length < 2) {
    errors.name = 'Введите имя: не менее 2 символов';
  }

  const phone = form.phone.trim();
  const digits = phone.replace(/\D/g, '');
  if (!/^\+?[\d\s()-]+$/.test(phone) || digits.length < 10) {
    errors.phone = 'Введите телефон: не менее 10 цифр';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Введите корректный email';
  }

  if (form.delivery === 'courier' && form.address.trim().length < 5) {
    errors.address = 'Введите адрес доставки: не менее 5 символов';
  }

  return errors;
}

export function orderNumber(order) {
  return String(order.id).slice(-6);
}

export function formatDate(iso) {
  return new Date(iso).toLocaleString('ru-RU');
}
