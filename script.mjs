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

  select.addEventListener("change", function () {
    const userId = select.value;
    const agenda = document.getElementById("agenda");
    agenda.textContent = `No topics yet for user ${userId}`;
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

    const revisionDates = getRevisionDates(date);

    const items = revisionDates.map(function (revDate) {
      return { topic, date: revDate };
    });

    addData(userId, items);
    console.log("Saved!", getData(userId));
  });
});
