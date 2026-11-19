export const CATEGORIES = ['Электроника', 'Дом', 'Спорт', 'Книги', 'Игры'];

export const PRODUCTS = [
  { id: 1, title: 'Беспроводные наушники', category: 'Электроника', price: 4990, rating: 4.6, stock: 12, emoji: '🎧' },
  { id: 2, title: 'Смартфон Nova X', category: 'Электроника', price: 29990, rating: 4.4, stock: 5, emoji: '📱' },
  { id: 3, title: 'Ноутбук Slim 14', category: 'Электроника', price: 64990, rating: 4.7, stock: 3, emoji: '💻' },
  { id: 4, title: 'Умные часы', category: 'Электроника', price: 8990, rating: 4.2, stock: 0, emoji: '⌚' },
  { id: 5, title: 'Фотокамера', category: 'Электроника', price: 35990, rating: 4.5, stock: 4, emoji: '📷' },
  { id: 6, title: 'Игровая мышь', category: 'Электроника', price: 2490, rating: 4.3, stock: 20, emoji: '🖱️' },
  { id: 7, title: 'Настольная лампа', category: 'Дом', price: 1590, rating: 4.1, stock: 15, emoji: '💡' },
  { id: 8, title: 'Кофеварка', category: 'Дом', price: 7490, rating: 4.6, stock: 6, emoji: '☕' },
  { id: 9, title: 'Ортопедическая подушка', category: 'Дом', price: 1290, rating: 4.0, stock: 25, emoji: '🛏️' },
  { id: 10, title: 'Комнатное растение', category: 'Дом', price: 890, rating: 4.8, stock: 30, emoji: '🪴' },
  { id: 11, title: 'Гантели 2 × 5 кг', category: 'Спорт', price: 2990, rating: 4.5, stock: 9, emoji: '🏋️' },
  { id: 12, title: 'Велосипед горный', category: 'Спорт', price: 24990, rating: 4.7, stock: 2, emoji: '🚲' },
  { id: 13, title: 'Футбольный мяч', category: 'Спорт', price: 1490, rating: 4.4, stock: 18, emoji: '⚽' },
  { id: 14, title: 'Туристический рюкзак', category: 'Спорт', price: 4590, rating: 4.3, stock: 7, emoji: '🎒' },
  { id: 15, title: 'Учебник по JavaScript', category: 'Книги', price: 1190, rating: 4.9, stock: 14, emoji: '📘' },
  { id: 16, title: 'Справочник по React', category: 'Книги', price: 1390, rating: 4.8, stock: 10, emoji: '📗' },
  { id: 17, title: 'Python для начинающих', category: 'Книги', price: 990, rating: 4.6, stock: 0, emoji: '📙' },
  { id: 18, title: 'Шахматы', category: 'Игры', price: 1890, rating: 4.5, stock: 8, emoji: '♟️' },
  { id: 19, title: 'Настольная игра «Остров»', category: 'Игры', price: 2190, rating: 4.4, stock: 11, emoji: '🎲' },
  { id: 20, title: 'Пазл 1000 деталей', category: 'Игры', price: 1190, rating: 4.2, stock: 16, emoji: '🧩' },
];

export function getProductById(id) {
  return PRODUCTS.find(product => product.id === id);
}
