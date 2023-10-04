const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

// Exercise 1
names.forEach((name) => {
  console.log(name);
});

// Exercise 2
names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

// Exercise 3
const uppercaseProvinces = provinces.map((province) => province.toUpperCase());
console.log(uppercaseProvinces);

// Exercise 4
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

// Exercise 5
const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

// Exercise 6
const filteredProvinces = provinces.filter((province) => !province.includes('Cape'));
console.log(filteredProvinces.length);

// Exercise 7
const hasSCharacter = names.map((name) => name.includes('S'));
console.log(hasSCharacter);

// Exercise 8
const provinceObject = names.reduce((obj, name, index) => {
  obj[name] = provinces[index];
  return obj;
}, {});
console.log(provinceObject);

// Additional exercises 

const products = [
  { product: 'banana', price: "2" },
  { product: 'mango', price: 6 },
  { product: 'potato', price: ' ' },
  { product: 'avocado', price: "8" },
  { product: 'coffee', price: 10 },
  { product: 'tea', price: '' },
];

// Exercise 1
products.forEach((product) => {
  console.log(product.product);
});

// Exercise 2
const filteredProducts = products.filter((product) => product.product.length <= 5);
console.log(filteredProducts);

// Exercise 3
const totalPrice = products
  .filter((product) => product.price !== '' && !isNaN(product.price))
  .map((product) => parseFloat(product.price))
  .reduce((total, price) => total + price, 0);
console.log(totalPrice);

// Exercise 4
const concatenatedNames = products.reduce((result, product) => {
  if (result === '') {
    return product.product;
  }
  return `${result}, ${product.product}`;
}, '');
console.log(concatenatedNames);

// Exercise 5
const priceStats = products.reduce(
  (stats, product) => {
    if (product.price !== '' && !isNaN(product.price)) {
      const price = parseFloat(product.price);
      if (price > stats.highestPrice) {
        stats.highestPrice = price;
        stats.highestName = product.product;
      }
      if (price < stats.lowestPrice) {
        stats.lowestPrice = price;
        stats.lowestName = product.product;
      }
    }
    return stats;
  },
  { highestPrice: -Infinity, highestName: '', lowestPrice: Infinity, lowestName: '' }
);
console.log(`Highest: ${priceStats.highestName}. Lowest: ${priceStats.lowestName}`);

// Exercise 6
const updatedProducts = Object.entries(products).reduce((newArray, [index, entry]) => {
  const updatedEntry = { name: entry.product, cost: entry.price };
  newArray[index] = updatedEntry;
  return newArray;
}, []);
console.log(updatedProducts);
