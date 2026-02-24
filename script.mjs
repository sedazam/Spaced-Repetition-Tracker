// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getRevisionDates } from "./common.mjs";
import { getData, addData } from "./storage.mjs";

document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("user-select");

  for (const id of getUserIds()) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    select.appendChild(option);
  }

  function renderAgenda(userId) {
    const agenda = document.getElementById("agenda");
    const data = getData(userId) || [];
    agenda.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    const futureItems = data
      .filter(function (item) {
        return item.date >= today;
      })
      .sort(function (a, b) {
        return a.date.localeCompare(b.date);
      });

    if (futureItems.length === 0) {
      agenda.textContent = "No upcoming topics for user " + userId;
      return;
    }

    const list = document.createElement("ul");
    for (const item of futureItems) {
      const listItem = document.createElement("li");
      const [year, month, day] = item.date.split("-").map(Number);
      const displayDate = new Date(year, month - 1, day).toLocaleDateString(
        "en-GB",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      );
      listItem.textContent = `${item.topic} - ${displayDate}`;
      list.appendChild(listItem);
    }
    agenda.appendChild(list);
  }

  select.addEventListener("change", function () {
    const userId = select.value;
    renderAgenda(userId);
  });

  const dateInput = document.getElementById("date-input");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  dateInput.value = `${year}-${month}-${day}`;

  const form = document.getElementById("add-topic-form");
  const topicInput = document.getElementById("topic-name");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const topic = topicInput.value;
    const date = dateInput.value;
    const userId = select.value;

    if (!userId) {
      alert("Please select a user first!.");
      return;
    }
    if (!topic) {
      alert("Please enter a topic name.");
      return;
    }
    const revisionDates = getRevisionDates(date);

    const items = revisionDates.map(function (revDate) {
      return { topic, date: revDate };
    });

    addData(userId, items);
    topicInput.value = "";
    renderAgenda(userId);
  });
});
