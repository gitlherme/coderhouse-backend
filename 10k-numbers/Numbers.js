const object = {};

for(let i = 0; i <= 10000; i++) {
  const number = Math.floor(Math.random() * 20 + 1);
  if (!object[number]) object[number] = 1
  object[number]++;
}

console.log(object);