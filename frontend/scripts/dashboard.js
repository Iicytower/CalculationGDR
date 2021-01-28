'use strict';

const quotationList = document.querySelector("#quotationList");
const workspace = document.querySelector("#workspace");
const adress = "http://localhost:3000";

const createQuotationsList = (quotationsList) => {
   const count = quotationsList.reduce((acc, cur) => {
    const { name, createdAt, updatedAt } = cur;

    const created = new Date(createdAt);
    const updated = new Date(updatedAt);
 
    const cre = `${created.getDate()}.${created.getMonth()+1}.${created.getFullYear()}`;
    const upd = `${updated.getDate()}.${updated.getMonth()+1}.${updated.getFullYear()}`;
    return (
      acc +
      `<li>
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
  console.log(createQuotationsList);

  quotationList.innerHTML = "<h1>quotationList</h1>";
  workspace.innerHTML = "<h1>workspace</h1>";

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

    const list = createQuotationsList(quotationsList.data);
    console.log(list);
    quotationList.innerHTML = list;
  } catch (err) {
    console.error(err);
  }
};
