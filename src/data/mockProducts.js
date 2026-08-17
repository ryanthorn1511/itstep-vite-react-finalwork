export const INITIAL_PRODUCTS = [
  {
    id: "1",
    title: "Смартфон Apple iPhone 15 Pro 128GB Titanium",
    category: "Смартфони",
    price: 48999,
    oldPrice: 52999,
    rating: 4.9,
    reviewsCount: 42,
    inStock: true,
    stockCount: 15,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    description: "Флагманський смартфон з титановим корпусом, потужним чіпом A17 Pro, кнопкою дії та революційною системою камер 48 МП.",
    specs: {
      "Діагональ екрану": "6.1 дюйма",
      "Процесор": "Apple A17 Pro",
      "Оперативна пам'ять": "8 ГБ",
      "Вбудована пам'ять": "128 ГБ",
      "Камера": "48 МП + 12 МП + 12 МП",
      "Акумулятор": "3274 мАг"
    },
    isPopular: true,
    isNew: true
  },
  {
    id: "2",
    title: "Ноутбук Apple MacBook Air 13 M2 8GB/256GB Midnight",
    category: "Ноутбуки",
    price: 44999,
    oldPrice: 48999,
    rating: 4.8,
    reviewsCount: 38,
    inStock: true,
    stockCount: 8,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    description: "Ультратонкий та потужний ноутбук на базі чипа M2 з неймовірною автономністю до 18 годин та безшумним пасивним охолодженням.",
    specs: {
      "Діагональ екрану": "13.6 дюйма Liquid Retina",
      "Процесор": "Apple M2 (8 ядер)",
      "Оперативна пам'ять": "8 ГБ",
      "Накопичувач": "256 ГБ SSD",
      "Вага": "1.24 кг"
    },
    isPopular: true,
    isNew: false
  },
  {
    id: "3",
    title: "Бездротові навушники Sony WH-1000XM5 Black",
    category: "Аудіо",
    price: 14999,
    oldPrice: 16999,
    rating: 4.9,
    reviewsCount: 56,
    inStock: true,
    stockCount: 22,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "Преміальні повнорозмірні навушники з найкращим у галузі активним шумозаглушенням та кришталево чистим звуком.",
    specs: {
      "Тип навушників": "Повнорозмірні",
      "Тип підключення": "Бездротові (Bluetooth 5.2)",
      "Час роботи": "До 30 годин",
      "Шумозаглушення": "Активне (ANC)"
    },
    isPopular: true,
    isNew: true
  },
  {
    id: "4",
    title: "Смарт-годинник Samsung Galaxy Watch 6 Classic 47mm",
    category: "Смарт-годинники",
    price: 13499,
    oldPrice: 14999,
    rating: 4.7,
    reviewsCount: 19,
    inStock: true,
    stockCount: 12,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description: "Класичний дизайн з безелем, що обертається, розширений моніторинг здоров'я, ЕКГ та відстеження сну.",
    specs: {
      "Діагональ дисплея": "1.5 дюйма Super AMOLED",
      "Матеріал корпусу": "Нержавіюча сталь",
      "Водозахист": "5 ATM + IP68",
      "Бездротові інтерфейси": "Bluetooth, Wi-Fi, NFC, GPS"
    },
    isPopular: false,
    isNew: false
  },
  {
    id: "5",
    title: "Планшет Apple iPad Air 11 M2 128GB Space Gray",
    category: "Планшети",
    price: 29999,
    oldPrice: 32499,
    rating: 4.9,
    reviewsCount: 27,
    inStock: true,
    stockCount: 10,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    description: "Потужний планшет для творчості та навчання з підтримкою Apple Pencil Pro та клавіатури Magic Keyboard.",
    specs: {
      "Діагональ екрану": "11 дюймів",
      "Процесор": "Apple M2",
      "Оперативна пам'ять": "8 ГБ",
      "Вбудована пам'ять": "128 ГБ"
    },
    isPopular: true,
    isNew: true
  },
  {
    id: "6",
    title: "Ігрова консоль Sony PlayStation 5 Slim Digital Edition",
    category: "Ігрові консолі",
    price: 21999,
    oldPrice: 23999,
    rating: 4.9,
    reviewsCount: 64,
    inStock: true,
    stockCount: 6,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
    description: "Оновлена компактна версія революційної ігрової пристрої з швидкісним SSD на 1 ТБ та геймпадом DualSense.",
    specs: {
      "Об'єм пам'яті": "1 ТБ SSD",
      "Максимальна роздільна здатність": "4K Ultra HD",
      "Комплектація": "Геймпад DualSense, кабель HDMI"
    },
    isPopular: true,
    isNew: false
  },
  {
    id: "7",
    title: "Монітор LG UltraGear 27GP850-B Gaming",
    category: "Монітори",
    price: 14499,
    oldPrice: 15999,
    rating: 4.8,
    reviewsCount: 31,
    inStock: true,
    stockCount: 9,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    description: "27-дюймовий QHD IPS монітор з частотою оновлення 180 Гц та часом відгуку 1 мс (GtG) для плавного геймінгу.",
    specs: {
      "Діагональ": "27 дюймів",
      "Роздільна здатність": "2560x1440 QHD",
      "Частота оновлення": "180 Гц",
      "Матриця": "Nano IPS"
    },
    isPopular: false,
    isNew: false
  },
  {
    id: "8",
    title: "Портативна колонка JBL Charge 5 Black",
    category: "Аудіо",
    price: 6499,
    oldPrice: 7199,
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    stockCount: 25,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    description: "Потужна акустика з насиченим басом, захистом від води та пилу IP67 та функцією пауербанку.",
    specs: {
      "Вихідна потужність": "40 Вт",
      "Час автономної роботи": "До 20 годин",
      "Захист від води": "IP67"
    },
    isPopular: true,
    isNew: false
  }
];

export const PRODUCT_CATEGORIES = [
  "Усі категорії",
  "Смартфони",
  "Ноутбуки",
  "Аудіо",
  "Смарт-годинники",
  "Планшети",
  "Ігрові консолі",
  "Монітори"
];
