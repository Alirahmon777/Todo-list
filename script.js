"use strict";

const elForm = document.querySelector("#form");
const userlist = document.querySelector(".plan-list");
const elInput = document.querySelector(".plan__input");
const submitBtn = document.querySelector(".plan__btn");
const elDate = document.querySelector(".plan__date");
let array = [
  {
    id: 0,
    title: "Kitob O'qish",
    completed: false,
    date: "2023.12.12 23:59:59",
  },
];

function addZero(z) {
  return z < 10 ? "0" + z : z;
}

function getUserTime(time) {
  const date = new Date(time);
  let Y = date.getFullYear();
  let M = addZero(date.getMonth() + 1);
  let D = addZero(date.getDate());
  let h = addZero(date.getHours());
  let m = addZero(date.getMinutes());
  let s = addZero(date.getSeconds());

  return `${Y}.${M}.${D} ${h}:${m}:${s}`;
}

function renderPlan(plan) {
  userlist.innerHTML = "";
  for (let i = 0; i < plan.length; i++) {
    const newItem = document.createElement("li");
    const resultDate = getUserTime(plan[i].date);

    newItem.className = "plan-list__item";

    newItem.innerHTML = `
      <div class="plan-list__block">
        <h3 class="plan-list__text" style='${
          plan[i].completed ? "text-decoration:line-through" : ""
        }'>${plan[i].title}</h3>
        <p class="plan-list__subtext">
           ${resultDate} <i class='${
      plan[i].completed ? "bx bx-calendar-check" : "bx bx-calendar-plus"
    }'></i>
        </p>
  </div>
  <div class="plan-list__box">
    <button data-id="${
      plan[i].id
    }" class="complete-btn plan-list__btn">Bajarildi</button>
    <button data-id="${
      plan[i].id
    }" class="edit-btn save-btn plan-list__btn">Edit</button>
    <button data-id="${
      plan[i].id
    }" class="delete-btn plan-list__btn">O'chirish</button>
  </div>`;
    userlist.appendChild(newItem);
  }
}
renderPlan(array);

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newList = {
    id: array.length > 0 ? array[array.length - 1].id + 1 : 0,
    title: elInput.value,
    completed: false,
    date: elDate.value,
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

userlist.addEventListener("click", (event) => {
  const btn = event.target;
  if (btn.className.includes("complete-btn")) {
    const id = +btn.dataset.id;

    for (let i = 0; i < array.length; i++) {
      const arr = array[i];
      if (arr.id === id) {
        arr.completed = !arr.completed;
      }
    }

    renderPlan(array);
  }

  if (btn.className.includes("delete-btn")) {
    const id = +btn.dataset.id;
    const result = [];
    for (let i = 0; i < array.length; i++) {
      const arr = array[i];
      if (arr.id !== id) {
        result.push(arr);
      }
    }
    array = result;
    renderPlan(result);
  }

  if (btn.className.includes("edit-btn")) {
    const id = +btn.dataset.id;
    for (let i = 0; i < array.length; i++) {
      const arr = array[i];
      if (arr.id === id) {
        array[i].title = elInput.value;
        array[i].date = elDate.value;
      }
    }
    if (elInput.value == "") {
      elInput.placeholder = "iltimos tahrir kiriting";
      elInput.classList += " red";
    }
    elInput.addEventListener("input", () => {
      if (elInput.value == "") {
        elInput.placeholder = "bugungi rejangiz";
        elInput.classList = "plan__input";
      }
    });
    renderPlan(array);
  }
  elForm.reset();
});
