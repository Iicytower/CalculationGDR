"use strict";

const quotationList = document.querySelector("#quotationList");
const workspace = document.querySelector("#workspace");
const adress = "http://localhost:3000";
const formValues = {
  useMethod: "perDay",
};

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
    const addNewQuotatuion = `<br><button id="addNewQuotation">Add new quotation</button>`;
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

  document.querySelector('form').reset();

};

const workspaceForm = document.querySelector(".workspaceForm");

const useMethod = document.querySelectorAll("input[name=useMethod]");

for (let i = 0; i < useMethod.length; i++) {
  const ele = useMethod[i];

  ele.addEventListener("change", (e) => {
    for (let j = 0; j < useMethod.length; j++) {
      const elem = useMethod[j];

      if (elem.checked) {
        if (elem.nextSibling.data === "perDay") {
          workspaceForm.innerHTML = `<div class="el perDay">
          <div id="works">
             <button type="button" class="addWork" id="addWork">add work</button>
             <div id="worksList"></div>
          </div>
  
          <div class="border">&nbsp</div>
          <div><label> persons quantity <input type="number" name="personsQuantity" value="1"
                   required readonly></label></div>
          <div><label> total sum of working days <input type="number" name="totalSumOfWorkingDays" 
                   value="0" required readonly></label></div>
          <div><label> money of the day <input type="number" name="moneyOfTheDay" step="50" value="400"
                   required></label></div>
       </div>`;
          formValues.useMethod = "perDay";
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
              insertedElement.className = "materialIt";
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
              insertedElement.className = "activityIt";
              insertedElement.innerHTML = component;
              el.target.parentNode.lastElementChild.insertBefore(
                insertedElement,
                null
              );
            });
          });
        }
        if (elem.nextSibling.data === "perMeter") {
          workspaceForm.innerHTML = `<div class="el perMeter"><div class="materials">
          <button type="button" class="addMaterial">add material</button>
          <div class="materialsItem"></div>
       </div>
  
       <div class="difficults">
          <button type="button" class="addDifficult">add difficult</button>
          <div class="difficultsItem"></div>
       </div>
       <div class="numberOfMeters"><label>number of meters: <input type="number" name="numberOfMeters" value="200" step="10"></label></div>
       <div class="pricePerMeter"><label>price per meter: <input type="number" name="pricePerMeter" value="100" step="10"></label></div></div>`;

       formValues.useMethod = "perMeter";
          const addMaterial = document.querySelector(".addMaterial");
          addMaterial.addEventListener("click", (el) => {
            const component = `<fieldset class="p5">
            <legend>Materials</legend>
            <div class="materialIt">
            <div><label>material name<input type="text" name="name"></label></div>
            <div><label>quantity<input type="number" name="quantity"></label></div>
            <div><label>price per item<input type="number" name="pricePerItem"></label></div>
            </div>
          </fieldset>`;

            const insertedElement = document.createElement("div");
            insertedElement.innerHTML = component;
            el.target.parentNode.lastElementChild.insertBefore(
              insertedElement,
              null
            );
          });

          const addDifficult = document.querySelector(".addDifficult");
          addDifficult.addEventListener("click", (el) => {
            const component = `<fieldset class="p5">
            <div class="difficultIt">
            <legend>Difficults</legend>
            <div><label>difficult name<input type="text" name="name"></label></div>
            <div><label>converter<input type="number" name="converter" value="0.1" step="0.1"></label></div>
            </div>
          </fieldset>`;
            const insertedElement = document.createElement("div");
            insertedElement.innerHTML = component;
            el.target.parentNode.lastElementChild.insertBefore(
              insertedElement,
              null
            );
          });
        }
        break;
      }
    }
  });
}

