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
  if (quotationsList.length === 0) return `You don't have any quotation yet.`;

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
    const addNewQuotatuion = `<br><button id="addNewQuotation">Add new quotation</button>`; ////////////////

    quotationList.innerHTML = `<h2>Quotation list: </h2> ${listComponent}`;

    const li = document.querySelector("#quotationList");

    li.addEventListener("click", async (el) => {
      if (el.target.tagName === "UL") return 0;
      const name = el.target.id;
      const data = await fetchOneQuotation(name);
      console.log(data);
    });
    const addNewQuotationBtn = document.querySelector("#addNewQuotation");

    addNewQuotationBtn.addEventListener("click", () => {
      console.log("add new quotation");
    });
  } catch (err) {
    console.error(err);
  }
};

const perDayC = document.querySelector(".perDay");
const perMeterC = document.querySelector(".perMeter");
const workspaceForm = document.querySelector(".workspaceForm");

const useMethod = document.querySelectorAll("input[name=useMethod]");

for (let i = 0; i < useMethod.length; i++) {
  const ele = useMethod[i];

  ele.addEventListener("change", (e) => {
    for (let j = 0; j < useMethod.length; j++) {
      const elem = useMethod[j];

      if (elem.checked) {
        if (elem.nextSibling.data === "perDay") {
          workspaceForm.innerHTML = `<div class="el">
          <div id="works">
             <button type="button" class="addWork" id="addWork">add work</button>
             <div id="worksList"></div>
          </div>
  
          <div class="border">&nbsp</div>
          <div><label> persons quantity <input type="number" name="personsQuantity" step="1" value="1"
                   required></label></div>
          <div><label> total sum of working days <input type="number" name="totalSumOfWorkingDays" step="0.5"
                   value="3" required></label></div>
          <div><label> money of the day <input type="number" name="moneyOfTheDay" step="50" value="400"
                   required></label></div>
       </div>`;

          const addWork = document.querySelector("#addWork");
          addWork.addEventListener("click", (el) => {
            const worksList = document.querySelector("#worksList");
            const comp = `<fieldset class="p5">
         <!-- add dynamic chande innerHTML in legend. value should be taken from activity name -->
         <legend>Work</legend>
         <div class="work">
            <div><label>work name<input type="text" name="name" class="workName"></label></div>
            <div class="materials">
               <button type="button" class="addMaterial">add material</button>
               <div class="materialsItem"></div>
            </div>
       
            <div class="activities">
               <button type="button" class="addActivity">add activity</button>
               <div class="activitiesItem"></div>
            </div>
            <div><label>sum of working days: <input type="text" name="sumOfWorkingDays"
                     placeholder="0" readonly></label></div>
         </div>
       </fieldset>`;
            const insertedElement = document.createElement("div");
            insertedElement.className = "peon";
            insertedElement.innerHTML = comp;
            el.target.parentNode.lastElementChild.insertBefore(
              insertedElement,
              null
            );

            const addMaterial = insertedElement.querySelector(".addMaterial");
            addMaterial.addEventListener("click", (el) => {
              const component = `<fieldset class="p5">
             <legend>Materials</legend>
             <div><label>material name<input type="text" name="name"></label></div>
             <div><label>quantity<input type="number" name="quantity"></label></div>
             <div><label>price per item<input type="number" name="pricePerItem"></label></div>
           </fieldset>`;

              const insertedElement = document.createElement("div");
              insertedElement.innerHTML = component;
              el.target.parentNode.lastElementChild.insertBefore(
                insertedElement,
                null
              );
            });

            const addActivity = insertedElement.querySelector(".addActivity");
            addActivity.addEventListener("click", (el) => {
              const component = `<fieldset class="p5">
             <legend>Activity</legend>
             <div><label>activity name<input type="text" name="name"></label></div>
             <div><label>number of working days<input type="number" name="numberOfWorkingDays"></label></div>
           </fieldset>`;

              const insertedElement = document.createElement("div");
              insertedElement.innerHTML = component;
              el.target.parentNode.lastElementChild.insertBefore(
                insertedElement,
                null
              );
            });
          });
        }
        if (elem.nextSibling.data === "perMeter") {
          workspaceForm.innerHTML = `<div class="materials">
          <button type="button" class="addMaterial">add material</button>
          <div class="materialsItem"></div>
       </div>
  
       <div class="difficults">
          <button type="button" class="addDifficult">add difficult</button>
          <div class="difficultsItem"></div>
       </div>
       <div><label>number of meters: <input type="number" name="numberOfMeters" value="200" step="10"></label></div>
       <div><label>price per meter: <input type="number" name="pricePerMeter" value="100" step="10"></label></div>`;

          const addMaterial = document.querySelector(".addMaterial");
          addMaterial.addEventListener("click", (el) => {
            const component = `<fieldset class="p5">
            <legend>Materials</legend>
            <div><label>material name<input type="text" name="name"></label></div>
            <div><label>quantity<input type="number" name="quantity"></label></div>
            <div><label>price per item<input type="number" name="pricePerItem"></label></div>
          </fieldset>`;

            const insertedElement = document.createElement("div");
            insertedElement.innerHTML = component;
            el.target.parentNode.lastElementChild.insertBefore(
              insertedElement,
              null
            );
          });

          const addDifficult = document.querySelector(".addDifficult");
          console.log(addDifficult);
          addDifficult.addEventListener("click", (el) => {
            const component = `<fieldset class="p5">
            <legend>Difficults</legend>
            <div><label>difficult name<input type="text" name="name"></label></div>
            <div><label>converter<input type="number" name="converter" value="0.1" step="0.1"></label></div>
          </fieldset>`;
            const insertedElement = document.createElement("div");
            insertedElement.innerHTML = component;
            el.target.parentNode.lastElementChild.insertBefore(
              insertedElement,
              null
            );

          });
        }

        // workspaceForm.innerHTML = elem.nextSibling.data;
        break;
      }
    }
  });
}

