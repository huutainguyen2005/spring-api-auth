/* BASIC JavaScript */
console.log("Testing");
// alert("This won't harm you very much");

/* Fn DECLARATION */
// You can declare a function before or after, as long as it is in the scope
printMsg(789);
function printMsg(msg) {
  console.log(msg + "!!!");
}

printMsg("Hi everybody");

printMsg(addNum(5, 10));

function addNum(x, y) {
  return x + y;
}

printMsg(addNum(10, 15));

// Since this is declared after, this must be call after the declaration
// var nine = squareNum(3);
// printMsg(nine);

// Another way to declare a function
var squareNum = function (x) {
  return x * x;
};

var sixteen = squareNum(4);
printMsg(sixteen);

// hoisting: function declarations are hoisted, but function expressions are not

/* var, let, const */
sixteen = 60;
printMsg(sixteen);
sixteen = "This variable can be reassigned (16 as a string)";
printMsg(sixteen);
sixteen = true;

// String interpolation
printMsg(`Its value is ${sixteen}`);

let nine = squareNum(3);
printMsg(nine);
nine = 9 + " this is a string";
printMsg(nine);

const tf = squareNum(5);
printMsg(tf);
// tf = 100; // This will cause an error because tf is a constant
// printMsg(tf);

/* HOISTING */
// console.log(a);
// var a = 10;
// console.log(a);

// equivalent to
// var a; // declaration is hoisted to the top
// console.log(a); // undefined, because a is declared but not assigned a value yet
// var a = 10;
// console.log(a);

// Does hoisting apply to let and const?
// console.log(b); // ReferenceError: Cannot access 'b' before initialization
// let b = 20;
// console.log(b);
// This will cause an error because let and const are not hoisted in the same way as var.
// The variable b is in a "temporal dead zone" until it is declared and initialized.
// Khi dùng let và const, buộc phải gán giá trị ngay khi sử dụng.
// Do cơ chế hoisting của JS chỉ áp dụng cho var
// **Như vậy, để chặt chẻ thì nên dùng jet thay vi var**
// Ví nếu biến chưa có giá trị, sẽ thấy lỗi sớm

// Let's try another way to declare a function
let shoutOutMsg = (flag) => {
  if (!!flag) {
    console.log("Yayyyyyyyyy!");
  } else {
    console.log("Ahhhhhhhhhhhhh!");
  }
};

shoutOutMsg();
shoutOutMsg(true);
shoutOutMsg(1);
shoutOutMsg("true");

let printHelloDay = (day = "Saturday") => {
  if (day === "Saturday") {
    console.log("Hoooorayy!");
  } else {
    console.log(`Oh no, it's ${day}`);
  }
};

printHelloDay();
printHelloDay("Monday");

function printHelloDayLegacy(day = "Saturday") {
  if (day === "Saturday") {
    console.log("[Legacy] Hoooorayy!");
  } else {
    console.log(`[Legacy] Oh no, it's ${day}`);
  }
}
printHelloDayLegacy();
printHelloDayLegacy("Monday");

/* Data types */
let n = 5;
let m = new Number(79);
let name = "Jon";
let email = new String("jon@snow.got");
let isActive = true;
let isAdmin = new Boolean(false);
let abc; // Cái này chưa gán giá trị
let nullValue = null; // Cái này cũng là chưa gán giá trị, nhung ông dev cố ý để null
// ổng nói có giá trị (object), nhưng tạm thời null

// typeof operator and instanceof operator
console.log(
  `n: value=${n}, typeof=${typeof n},
   instanceof Number=${n instanceof Number}`,
);
console.log(
  `m: value=${m}, typeof=${typeof m},
   instanceof Number=${m instanceof Number}`,
);

console.log(
  `name: value=${name}, typeof=${typeof name},
   instanceof String=${name instanceof String}`,
);
console.log(
  `email: value=${email}, typeof=${typeof email},
   instanceof String=${email instanceof String}`,
);

console.log(
  `isAdmin: value=${isAdmin}, typeof=${typeof isAdmin},
   instanceof Boolean=${isAdmin instanceof Boolean}`,
);
console.log(
  `isActive: value=${isActive}, typeof=${typeof isActive},
   instanceof Boolean=${isActive instanceof Boolean}`,
);

