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

const fetchOneQuotation = async (name) => {
  try {
    const resQuotation = await fetch(
      `${adress}/authrequire/dowOneUserQuotation/${name}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    const quotation = await resQuotation.json();
    return quotation.data;
  } catch (err) {
    console.error(err);
  }
};

const createQuotationsList = (quotationsList) => {
  if(quotationsList.length === 0) return `You don't have any quotation yet.`;

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
      `<li id="${name}" class="quotationItem">
        <div class="name"><h3>${name}</h3></div>
        <div class="dates">
         <div class="dateItem">last update: <br>${upd}</div>
         <div class="dateItem">created at: <br>${cre}</div>
        </div>
      </li>`
    );
  }, ``);
  return `<div class="quotationListUl"><ul>${count}</ul></div>`;
};

window.onload = async () => {

  try {
    const quotationsList = await fetchQuotationsList();

    const listComponent = createQuotationsList(quotationsList);
    const addNewQuotatuion = `<br><button id="addNewQuotation">Add new quotation</button>`;////////////////

    quotationList.innerHTML = `<h2>Quotation list: </h2> ${listComponent}`;

    const li = document.querySelector("#quotationList");

    li.addEventListener("click", async (el) => {
      if(el.target.tagName === "UL") return 0;
      const name = el.target.id;
      const data = await fetchOneQuotation(name);
      console.log(data);
    });
    const addNewQuotationBtn = document.querySelector("#addNewQuotation");
    
    addNewQuotationBtn.addEventListener('click', ()=>{
      console.log("add new quotation");
    });

  } catch (err) {
    console.error(err);
  }
};

const addWork = document.querySelector("#addWork");

addWork.addEventListener('click', () => {

  const worksList = document.querySelector("#worksList");
  worksList.innerHTML += `<h1>add</h1>`

  console.log("addwork");
})