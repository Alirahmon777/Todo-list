"use strict";

const elForm = document.querySelector("#form");
const userlist = document.querySelector(".plan-list");
const elInput = document.querySelector(".plan__input");
const successBtn = document.querySelector("#add-btn");
const deleteBtn = document.querySelector("#delete-btn");
const submitBtn = document.querySelector(".plan__btn");

const array = [
  {
    title: "Kitob O'qish",
    completed: false,
    date: "2023.12.12 23:59:59",
  },
];

function renderPlan(plan) {
  userlist.innerHTML = "";
  for (let i = 0; i < plan.length; i++) {
    const newItem = document.createElement("li");
    newItem.className = "plan-list__item";
    newItem.innerHTML = `<div class="plan-list__block">
    <h3 class="plan-list__text" style='${
      plan[i].completed ? "text-decoration:line-through" : ""
    }'>${plan[i].title}</h3>
    <p class="plan-list__subtext">
      ${plan[i].date} <i class='${
      plan[i].completed ? "bx bx-calendar-check" : "bx bx-calendar-plus"
    }'></i>
    </p>
  </div>
  <div class="plan-list__box">
    <button class="plan-list__btn">Bajarildi</button>
    <button class="plan-list__btn">O'chirish</button>
  </div>`;
    userlist.appendChild(newItem);
  }
}
renderPlan(array);

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newList = {
    title: elInput.value,
    completed: false,
    date: getUserTime(new Date()),
  };

  array.push(newList);
  renderPlan(array);
  elForm.reset();
});

submitBtn.addEventListener("click", () => {
  elInput.placeholder = "bugungi rejangiz";
  elInput.classList = "plan__input";
  if (elInput.value == "") {
    elInput.placeholder = "iltimos rejangizni kiriting";
    elInput.classList += " red";
  }
  elInput.addEventListener("input", () => {
    if (elInput.value != "") {
      elInput.placeholder = "bugungi rejangiz";
      elInput.classList = "plan__input";
    }
  });
});

function addZero(z) {
  return z < 10 ? "0" + z : z;
}

function getUserTime(time = new Date()) {
  let Y = time.getFullYear();
  let M = addZero(time.getMonth() + 1);
  let D = addZero(time.getDate());
  let h = addZero(time.getHours());
  let m = addZero(time.getMinutes());
  let s = addZero(time.getSeconds());

  console.log(Y, M, D, h, m, s);
  return `${Y}.${M}.${D} ${h}:${m}:${s}`;
}
