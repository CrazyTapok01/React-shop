import { CATEGORIES } from '../data/products.js';

function Filters({ filters, onChange, onReset }) {
  return (
    <div className="filters">
      <input
        type="search"
        name="search"
        value={filters.search}
        onChange={onChange}
        placeholder="Поиск по названию"
        aria-label="Поиск по названию"
      />
      <select
        name="category"
        value={filters.category}
        onChange={onChange}
        aria-label="Категория"
      >
        <option value="all">Все категории</option>
        {CATEGORIES.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select name="sort" value={filters.sort} onChange={onChange} aria-label="Сортировка">
        <option value="default">Без сортировки</option>
        <option value="price-asc">Цена: по возрастанию</option>
        <option value="price-desc">Цена: по убыванию</option>
        <option value="rating-desc">Сначала с высоким рейтингом</option>
        <option value="title-asc">Название: А–Я</option>
      </select>
      <label className="filters-check">
        <input
          type="checkbox"
          name="inStock"
          checked={filters.inStock}
          onChange={onChange}
        />
        Только в наличии
      </label>
      <button className="btn" onClick={onReset}>Сбросить</button>
    </div>
  );
}

export default Filters;
