"use strict";

import fetchQuotationsList from "./func/fetchQuotationsList.js";
import components from './components.js';
import createQuotationsList from './func/createQuotationList.js';


const quotationList = document.querySelector("#quotationList");
const workspace = document.querySelector("#workspace");
const response = document.querySelector("#response");


window.onload = async () => {
  try {
    const quotationsList = await fetchQuotationsList();

    const el = document.createElement('div');

    const listComponent = createQuotationsList(quotationsList);

    el.innerHTML = `<h2>Quotation list: </h2> `;
    el.insertBefore(listComponent, null)

    const ul = document.querySelector("#quotationList");
    ul.insertBefore(el, null)

    const createNewQuotationBtn = document.querySelector("#createNewQuotation");

    createNewQuotationBtn.addEventListener("click", () => {
      const formComponent = components.form;
      const form = document.querySelector("#workspace");

      form.innerHTML = formComponent;

      onstartLoop();
    });
  } catch (err) {
    console.error(err);
  }

  document.querySelector("form").reset();
};
