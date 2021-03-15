import fetchOneQuotation from './fetchOneQuotation.js';
import showQuotation from './showQuotation.js'

export default (quotationsList) => {
  if (quotationsList.length === 0) return `You don't have any quotation yet.`;

  const count = quotationsList.reduce((acc, cur) => {
    const { name, createdAt, updatedAt } = cur;

    const created = new Date(createdAt);
    const updated = new Date(updatedAt);

    const cre = `${created.getDate()}.${created.getMonth() + 1}.${created.getFullYear()}`;
    const upd = `${updated.getDate()}.${updated.getMonth() + 1}.${updated.getFullYear()}`;
    return (
      acc +
      `<li id="${name}" class="quotationItem">
        <div class="quotationInfo">
          <div class="name"><h3>${name}</h3></div>
          <div class="dates">
          <div class="dateItem">last update: <br>${upd}</div>
          <div class="dateItem">created at: <br>${cre}</div>
          </div>
        </div>
        </li>
        <div class="delEditBtns">
          <button type="button" class="delete" holder="${name}">delete</button>
        </div>
        `
    );
  }, ``);

  const element = document.createElement('DIV');
  element.className = "quotationListUl";
  element.innerHTML = `<ul>${count}</ul>`

element.addEventListener("click", async (el) => {
    if (el.target.tagName === "UL") return 0;
    if (el.target.tagName === "DIV") return 0;
    if (el.target.tagName === "BUTTON") {
      const quotationName = el.target.getAttribute("holder");

      if (el.target.className === "delete") {
        const res = await deleteQuotation(quotationName);
        const resp = await res.json();
        response.innerText = resp.msg;

        const toRemoveEl = document.querySelector(`#${quotationName}`);
        toRemoveEl.remove();
        el.target.parentNode.remove();
        return 0;
      }
      return 0;
    }
    const name = el.target.id;
    const data = await fetchOneQuotation(name);

    showQuotation(data);
  });

  return element;
};