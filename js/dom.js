// GLOBAL SCOPE - Global scope pollution
shoutOutMsg();

// Vẫn có thể gọi được fn shoutOutMsg, vì nó đc khai báo ở scope global
// Ta nên hạn chế tối đa, hết mức có thể việc khai báo biến và hàm ở scope global

// DOM fn

let el = document.getElementById("title");
console.log(el);
console.log(`inner HTML: ${el.innerHTML}`);
console.log(`inner Text: ${el.innerText}`);

// Change attribute/text
function changeText() {
  let el = document.querySelector("#title");
  let span = el.childNodes[1];
  console.log(span);
  span.innerText = "JS";
  span.setAttribute("title", "Hover this text and this will pop up");
  span.setAttribute("data-price", "39000");

  let btn = document.getElementById("add-button");
  btn.classList.add("btn");
  btn.classList.add("btn-primary");
}