console.log(
  `abc: value=${abc}, typeof=${typeof abc},
   instanceof Object=${abc instanceof Object}`,
);

console.log(
  `nullValue: value=${nullValue}, typeof=${typeof nullValue},
   instanceof Object=${nullValue instanceof Object}`,
);

console.log(typeof null); // "object" - this is a known quirk in JavaScript
console.log(null instanceof Object); // false - null is not an instance of Object
console.log(typeof undefined); // "undefined"
console.log(undefined instanceof Object); // false - undefined is not an instance of Object
console.log(typeof NaN); // "number" - NaN is considered a number in JavaScript
console.log(NaN instanceof Number); // false - NaN is not an instance of Number
console.log(typeof Infinity); // "number" - Infinity is considered a number in JavaScript
console.log(Infinity instanceof Number); // false - Infinity is not an instance of Number
console.log(typeof -Infinity); // "number" - -Infinity is considered a number in JavaScript
console.log((-Infinity) instanceof Number); // false - -Infinity is not an instance of Number
console.log(typeof Symbol("sym")); // "symbol" - Symbols are a unique and immutable primitive value
console.log(Symbol("sym") instanceof Symbol); // false - Symbols are not instances of the Symbol constructor
console.log(typeof BigInt(123)); // "bigint" - BigInt is a primitive type for arbitrary-precision integers
console.log(BigInt(123) instanceof BigInt); // false - BigInt values are not instances of the BigInt constructor
console.log(typeof function () {}); // "function" - functions are a special type of object in JavaScript
console.log(function () {} instanceof Function);
console.log(function () {} instanceof Object); // true - functions are also objects in JavaScript
console.log(typeof {}); // "object" - plain objects are of type "object"
console.log({} instanceof Object);
console.log(typeof []); // "object" - arrays are also of type "object"
console.log([] instanceof Array);
console.log([] instanceof Object); // true - arrays are also objects in JavaScript

// object & array
let emptyEmployee = {};
console.log(emptyEmployee);
let employee = {
  id: 1,
  name: "Alice",
  tel: null,
  address: [],
};

// Access properties with . (dot) operator
console.log("Employee details:");
console.log(employee.id);
console.log(employee.tel);
console.log(employee.address);
console.log(employee.email);

// Assign new property to the obj
employee.email = "the_hound@got.com";
console.log(employee.email);
console.log(employee);

// Some useful array fn
// push() - add an element to the end of the array
employee.address.push(1);
employee.address.push("Le Loi Street");
employee.address.push("MT city");
employee.address.push("TGG");
console.log(employee.address);

// pop() - remove an element from the end of the array
employee.address.pop();
console.log(employee.address);

// join().
console.log("Address of this employee:");
console.log(employee.address.join(" "));

// split
const splitStr = "This is a long string, it will soon be split".split(" ");
console.log(splitStr);

// indexOf
let anotherSplitStr = "This makes a good array from a string".split(" ");
console.log(
  "The word 'makes' is at the index: " + anotherSplitStr.indexOf("makes"),
);

console.log("The word 'a' is at the index: " + anotherSplitStr.indexOf("a"));

console.log(
  "The word 'jon' is at the index: " + anotherSplitStr.indexOf("jon"),
);

// reverse()
anotherSplitStr.reverse();
console.log("Reversed: " + anotherSplitStr.join("_"));

// ARRAY
const nums = [1, 2, 3, 6, 7, 8];
console.log(nums);
console.log(nums[0]);
console.log(nums[6]);

// Fn browse
// forEach()
nums.forEach((num) => {
  console.log(num);
});

// transform -> Từ mảng ban đầu, ta áp dụng 1 logic cụ thể
// vào từng phần tử, tạo ra mảng mới
const doubleNums = nums.map((n) => n * 2);
console.log(doubleNums);

// filter -> Từ mảng ban đầu, ta áp dụng 1 logic cụ thể
// vào từng phần tử, tạo ra mảng mới chỉ chứa các phần tử theo logic đó
const users = [
  { id: 1, name: "Alice", isActive: true },
  { id: 2, name: "Bob", isActive: false },
  { id: 3, name: "Charlie", isActive: true },
  { id: 4, name: "David", isActive: false },
  { id: 5, name: "Eve", isActive: true },
];

const disableUsers = users.filter((u) => !u.isActive);
console.log(disableUsers);
