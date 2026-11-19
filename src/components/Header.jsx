function Header({ totalCount }) {
  return (
    <header className="header">
      <div className="container header-in">
        <h1 className="logo">Универмаг</h1>
        <a className="header-cart" href="#cart">Корзина: {totalCount}</a>
      </div>
    </header>
  );
}

export default Header;
