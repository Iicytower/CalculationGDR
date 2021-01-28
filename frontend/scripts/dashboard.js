"use strict";

const quotationList = document.querySelector("#quotationList");
const workspace = document.querySelector("#workspace");
const adress = "http://localhost:3000";

const fetchQuotationsList = async () => {
  try {
    const resQuotationsList = await fetch(
      `${adress}/authrequire/dowAllUserQuotations`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    const quotationsList = await resQuotationsList.json();
    return quotationsList.data;
  } catch (err) {
    console.error(err);
  }
};

const createQuotationsList = (quotationsList) => {
  const count = quotationsList.reduce((acc, cur) => {
    const { name, createdAt, updatedAt } = cur;

    const created = new Date(createdAt);
    const updated = new Date(updatedAt);

    const cre = `${created.getDate()}.${
      created.getMonth() + 1
    }.${created.getFullYear()}`;
    const upd = `${updated.getDate()}.${
      updated.getMonth() + 1
    }.${updated.getFullYear()}`;
    return (
      acc +
      `<li id="${name}">
        <div class="name"><h3>${name}</h3></div>
        <div class="dates">
         <div class="dateItem">last update: <br>${upd}</div>
         <div class="dateItem">created at: <br>${cre}</div>
        </div>
      </li>`
    );
  }, ``);
  //reduce end
  return `<ul>${count}</ul>`;
};

window.onload = async () => {
  quotationList.innerHTML = "<h2>Quotation list: </h2>";
  workspace.innerHTML = "<h1>workspace</h1>";

  try {
    const quotationsList = await fetchQuotationsList();

    const listComponent = createQuotationsList(quotationsList);
    quotationList.innerHTML += listComponent;
    console.log(localStorage);
  } catch (err) {
    console.error(err);
  }
};