// const addWork = document.querySelector("#addWork");
// addWork.addEventListener("click", (el) => {
//   const worksList = document.querySelector("#worksList");
//   const comp = `<fieldset class="p5">
//   <!-- add dynamic chande innerHTML in legend. value should be taken from activity name -->
//   <legend>Work</legend>
//   <div class="work">
//      <div><label>work name<input type="text" name="name" class="workName"></label></div>
//      <div class="materials">
//         <button type="button" class="addMaterial">add material</button>
//         <div class="materialsItem"></div>
//      </div>

//      <div class="activities">
//         <button type="button" class="addActivity">add activity</button>
//         <div class="activitiesItem"></div>
//      </div>
//      <div><label>sum of working days: <input type="text" name="sumOfWorkingDays"
//               placeholder="0" readonly></label></div>
//   </div>
// </fieldset>`;
//   const insertedElement = document.createElement("div");
//   insertedElement.className = "peon";
//   insertedElement.innerHTML = comp;
//   el.target.parentNode.lastElementChild.insertBefore(insertedElement, null);

//   const addMaterial = insertedElement.querySelector(".addMaterial");

//   addMaterial.addEventListener("click", (el) => {
//     const component = `<fieldset class="p5">
//       <legend>Materials</legend>
//       <div><label>material name<input type="text" name="name"></label></div>
//       <div><label>quantity<input type="number" name="quantity"></label></div>
//       <div><label>price per item<input type="number" name="pricePerItem"></label></div>
//     </fieldset>`;

//     const insertedElement = document.createElement("div");
//     insertedElement.innerHTML = component;
//     el.target.parentNode.lastElementChild.insertBefore(insertedElement, null);
//   });

//   const addActivity = insertedElement.querySelector(".addActivity");
//   addActivity.addEventListener("click", (el) => {
//     const component = `<fieldset class="p5">
//       <legend>Activity</legend>
//       <div><label>activity name<input type="text" name="name"></label></div>
//       <div><label>number of working days<input type="number" name="numberOfWorkingDays"></label></div>
//     </fieldset>`;

//     const insertedElement = document.createElement("div");
//     insertedElement.innerHTML = component;
//     el.target.parentNode.lastElementChild.insertBefore(insertedElement, null);
//   });
// });