const createSendObj = () => {
  const perDay = document.querySelector(".perDay");
  const perMeter = document.querySelector(".perMeter");
  const fullForm = document.querySelector("#fullForm").elements;

  if (perDay) {
    const peon = document.querySelectorAll(".peon");
    formValues.workPerDay = {
      works: [],
    };

    for (let i = 0; i < peon.length; i++) {
      const el = peon[i];
      const currentWork = {
        name: el.querySelector("input[name=name").value,
        sumOfWorkingDays: Number(el.querySelector("input[name=sumOfWorkingDays]").value),
        materials: [],
        activities: [],
      };

      const materialsItem = el.querySelectorAll(".materialIt");
      for (let j = 0; j < materialsItem.length; j++) {
        const ele = materialsItem[j];
        currentWork.materials.push({
          name: ele.querySelector("input[name=name]").value,
          quantity: Number(ele.querySelector("input[name=quantity]").value),
          pricePerItem: Number(ele.querySelector("input[name=pricePerItem]").value),
        });
      }

      const activitiesItem = el.querySelectorAll(".activityIt");
      for (let j = 0; j < activitiesItem.length; j++) {
        const ele = activitiesItem[j];
        currentWork.activities.push({
          name: ele.querySelector("input[name=name]").value,
          numberOfWorkingDays: Number(ele.querySelector("input[name=numberOfWorkingDays]").value),
        });
      }

      formValues.workPerDay.works.push(currentWork);
    }

    formValues.workPerDay.personsQuantity = Number(perDay.querySelector("input[name=personsQuantity]").value);
    formValues.workPerDay.totalSumOfWorkingDays = Number(perDay.querySelector("input[name=totalSumOfWorkingDays]").value);
    formValues.workPerDay.moneyOfTheDay = Number(perDay.querySelector("input[name=moneyOfTheDay]").value);
  }

  if (perMeter) {
    const materialIt = document.querySelectorAll(".materialIt");
    const difficultIt = document.querySelectorAll(".difficultIt");
    formValues.workPerMeter = {
      materials: [],
      difficults: [],
    };

    for (let i = 0; i < materialIt.length; i++) {
      const el = materialIt[i];
      formValues.workPerMeter.materials.push({
        name: el.querySelector("input[name=name]").value,
        quantity: Number(el.querySelector("input[name=quantity]").value),
        pricePerItem: Number(el.querySelector("input[name=pricePerItem]").value),
      });
    }

    for (let i = 0; i < difficultIt.length; i++) {
      const el = difficultIt[i];
      formValues.workPerMeter.difficults.push({
        name: el.querySelector("input[name=name]").value,
        converter: Number(el.querySelector("input[name=converter]").value),
      })
    }

    formValues.workPerMeter.numberOfMeters = Number(perMeter.querySelector("input[name=numberOfMeters]").value);
    formValues.workPerMeter.pricePerMeter = Number(perMeter.querySelector("input[name=pricePerMeter]").value);

  }

  const totalPrices = document.querySelector(".totalPrices")

  formValues.totalMaterialsSumPrice = Number(totalPrices.querySelector("input[name=totalMaterialsSumPrice]").value);
  formValues.totalWorkPrice = Number(totalPrices.querySelector("input[name=totalWorkPrice]").value);
  formValues.totalPriceNetto = Number(totalPrices.querySelector("input[name=totalPriceNetto]").value);
  formValues.totalPriceBrutto = Number(totalPrices.querySelector("input[name=totalPriceBrutto]").value);
  formValues.name = document.querySelector(".mainInfo").querySelector("input[name=name]").value;

  return formValues;
}

const sumarize = () => {
  const formValues = createSendObj();
  
  if(formValues.useMethod === "perDay"){
    let totalMaterialsSumPrice = 0;
    formValues.workPerDay.works.forEach(el => {
      el.sumOfWorkingDays = el.activities.reduce((acc, cur)=> acc + cur.numberOfWorkingDays, 0);
      
      totalMaterialsSumPrice += (el.materials.reduce((acc, cur) => acc + (cur.pricePerItem*cur.quantity), 0)/123) * 100;
      formValues.workPerDay.totalSumOfWorkingDays += el.sumOfWorkingDays
    });
    formValues.totalMaterialsSumPrice = totalMaterialsSumPrice;
    formValues.totalWorkPrice = 
    formValues.workPerDay.personsQuantity * formValues.workPerDay.totalSumOfWorkingDays * formValues.workPerDay.moneyOfTheDay * 1.4/*marża*/;

    const worksList = document.querySelector("#worksList");
    const peons = worksList.querySelectorAll(".peon");
    peons.forEach(el => {
      let helper = 0;
      const activityIt = el.querySelectorAll(".activityIt")    
      for (let i = 0; i < activityIt.length; i++) {
        const ele = activityIt[i];
          helper = helper + Number(ele.querySelector("input[name=numberOfWorkingDays]").value);
      }
      el.querySelector("input[name=sumOfWorkingDays]").value = helper;
    });
  }
  
  if(formValues.useMethod === "perMeter"){
    
    formValues.workPerMeter.materials.forEach(el => {
      formValues.totalMaterialsSumPrice += el.quantity * el.pricePerItem;
    });
    formValues.totalWorkPrice = 
    formValues.workPerMeter.numberOfMeters * formValues.workPerMeter.pricePerMeter * 
    (1 + formValues.workPerMeter.difficults.reduce((acc, cur)=> acc + cur.converter , 0));

  }
  
  formValues.totalPriceNetto = formValues.totalWorkPrice + formValues.totalMaterialsSumPrice;
  formValues.totalPriceBrutto = formValues.totalPriceNetto * 1.23;

  const totalPrices = document.querySelector(".totalPrices");

  totalPrices.querySelector("input[name=totalMaterialsSumPrice]").value = formValues.totalMaterialsSumPrice;
  totalPrices.querySelector("input[name=totalWorkPrice]").value = formValues.totalWorkPrice;
  totalPrices.querySelector("input[name=totalPriceNetto]").value = formValues.totalPriceNetto;
  totalPrices.querySelector("input[name=totalPriceBrutto]").value = formValues.totalPriceBrutto;

  return formValues;
}

const acceptForm = document.querySelector("#acceptForm");
acceptForm.addEventListener("click", async () => {
  const response = document.querySelector("#response");
  const formValues = sumarize();

  try {

    const res = await fetch(`${adress}/authrequire/addQuotation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(formValues),
    });

    switch (res.status) {
      case 200:
        const dataa = await res.json();
        response.innerText = dataa.msg;
        console.log(dataa);
        console.log(dataa.msg);
      break;
      case 201:
        const data = await res.json();
        response.innerText = data.msg;
        break;
      case 422:
        const datav = await res.json();
        response.innerText = `Invalid value in ${datav.errors[0].param}.`;
        break;
      case 500:
        const datap = await res.json();
        response.innerText = datap.msg;
        break;
      default:
        response.innerText = "Something goes wrong. Please try later.";
        break;
    }

    console.log(res);
    
    
  } catch (err) {
    response.innerText = "Something goes wrong. Please try again later.";

  }

});
const summarizeForm = document.querySelector("#summarize");
summarizeForm.addEventListener("click", sumarize);
