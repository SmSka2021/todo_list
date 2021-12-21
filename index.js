"use strict";
//**дата на мобильнике */
let today = new Date();
let year = today.getFullYear();

const getDay = () => {
  let daysArr = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  return daysArr[today.getDay()];
};

document.querySelector(".myDay").innerHTML = getDay();
const getDat = () => {
  let montsArr = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];
  return montsArr[today.getMonth()];
};

document.querySelector(".myData").innerHTML =
  today.getDate() + " " + getDat() + " " + year + " " + "г.";

//* бегущее время на мобильнике**//
setInterval(myTimer, 1000);
function myTimer() {
  let today = new Date();
  let second = today.getSeconds();
  let minut = today.getMinutes();
  if (+second < 10) {
    second = "0" + second;
  }
  if (+minut < 10) {
    minut = "0" + minut;
  }

  document.getElementById("myTime").innerHTML =
    today.getHours() + ":" + minut + ":" + second;
}

//**календарик на мобильнике**/
const getmonth = () => {
  let monthArr = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return monthArr[today.getMonth()];
};
document.querySelector(".month").innerHTML =
  getmonth() + " " + year + " " + "г.";

//**Таблица-месяц**//
let month = today.getMonth() + 1;
function createCalendar(elem, year, month) {
  let mon = month - 1;
  let thisDate = new Date(year, mon);
  let table =
    "<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>";

  // пустые ячейки в первой строке с понедельника до первого дня месяца//
  for (let i = 0; i < getDa(thisDate); i++) {
    table += "<td></td>";
  }
  // заполняем <td> ячейки  датами//
  while (thisDate.getMonth()) {
    table += "<td>" + thisDate.getDate() + "</td>";

    if (getDa(thisDate) % 7 == 6) {
      // вс, последний день - делаем перевод строки//
      table += "</tr><tr>";
    }
    thisDate.setDate(thisDate.getDate() + 1);
  }
  // добавляем пустые ячейками, если нужно (после 30-31 числа)//
  if (getDa(thisDate) != 0) {
    for (let i = getDay(thisDate); i < 7; i++) {
      table += "<td></td>";
    }
  }

  // закрываем таблицу//
  table += "</tr></table>";
  elem.id = "tbl";
  elem.innerHTML = table;
}
function getDa(date) {
  // получаем номер дня недели, от 0 (пн) до 6 (вс)
  let day = date.getDay();
  if (day == 0) day = 7; // делаем воскресенье (0) последним днем
  return day - 1;
}
createCalendar(calendar, year, month);

// ***TODO list***/

let ul = document.querySelector("#list");
let input = document.getElementById("toDoInput");
let todoList;
function save() {
  todoList = ul.innerHTML;
  localStorage.setItem("ToDo", todoList);
}

input.addEventListener("keypress", validationPress);

function validationPress(event) {
  if (event.keyCode == 13) {
    if (input.value === "" || input.value === null) {
      alert("Введите данные");
    } else {
      createTodo();
    }
  }
}
function validation() {
  if (input.value === "" || input.value === null) {
    alert("Введите данные");
  } else {
    createTodo();
  }
}

function createTodo() {
  let li = document.createElement("li");
  let item = document.createTextNode(input.value);
  li.prepend(item);

  let deleteIcon = document.createElement("span");
  deleteIcon.className = "icon__delit";
  li.append(deleteIcon);
  ul.prepend(li);
  input.value = "";
  save();
}

ul.addEventListener(
  "click",
  function (event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");
      event.stopPropagation();
      save();
    } else if (event.target.tagName === "SPAN") {
      event.target.parentNode.remove();
      event.stopPropagation();
      save();
    }
  },
  false
);

if (localStorage.getItem("ToDo")) {
  list.innerHTML = localStorage.getItem("ToDo");
}
