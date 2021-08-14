const products = [
  {
    id: 1,
    name: "Биг Тейсти",
    price: 6,
    currency: "euro",
    ingredients: ["flour", "beef", "salad", "cheese", "sauce"],
    type: "burger",
    available: true,
  },
  {
    id: 2,
    name: "Тройной чизбургер",
    price: 2.3,
    currency: "usd",
    ingredients: ["flour", "beef", "cheese", "sauce", "cucumber"],
    type: "burger",
    available: true,
  },
  {
    id: 3,
    name: "Чизбургер",
    price: 1,
    currency: "euro",
    ingredients: ["flour", "beef", "cheese", "sauce", "cucumber"],
    type: "burger",
    available: true,
  },
  {
    id: 4,
    name: "Картофель фри",
    price: 2,
    currency: "usd",
    ingredients: ["potato"],
    type: "snack",
    available: true,
  },
  {
    id: 5,
    name: "Картофель по-деревенски",
    price: 2,
    currency: "usd",
    ingredients: ["potato"],
    type: "snack",
    available: false,
  },
  {
    id: 6,
    name: "Чикен МакНаггетс™",
    price: 5,
    currency: "euro",
    ingredients: ["chicken"],
    type: "chicken",
    available: true,
  },
  {
    id: 7,
    name: "Стрипсы",
    price: 2.6,
    currency: "euro",
    ingredients: ["chicken"],
    type: "chicken",
    available: false,
  },
  {
    id: 8,
    name: "МакЧикен",
    price: 4.3,
    currency: "euro",
    ingredients: ["chicken", "flour", "cheese", "sauce"],
    type: "burger",
    available: false,
  },
];
//1. Собрать в массив ингредиентов (без повторения).
//first way with flat()
const uniqIngredients1 = [
  ...new Set(products.map((product) => product.ingredients).flat()),
];
//second way reduce and new Set
//prettier-ignore

const uniqIngredients2 = products.reduce((acc, { ingredients }) => [...new Set([...acc, ...ingredients])],[]);

//third way reduce/filter
//prettier-ignore
const uniqIngredients3 = products.reduce((acc, { ingredients }) => {
  return [...acc, ...ingredients].filter((element, i, self) => self.indexOf(element) === i);
}, []);

//2. Создать функцию, которая принимает массив продуктов и id, и возвращает продукт с таким же id.
const filterByIdFunction = (enterArray, id) =>
  enterArray.filter((element) => element.id === id);

//3. Создать массив с отсортированными продуктами по цене.
const coastPrice = products
  .map((product) => product.price)
  .sort((a, b) => a - b);
