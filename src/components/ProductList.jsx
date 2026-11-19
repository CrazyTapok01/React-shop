import ProductCard from './ProductCard.jsx';

function ProductList({ products, cart, onAdd }) {
  if (products.length === 0) {
    return <p className="empty">Ничего не найдено</p>;
  }

  return (
    <div className="grid">
      {products.map(product => {
        const inCart = cart.find(item => item.id === product.id);
        return (
          <ProductCard
            key={product.id}
            product={product}
            qtyInCart={inCart ? inCart.qty : 0}
            onAdd={onAdd}
          />
        );
      })}
    </div>
  );
}

export default ProductList;
