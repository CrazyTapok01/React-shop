import { useState, useEffect } from 'react';
import { PRODUCTS, getProductById } from './data/products.js';
import { loadList, saveList } from './storage.js';
import Header from './components/Header.jsx';
import Filters from './components/Filters.jsx';
import ProductList from './components/ProductList.jsx';
import Cart from './components/Cart.jsx';
import CheckoutForm from './components/CheckoutForm.jsx';
import OrderSuccess from './components/OrderSuccess.jsx';
import OrderHistory from './components/OrderHistory.jsx';

const initialFilters = { search: '', category: 'all', sort: 'default', inStock: false };

const SORTERS = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'rating-desc': (a, b) => b.rating - a.rating,
  'title-asc': (a, b) => a.title.localeCompare(b.title),
};

function loadCart() {
  return loadList('shop-cart').filter(
    item => item && getProductById(item.id) && Number.isInteger(item.qty) && item.qty > 0
  );
}

function App() {
  const [filters, setFilters] = useState(initialFilters);
  const [cart, setCart] = useState(loadCart); // [{ id, qty }]
  const [cartView, setCartView] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [orders, setOrders] = useState(() => loadList('shop-orders'));
  const [toast, setToast] = useState(null); // { id, text } | null

  // сохранение в localStorage
  useEffect(() => {
    saveList('shop-cart', cart);
  }, [cart]);

  useEffect(() => {
    saveList('shop-orders', orders);
  }, [orders]);

  // вычисляемые значения
  const cartItems = cart.map(item => ({ ...getProductById(item.id), qty: item.qty }));
  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const query = filters.search.trim().toLowerCase();
  const filtered = PRODUCTS.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.inStock && product.stock === 0) return false;
    return product.title.toLowerCase().includes(query);
  });
  const sorter = SORTERS[filters.sort];
  const visibleProducts = sorter ? [...filtered].sort(sorter) : filtered;

  // заголовок вкладки
  useEffect(() => {
    document.title =
      totalCount > 0 ? `Корзина (${totalCount}) — Универмаг` : 'Универмаг';
  }, [totalCount]);

  // автоматическое скрытие уведомления
  useEffect(() => {
    if (!toast) return;
    const timerId = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timerId);
  }, [toast]);

  // обработчики
  function handleFilterChange(e) {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleAdd(product) {
    if (product.stock === 0) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (!existing) {
        return [...prev, { id: product.id, qty: 1 }];
      }
      if (existing.qty >= product.stock) {
        return prev;
      }
      return prev.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    });
    setToast({ id: Date.now(), text: `${product.title}: добавлено в корзину` });
    setCartView(view => (view === 'success' ? 'cart' : view));
  }

  function handleChangeQty(id, delta) {
    const product = getProductById(id);

    setCart(prev =>
      prev.map(item => {
        if (item.id !== id) return item;
        const qty = Math.min(product.stock, Math.max(1, item.qty + delta));
        return { ...item, qty };
      })
    );
  }

  function handleRemove(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  function handleOrderSubmit(form) {
    const newOrder = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
      },
      delivery: form.delivery,
      address: form.delivery === 'courier' ? form.address.trim() : '',
      items: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        qty: item.qty,
      })),
      total: totalPrice,
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setCartView('success');
  }

  function handleClearOrders() {
    setOrders([]);
    setCartView(view => (view === 'success' ? 'cart' : view));
  }

  return (
    <>
      <Header totalCount={totalCount} />
      <main className="container layout">
        <div>
          <section aria-label="Каталог">
            <Filters
              filters={filters}
              onChange={handleFilterChange}
              onReset={() => setFilters(initialFilters)}
            />
            <p className="found">Найдено товаров: {visibleProducts.length}</p>
            <ProductList products={visibleProducts} cart={cart} onAdd={handleAdd} />
          </section>
          <OrderHistory orders={orders} onClear={handleClearOrders} />
        </div>
        <aside className="cart" id="cart">
          <h2>Корзина ({totalCount})</h2>
          {cartView === 'cart' && (
            <Cart
              items={cartItems}
              totalPrice={totalPrice}
              onChangeQty={handleChangeQty}
              onRemove={handleRemove}
              onClear={() => setCart([])}
              onCheckout={() => setCartView('checkout')}
            />
          )}
          {cartView === 'checkout' && (
            <CheckoutForm
              totalPrice={totalPrice}
              onSubmit={handleOrderSubmit}
              onBack={() => setCartView('cart')}
            />
          )}
          {cartView === 'success' && (
            <OrderSuccess order={orders[0]} onClose={() => setCartView('cart')} />
          )}
        </aside>
      </main>
      {toast && (
        <div className="toast" role="status">
          {toast.text}
        </div>
      )}
    </>
  );
}

export default App;
