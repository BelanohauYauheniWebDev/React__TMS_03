const userSettings = [
  {
    id: 1,
    ingredient: "flour",
    active: true,
  },
  {
    id: 2,
    ingredient: "beef",
    active: false,
  },
  {
    id: 3,
    ingredient: "cheese",
    active: true,
  },
  {
    id: 4,
    ingredient: "sauce",
    active: true,
  },
  {
    id: 5,
    ingredient: "cucumber",
    active: true,
  },
  {
    id: 6,
    ingredient: "chicken",
    active: false,
  },
  {
    id: 7,
    ingredient: "potato",
    active: true,
  },
  {
    id: 8,
    ingredient: "salad",
    active: true,
  },
];

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
const getProductsById1 = [
  ...new Set(products.map((product) => product.ingredients).flat()),
];

//second way reduce and new Set
//prettier-ignore
const getProductsById2 = products.reduce((acc, { ingredients }) => [...new Set([...acc, ...ingredients])],[]);

//third way reduce/filter
//prettier-ignore
const getProductsById3 = products.reduce((acc, { ingredients }) => {
  return [...acc, ...ingredients].filter((element, i, self) => self.indexOf(element) === i);
}, []);

//2. Создать функцию, которая принимает массив продуктов и id, и возвращает продукт с таким же id.
const filterByIdFunction = (enterArray, id) =>
  enterArray.filter((element) => element.id === id);

//3. Создать массив с отсортированными продуктами по цене.
const coastPrice = products
  .map((product) => product.price)
  .sort((a, b) => a - b);

//4. Сгруппировать продукты по типам. Создать объект, где ключ это тип, а значение - массив с продуктами.
const groupProductsByType = products.reduce((acc, product) => {
  const { type } = product;
  return { ...acc, [type]: [...(acc[type] || []), product] };
}, {});

//5. Создать массив с продуктами, которые доступны.
//prettier-ignore
const filterByAvailable = products.filter(({available})=>available)

//6. Создать функцию, которая принимает массив продуктов и строку = название ингредиента, и возвращает массив с продуктами, где содержится такой ингредиент.
//prettier-ignore
const findProductByIngredient = (enterArray, substring) => products.filter((product) => product.ingredients.includes(substring));

//7. Создать функцию, которая принимает массив продуктов и массив ингредиентов, и возвращает массив с продуктами, где содержатся такие ингредиенты.
const findProductByIngredients = (enterArray, enterIngredients) => {
  return enterArray.reduce((acc, product) => {
    const { ingredients } = product;
    return ingredients.some((el) => enterIngredients.indexOf(el) >= 0)
      ? [...acc, product]
      : [...acc];
  }, []);
};

//8. Создать функцию, которая принимает массив продуктов и цену, и возвращает массив продуктов, где цена продукта ниже или равна цене из второго аргумента функции.
const filterProductsByPrice = (enterArray, price) => {
  return enterArray.filter((product) => product.price <= price);
};

//9. Создать функцию, которая принимает массив продуктов и массив айдишников, и возвращает строку, где строка включает в себя название продуктов и их цену через запятую, у которых айдишники совпадают.
const stringFromProducts = (enterArray, enterId) => {
  return enterArray.reduce((acc, product) => {
    const { id, name, price, currency } = product;
    return enterId.includes(id)
      ? (acc = acc + `${name}:${price} ${currency}, `)
      : acc;
  }, "");
};

//10. Создать функцию, которая принимает массив продуктов и массив айдишников, и возвращает объект, c общими суммами цен продуктов(у которых айдишники совпадают) по каждой валюте.
const objectFromProductsByCurrency = (enterArray, enterId) => {
  return enterArray.reduce(
    (acc, product) => {
      const { id, price, currency } = product;
      if (enterId.includes(id)) {
        currency === "usd"
          ? (acc = { ...acc, usd: acc.usd + price })
          : (acc = { ...acc, euro: acc.euro + price });
      }
      return acc;
    },
    { euro: 0, usd: 0 }
  );
};

//11. Создать функцию, которая принимает массив продуктов и массив айдишников, и return строку, где число равно сумме цен продуктов + значок валюты. При этом если, у нас попадают продукты с разными валютами, то мы должны получить сумму в евро и перевести доллары в евро(использовать для этого курс евро/доллар).
const getSumOfAllProductsById = (enterArray, enterId) => {
  const summa = enterArray.reduce(
    (acc = { currency, total }, product) => {
      const { id, price, currency } = product;
      if (enterId.includes(id)) {
        acc.currency !== currency ? (acc.currency = "euro") : null;
        return currency === acc.currency
          ? (acc = { ...acc, total: acc.total + price })
          : (acc = { ...acc, total: acc.total + price * 0.85 });
      }
      // return acc;
    },
    {
      total: 0,
      currency: "usd",
    }
  );
  return `${summa.total} ${summa.currency}`;
};

//!part2
//1. Создать массив объектов вида { categoryName: 'burger', products: [...]}. 'burger' - это наше поле type
const getObgectFromProducts = products.reduce((acc, product) => {
  const { type } = product;
  const obj = {
    categoryName: type,
    products: [product],
  };
  acc = [...acc, obj].reduce((result, item) => {
    const index = result.findIndex(
      (resultItem) => resultItem.categoryName === item.categoryName
    );
    if (index === -1) {
      result = [...result, item];
    } else {
      product.type === result[index].categoryName
        ? (item.products = [...item.products, product])
        : null;
    }
    return result;
  }, acc);
  return acc;
}, []);

const filterBuUserPreferences = (products, userSettings) => {
  const userPreferences = userSettings.reduce((acc, { ingredient, active }) => {
    !active ? (acc = [...acc, ingredient]) : null;
    return acc;
  }, []);
  return products.reduce((acc, product) => {
    const { ingredients } = product;
    !ingredients.some((el) => userPreferences.includes(el))
      ? (acc = [...(acc || []), product])
      : null;
    return acc;
  }, []);
};

console.log(filterBuUserPreferences(products, userSettings));
