import { useState } from 'react';
import { formatPrice, validateOrder } from '../utils.js';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  delivery: 'courier',
  address: '',
};

function Field({ label, error, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {error && <span className="field-error" role="alert">{error}</span>}
    </label>
  );
}

function CheckoutForm({ totalPrice, onSubmit, onBack }) {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});

  const errors = validateOrder(form);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      setTouched({ name: true, phone: true, email: true, address: true });
      return;
    }
    onSubmit(form);
  }

  function errorFor(field) {
    return touched[field] ? errors[field] : undefined;
  }

  return (
    <form className="checkout" onSubmit={handleSubmit} noValidate>
      <Field label="Имя" error={errorFor('name')}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="name"
        />
      </Field>
      <Field label="Телефон" error={errorFor('phone')}>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="+7 900 000-00-00"
          autoComplete="tel"
        />
      </Field>
      <Field label="Email" error={errorFor('email')}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="email"
        />
      </Field>
      <fieldset className="field">
        <legend className="field-label">Способ получения</legend>
        <label className="radio">
          <input
            type="radio"
            name="delivery"
            value="courier"
            checked={form.delivery === 'courier'}
            onChange={handleChange}
          />
          Курьер
        </label>
        <label className="radio">
          <input
            type="radio"
            name="delivery"
            value="pickup"
            checked={form.delivery === 'pickup'}
            onChange={handleChange}
          />
          Самовывоз
        </label>
      </fieldset>
      {form.delivery === 'courier' && (
        <Field label="Адрес доставки" error={errorFor('address')}>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="street-address"
          />
        </Field>
      )}
      <div className="cart-total">
        <span>К оплате:</span>
        <strong>{formatPrice(totalPrice)}</strong>
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Подтвердить заказ
      </button>
      <button type="button" className="btn-link" onClick={onBack}>
        Назад в корзину
      </button>
    </form>
  );
}

export default CheckoutForm;
