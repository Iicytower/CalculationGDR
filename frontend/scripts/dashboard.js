"use strict";

const quotationList = document.querySelector("#quotationList");
const workspace = document.querySelector("#workspace");
const response = document.querySelector("#response");

const adress = "http://localhost:3000";
let formValues = {
  useMethod: "perDay",
};

const createWorkComp = () => {
  const components = {
    perDay: `<div class="el perDay">
    <div id="works">
       <button type="button" class="addWork" id="addWork">add work</button>
       <div id="worksList"></div>
    </div>

    <div class="border">&nbsp</div>
    <div class="formIt"><label> persons quantity <input type="number" name="personsQuantity" value="1"
             required></label></div>
    <div class="formIt"><label> total sum of working days <input type="number" name="totalSumOfWorkingDays" 
             value="0" required readonly></label></div>
    <div class="formIt"><label> money of the day <input type="number" name="moneyOfTheDay" step="50" value="400"
             required></label></div>
 </div>`,
    perMeter: `<div class="el perMeter"><div class="materials divOnBtn">
    <button type="button" class="addMaterial">add material</button>
    <div class="materialsItem"></div>
 </div>

 <div class="difficults divOnBtn">
    <button type="button" class="addDifficult">add difficult</button>
    <div class="difficultsItem"></div>
 </div>
 <div class="numbersOfMeters formIt"><label>number of meters: <input type="number" name="numbersOfMeters" value="200" step="10"></label></div>
 <div class="pricePerMeter formIt"><label>price per meter: <input type="number" name="pricePerMeter" value="100" step="10"></label></div></div>`,
    work: `<fieldset class="p5">
    <!-- add dynamic chande innerHTML in legend. value should be taken from activity name -->
    <legend>Work</legend>
    <div class="work">
       <div class="formIt"><label>work name<input type="text" name="name" class="workName"></label></div>
       <div class="materials divOnBtn">
          <button type="button" class="addMaterial">add material</button>
          <div class="materialsItem"></div>
       </div>
       <div class="activities divOnBtn">
          <button type="button" class="addActivity">add activity</button>
          <div class="activitiesItem"></div>
       </div>
       <div class="formIt"><label>sum of working days: <input type="text" name="sumOfWorkingDays"
                placeholder="0" readonly></label></div>
    </div>
  </fieldset>`,
    activity: `<fieldset class="p5">
    <legend>Activity</legend>
    <div class="formIt"><label>activity name<input type="text" name="name"></label></div>
    <div class="formIt"><label>number of working days<input type="number" name="numberOfWorkingDays"></label></div>
  </fieldset>`,
    material: `<fieldset class="p5">
    <legend>Materials</legend>
    <div class="materialIt">
      <div class="formIt"><label>material name<input type="text" name="name"></label></div>
      <div class="formIt"><label>quantity<input type="number" name="quantity"></label></div>
      <div class="formIt"><label>price per item<input type="number" name="pricePerItem"></label></div>
    </div>
  </fieldset>`,
    difficult: `<fieldset class="p5">
    <div class="difficultIt">
    <legend>Difficults</legend>
    <div class="formIt"><label>difficult name<input type="text" name="name"></label></div>
    <div class="formIt"><label>converter<input type="number" name="converter" value="0.1" step="0.1"></label></div>
    </div>
  </fieldset>`,
  };
  const addWork = document.querySelector("#addWork");
  addWork.addEventListener("click", (el) => {
    const worksList = document.querySelector("#worksList");
    const insertedElement = document.createElement("div");
    insertedElement.className = "peon";
    insertedElement.innerHTML = components.work;
    el.target.parentNode.lastElementChild.insertBefore(insertedElement, null);

    const addMaterial = insertedElement.querySelector(".addMaterial");
    addMaterial.addEventListener("click", (el) => {
      const insertedElement = document.createElement("div");
      insertedElement.className = "materialIte";
      insertedElement.innerHTML = components.material;
      el.target.parentNode.lastElementChild.insertBefore(insertedElement, null);
    });

    const addActivity = insertedElement.querySelector(".addActivity");
    addActivity.addEventListener("click", (el) => {
      const insertedElement = document.createElement("div");
      insertedElement.className = "activityIt";
      insertedElement.innerHTML = components.activity;
      el.target.parentNode.lastElementChild.insertBefore(insertedElement, null);
    });
  });
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

const deleteQuotation = async (name) => {
  try {
    const resQuotation = await fetch(
      `${adress}/authrequire/delQuotation/${name}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    return resQuotation;
  } catch (err) {
    console.error(err);
  }
};

const editQuotation = async (formData) => {
  try {
    const resQuotation = await fetch(`${adress}/authrequire/editQuotation/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(formData),
    });
    return resQuotation;
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
  return `<div class="quotationListUl"><ul>${count}</ul></div>`;
};

const createSendObj = async () => {
  const sendObj = {};

  const totalPrices = document.querySelector(".totalPrices");

  sendObj.totalMaterialsSumPrice = Number(totalPrices.querySelector("input[name=totalMaterialsSumPrice]").value);
  sendObj.totalWorkPrice = Number(totalPrices.querySelector("input[name=totalWorkPrice]").value);
  sendObj.totalPriceNetto = Number(totalPrices.querySelector("input[name=totalPriceNetto]").value);
  sendObj.totalPriceBrutto = Number(totalPrices.querySelector("input[name=totalPriceBrutto]").value);

  sendObj.name = document.querySelector(".mainInfo").querySelector("input[name=name]").value;
  const useMethod = document.querySelectorAll("input[name=useMethod]");

  for (let i = 0; i < useMethod.length; i++) {
    const el = useMethod[i];
    if (el.checked) sendObj.useMethod = el.value;
  }

  if (sendObj.useMethod === "perDay") {
    const perDay = document.querySelector(".perDay");
    const sendDay = {
      name: sendObj.name,
      useMethod: sendObj.useMethod,
      totalMaterialsSumPrice: sendObj.totalMaterialsSumPrice,
      totalWorkPrice: sendObj.totalWorkPrice,
      totalPriceNetto: sendObj.totalPriceNetto,
      totalPriceBrutto: sendObj.totalPriceBrutto,
      workPerDay: {
        works: [],
        moneyOfTheDay: Number(perDay.querySelector("input[name=moneyOfTheDay]").value),
        personsQuantity: Number(perDay.querySelector("input[name=personsQuantity]").value),
        totalSumOfWorkingDays: Number(perDay.querySelector("input[name=totalSumOfWorkingDays]").value),
      },
    }
    const peon = document.querySelectorAll(".peon");

    for (let i = 0; i < peon.length; i++) {
      const el = peon[i];
      const currentWork = {
        name: el.querySelector("input[name=name").value,
        sumOfWorkingDays: Number(
          el.querySelector("input[name=sumOfWorkingDays]").value
        ),
        materials: [],
        activities: [],
      };

      const materialIt = el.querySelectorAll(".materialIt");
      for (let j = 0; j < materialIt.length; j++) {
        const ele = materialIt[j];
        currentWork.materials.push({
          name: ele.querySelector("input[name=name]").value,
          quantity: Number(ele.querySelector("input[name=quantity]").value),
          pricePerItem: Number(
            ele.querySelector("input[name=pricePerItem]").value
          ),
        });
      }

      const activitiesItem = el.querySelectorAll(".activityIt");
      for (let j = 0; j < activitiesItem.length; j++) {
        const ele = activitiesItem[j];
        currentWork.activities.push({
          name: ele.querySelector("input[name=name]").value,
          numberOfWorkingDays: Number(
            ele.querySelector("input[name=numberOfWorkingDays]").value
          ),
        });
      }

      sendDay.workPerDay.works.push(currentWork);
    }
    return sendDay;
  }

  if (sendObj.useMethod === "perMeter") {
    const perMeter = document.querySelector(".perMeter");
    const materialIt = perMeter.querySelectorAll(".materialIt");
    const difficultIt = perMeter.querySelectorAll(".difficultIt");

    const sendMeter = {
      name: sendObj.name,
      useMethod: sendObj.useMethod,
      totalMaterialsSumPrice: sendObj.totalMaterialsSumPrice,
      totalWorkPrice: sendObj.totalWorkPrice,
      totalPriceNetto: sendObj.totalPriceNetto,
      totalPriceBrutto: sendObj.totalPriceBrutto,
      workPerMeter: {
        materials: [],
        difficults: [],
        numbersOfMeters: Number(perMeter.querySelector("input[name=numbersOfMeters]").value),
        pricePerMeter: Number(perMeter.querySelector("input[name=pricePerMeter]").value),
      },
    }

    for (let i = 0; i < materialIt.length; i++) {
      const el = materialIt[i];
      sendMeter.workPerMeter.materials.push({
        name: el.querySelector("input[name=name]").value,
        quantity: Number(el.querySelector("input[name=quantity]").value),
        pricePerItem: Number(el.querySelector("input[name=pricePerItem]").value),
      });
    }

    for (let i = 0; i < difficultIt.length; i++) {
      const el = difficultIt[i];
      sendMeter.workPerMeter.difficults.push({
        name: el.querySelector("input[name=name]").value,
        converter: Number(el.querySelector("input[name=converter]").value),
      });
    }

    return sendMeter;
  }
  return sendObj;
};

const sumarize = async () => {
  const formValues = await createSendObj();
  if (formValues.useMethod === "perDay") {
    let totalMaterialsSumPrice = 0;
    let totalSumOfWorkingDays = 0;
    formValues.workPerDay.works.forEach((el) => {
      el.sumOfWorkingDays = el.activities.reduce(
        (acc, cur) => acc + cur.numberOfWorkingDays,
        0
      );

      totalMaterialsSumPrice +=
        (el.materials.reduce(
          (acc, cur) => acc + cur.pricePerItem * cur.quantity,
          0
        ) /
          123) *
        100;
      totalSumOfWorkingDays += el.sumOfWorkingDays;
    });
    formValues.workPerDay.totalSumOfWorkingDays = totalSumOfWorkingDays;
    formValues.totalMaterialsSumPrice = totalMaterialsSumPrice;
    formValues.totalWorkPrice =
      formValues.workPerDay.personsQuantity *
      formValues.workPerDay.totalSumOfWorkingDays *
      formValues.workPerDay.moneyOfTheDay *
      1.4 /*marża*/;

    const worksList = document.querySelector("#worksList");
    const peons = worksList.querySelectorAll(".peon");
    peons.forEach((el) => {
      let helper = 0;
      const activityIt = el.querySelectorAll(".activityIt");
      for (let i = 0; i < activityIt.length; i++) {
        const ele = activityIt[i];
        helper =
          helper +
          Number(ele.querySelector("input[name=numberOfWorkingDays]").value);
      }
      el.querySelector("input[name=sumOfWorkingDays]").value = helper;
    });
  }

  if (formValues.useMethod === "perMeter") {
    let totalMaterialsSumPrice = 0;
    formValues.workPerMeter.materials.forEach((el) => {
      totalMaterialsSumPrice += el.quantity * el.pricePerItem;
    });
    formValues.totalMaterialsSumPrice = totalMaterialsSumPrice;
    formValues.totalWorkPrice =
      formValues.workPerMeter.numbersOfMeters *
      formValues.workPerMeter.pricePerMeter *
      (1 +
        formValues.workPerMeter.difficults.reduce(
          (acc, cur) => acc + cur.converter,
          0
        ));
  }

  formValues.totalPriceNetto =
    formValues.totalWorkPrice + formValues.totalMaterialsSumPrice;
  formValues.totalPriceBrutto = formValues.totalPriceNetto * 1.23;

  const totalPrices = document.querySelector(".totalPrices");

  totalPrices.querySelector("input[name=totalMaterialsSumPrice]").value =
    formValues.totalMaterialsSumPrice;
  totalPrices.querySelector("input[name=totalWorkPrice]").value =
    formValues.totalWorkPrice;
  totalPrices.querySelector("input[name=totalPriceNetto]").value =
    formValues.totalPriceNetto;
  totalPrices.querySelector("input[name=totalPriceBrutto]").value =
    formValues.totalPriceBrutto;
  return formValues;
};

const onstartLoop = () => {
  const useMethod = document.querySelectorAll("input[name=useMethod]");
  const workspaceForm = document.querySelector(".workspaceForm");

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
          <div class="formIt"><label> persons quantity <input type="number" name="personsQuantity" value="1"
                   required></label></div>
          <div class="formIt"><label> total sum of working days <input type="number" name="totalSumOfWorkingDays" 
                   value="0" required readonly></label></div>
          <div class="formIt"><label> money of the day <input type="number" name="moneyOfTheDay" step="50" value="400"
                   required></label></div>
       </div>`;
            formValues.useMethod = "perDay";

            createWorkComp();
          }
          if (elem.nextSibling.data === "perMeter") {
            workspaceForm.innerHTML = `<div class="el perMeter"><div class="materials divOnBtn">
          <button type="button" class="addMaterial">add material</button>
          <div class="materialsItem"></div>
       </div>
  
       <div class="difficults divOnBtn">
          <button type="button" class="addDifficult">add difficult</button>
          <div class="difficultsItem"></div>
       </div>
       <div class="numbersOfMeters formIt"><label>number of meters: <input type="number" name="numbersOfMeters" value="200" step="10"></label></div>
       <div class="pricePerMeter formIt"><label>price per meter: <input type="number" name="pricePerMeter" value="100" step="10"></label></div></div>`;

            formValues.useMethod = "perMeter";

            const addMaterial = document.querySelector(".addMaterial");
            addMaterial.addEventListener("click", (el) => {
              const component = `<fieldset class="p5">
            <legend>Materials</legend>
            <div class="materialIt">
              <div class="formIt"><label>material name<input type="text" name="name"></label></div>
              <div class="formIt"><label>quantity<input type="number" name="quantity"></label></div>
              <div class="formIt"><label>price per item<input type="number" name="pricePerItem"></label></div>
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
            <div class="formIt"><label>difficult name<input type="text" name="name"></label></div>
            <div class="formIt"><label>converter<input type="number" name="converter" value="0.1" step="0.1"></label></div>
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
  const acceptForm = document.querySelector("#acceptForm");
  acceptForm.addEventListener("click", async () => {
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
          break;
        case 201:
          const data = await res.json();
          response.innerText = data.msg;
          break;
        case 422:
          const datav = await res.json();
          response.innerText = `Invalid value in ${datav.errors[0].param}.`;
          break;
        case 400:
          const dataf = await res.json();
          if (dataf.msg) {
            response.innerText = dataf.msg;
          } else {
            response.innerText =
              "Something goes wrong. Please try later. Probably bad request";
          }
          break;
        case 500:
          const datap = await res.json();
          response.innerText = datap.msg;
          break;
        default:
          response.innerText = "Something goes wrong. Please try later.";
          break;
      }
    } catch (err) {
      response.innerText = "Something goes wrong. Please try again later.";
    }
  });

  const summarizeForm = document.querySelector("#summarize");
  summarizeForm.addEventListener("click", sumarize);


  const edit = document.querySelector("#edit");
  edit.addEventListener("click", async () => {
    const valuesForm = await sumarize(); ///////////
    try {
      const res = await fetch(`${adress}/authrequire/editQuotation`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify(valuesForm),
      });

      // console.log(res);
      // console.log(await res.json());

      switch (res.status) {
        case 200:
          const dataa = await res.json();
          response.innerText = dataa.msg;
          break;
        case 201:
          const data = await res.json();
          response.innerText = data.msg;
          break;
        case 401:
          const datao = await res.json();
          response.innerText = datao.msg;
        case 404:
          const datan = await res.json();
          response.innerText = datan.msg;
        case 422:
          const datav = await res.json();
          response.innerText = `Invalid value in ${datav.errors[0].param}.`;
          break;
        case 400:
          const dataf = await res.json();
          if (dataf.msg) {
            response.innerText = dataf.msg;
          } else {
            response.innerText =
              "Something goes wrong. Please try later. Probably bad request";
          }
          break;
        case 500:
          const datap = await res.json();
          response.innerText = datap.msg;
          break;
        default:
          response.innerText = "Something goes wrong. Please try later.";
          break;
      }
    } catch (err) {
      console.error(err);
    }
  });
};

const showQuotation = (data) => {
  const components = {
    perDay: `<div class="el perDay">
    <div id="works">
       <button type="button" class="addWork" id="addWork">add work</button>
       <div id="worksList"></div>
    </div>

    <div class="border">&nbsp</div>
    <div class="formIt"><label> persons quantity <input type="number" name="personsQuantity" value="1"
             required></label></div>
    <div class="formIt"><label> total sum of working days <input type="number" name="totalSumOfWorkingDays" 
             value="0" required readonly></label></div>
    <div class="formIt"><label> money of the day <input type="number" name="moneyOfTheDay" step="50" value="400"
             required></label></div>
 </div>`,
    perMeter: `<div class="el perMeter"><div class="materials divOnBtn">
    <button type="button" class="addMaterial">add material</button>
    <div class="materialsItem"></div>
 </div>

 <div class="difficults divOnBtn">
    <button type="button" class="addDifficult">add difficult</button>
    <div class="difficultsItem"></div>
 </div>
 <div class="numbersOfMeters formIt"><label>number of meters: <input type="number" name="numbersOfMeters" value="200" step="10"></label></div>
 <div class="pricePerMeter formIt"><label>price per meter: <input type="number" name="pricePerMeter" value="100" step="10"></label></div></div>`,
    work: `<fieldset class="p5">
    <!-- add dynamic chande innerHTML in legend. value should be taken from activity name -->
    <legend>Work</legend>
    <div class="work">
       <div class="formIt"><label>work name<input type="text" name="name" class="workName"></label></div>
       <div class="materials divOnBtn">
          <button type="button" class="addMaterial">add material</button>
          <div class="materialsItem"></div>
       </div>
       <div class="activities divOnBtn">
          <button type="button" class="addActivity">add activity</button>
          <div class="activitiesItem"></div>
       </div>
       <div class="formIt"><label>sum of working days: <input type="text" name="sumOfWorkingDays"
                placeholder="0" readonly></label></div>
    </div>
  </fieldset>`,
    activity: `<fieldset class="p5">
    <legend>Activity</legend>
    <div class="formIt"><label>activity name<input type="text" name="name"></label></div>
    <div class="formIt"><label>number of working days<input type="number" name="numberOfWorkingDays"></label></div>
  </fieldset>`,
    material: `<fieldset class="p5">
    <legend>Materials</legend>
    <div class="materialIt">
      <div class="formIt"><label>material name<input type="text" name="name"></label></div>
      <div class="formIt"><label>quantity<input type="number" name="quantity"></label></div>
      <div class="formIt"><label>price per item<input type="number" name="pricePerItem"></label></div>
    </div>
  </fieldset>`,
    difficult: `<fieldset class="p5">
    <div class="difficultIt">
    <legend>Difficults</legend>
    <div class="formIt"><label>difficult name<input type="text" name="name"></label></div>
    <div class="formIt"><label>converter<input type="number" name="converter" value="0.1" step="0.1"></label></div>
    </div>
  </fieldset>`,
  };
  const mainInfo = document.querySelector(".mainInfo");
  mainInfo.querySelector("input[name=name").value = data.name;
  mainInfo.querySelector(`input[value=${data.useMethod}`).checked = true;

  const totalPrices = document.querySelector(".totalPrices");
  totalPrices.querySelector("input[name=totalMaterialsSumPrice]").value =
    data.totalMaterialsSumPrice;
  totalPrices.querySelector("input[name=totalWorkPrice]").value =
    data.totalWorkPrice;
  totalPrices.querySelector("input[name=totalPriceNetto]").value =
    data.totalPriceNetto;
  totalPrices.querySelector("input[name=totalPriceBrutto]").value =
    data.totalPriceBrutto;

  if (data.useMethod === "perDay") {
    const workspaceForm = document.querySelector(".workspaceForm");
    workspaceForm.innerHTML = components.perDay;

    const addWork = document.querySelector("#addWork");
    addWork.addEventListener("click", (el) => {
      const worksList = document.querySelector("#worksList");
      const insertedElement = document.createElement("div");
      insertedElement.className = "peon";
      insertedElement.innerHTML = components.work;
      el.target.parentNode.lastElementChild.insertBefore(insertedElement, null);

      const addMaterial = insertedElement.querySelector(".addMaterial");
      addMaterial.addEventListener("click", (el) => {
        const insertedElement = document.createElement("div");
        insertedElement.className = "materialIte";
        insertedElement.innerHTML = components.material;
        el.target.parentNode.lastElementChild.insertBefore(
          insertedElement,
          null
        );
      });

      const addActivity = insertedElement.querySelector(".addActivity");
      addActivity.addEventListener("click", (el) => {
        const insertedElement = document.createElement("div");
        insertedElement.className = "activityIt";
        insertedElement.innerHTML = components.activity;
        el.target.parentNode.lastElementChild.insertBefore(
          insertedElement,
          null
        );
      });
    });

    const perDay = document.querySelector(".perDay");
    perDay.querySelector("input[name=personsQuantity]").value =
      data.workPerDay.personsQuantity;
    perDay.querySelector("input[name=totalSumOfWorkingDays]").value =
      data.workPerDay.totalSumOfWorkingDays;
    perDay.querySelector("input[name=moneyOfTheDay]").value =
      data.workPerDay.moneyOfTheDay;

    data.workPerDay.works.forEach((el) => {
      const insertedElement = document.createElement("div");
      insertedElement.className = "peon";
      insertedElement.innerHTML = components.work;

      const addMaterial = insertedElement.querySelector(".addMaterial");
      addMaterial.addEventListener("click", (el) => {
        const insertedElement = document.createElement("div");
        insertedElement.className = "materialIte";
        insertedElement.innerHTML = components.material;
        el.target.parentNode.lastElementChild.insertBefore(
          insertedElement,
          null
        );
      });

      const addActivity = insertedElement.querySelector(".addActivity");
      addActivity.addEventListener("click", (el) => {
        const insertedElement = document.createElement("div");
        insertedElement.className = "activityIt";
        insertedElement.innerHTML = components.activity;
        el.target.parentNode.lastElementChild.insertBefore(
          insertedElement,
          null
        );
      });

      insertedElement.querySelector("input[name=name]").value = el.name;
      insertedElement.querySelector("input[name=sumOfWorkingDays]").value =
        el.sumOfWorkingDays;

      const worksList = document.querySelector("#worksList");

      //loops on materials and activities

      for (let i = 0; i < el.materials.length; i++) {
        const ele = el.materials[i];
        const insertedElementMaterial = document.createElement("div");
        insertedElementMaterial.className = "materialIte";
        insertedElementMaterial.innerHTML = components.material;
        insertedElementMaterial.querySelector("input[name=name").value =
          ele.name;
        insertedElementMaterial.querySelector("input[name=quantity").value =
          ele.quantity;
        insertedElementMaterial.querySelector("input[name=pricePerItem").value =
          ele.pricePerItem;

        const materialsList = insertedElement.querySelector(".materialsItem");
        materialsList.insertBefore(insertedElementMaterial, null);
      }

      for (let i = 0; i < el.activities.length; i++) {
        const ele = el.activities[i];
        const insertedElementActivity = document.createElement("div");
        insertedElementActivity.className = "activityIt";
        insertedElementActivity.innerHTML = components.activity;
        insertedElementActivity.querySelector("input[name=name").value =
          ele.name;
        insertedElementActivity.querySelector(
          "input[name=numberOfWorkingDays"
        ).value = ele.numberOfWorkingDays;

        const materialsList = insertedElement.querySelector(".activitiesItem");
        materialsList.insertBefore(insertedElementActivity, null);
      }
      worksList.insertBefore(insertedElement, null);
    });
  }
  if (data.useMethod === "perMeter") {
    const workspaceForm = document.querySelector(".workspaceForm");
    workspaceForm.innerHTML = components.perMeter;

    const perMeter = document.querySelector(".perMeter");
    perMeter.querySelector("input[name=numbersOfMeters]").value =
      data.workPerDay.numbersOfMeters;
    perMeter.querySelector("input[name=pricePerMeter]").value =
      data.workPerDay.pricePerMeter;

    const addMaterial = document.querySelector(".addMaterial");
    addMaterial.addEventListener("click", (el) => {
      const insertedElement = document.createElement("div");
      insertedElement.innerHTML = components.material;
      el.target.parentNode.lastElementChild.insertBefore(insertedElement, null);
    });

    const addDifficult = document.querySelector(".addDifficult");
    addDifficult.addEventListener("click", (el) => {
      const insertedElement = document.createElement("div");
      insertedElement.innerHTML = components.difficult;
      el.target.parentNode.lastElementChild.insertBefore(insertedElement, null);
    });

    for (let i = 0; i < data.workPerMeter.materials.length; i++) {
      const ele = data.workPerMeter.materials[i];
      const insertedElement = document.createElement("div");
      insertedElement.className = "materialIte";
      insertedElement.innerHTML = components.material;
      insertedElement.querySelector("input[name=name").value = ele.name;
      insertedElement.querySelector("input[name=quantity").value = ele.quantity;
      insertedElement.querySelector("input[name=pricePerItem").value =
        ele.pricePerItem;

      const materialsList = document.querySelector(".materialsItem");
      materialsList.insertBefore(insertedElement, null);
    }
    for (let i = 0; i < data.workPerMeter.difficults.length; i++) {
      const el = data.workPerMeter.difficults[i];
      const insertedElement = document.createElement("div");
      insertedElement.className = "difficultIt";
      insertedElement.innerHTML = components.difficult;
      insertedElement.querySelector("input[name=name").value = el.name;
      insertedElement.querySelector("input[name=converter").value =
        el.converter;

      const difficultsList = document.querySelector(".difficultsItem");
      difficultsList.insertBefore(insertedElement, null);
    }
  }
};

window.onload = async () => {
  try {
    const quotationsList = await fetchQuotationsList();

    const listComponent = createQuotationsList(quotationsList);
    quotationList.innerHTML = `<h2>Quotation list: </h2> ${listComponent}`;

    const ul = document.querySelector("#quotationList");

    ul.addEventListener("click", async (el) => {
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

    const createNewQuotationBtn = document.querySelector("#createNewQuotation");

    createNewQuotationBtn.addEventListener("click", () => {
      const formComponent = ` <form id="fullForm" method="POST" enctype="multipart/form-data">
      <div class="mainInfo">

         <div class="el">
            <label>name: <input type="text" name="name" placeholder="enter the name of quotation" require></label>
         </div>

         <div class="el">
            <fieldset>
               <legend>Method</legend>
               <div><label><input type="radio" value="perDay" name="useMethod">perDay</label></div>
               <div><label><input type="radio" value="perMeter" name="useMethod">perMeter</label></div>
            </fieldset>
         </div>

      </div>
      <div class="workspaceForm">

      </div>
      <div class="totalPrices">
         <div class="el formIt"><label>total materials sum price: <input type="text" name="totalMaterialsSumPrice"
                  placeholder="0" readonly></label></div>
         <div class="el formIt"><label>total work price: <input type="text" name="totalWorkPrice" placeholder="0"
                  readonly></label></div>
         <div class="el formIt"><label>total price netto: <input type="text" name="totalPriceNetto" placeholder="0"
                  readonly></label></div>
         <div class="el formIt"><label>total price brutto: <input type="text" name="totalPriceBrutto" placeholder="0"
                  readonly></label></div>
      </div>
      <div class="formButtons">

         <input type="reset" value="Clear form">
         <input type="button" value="add quotation to database" id="acceptForm">
         <input type="button" value="summarize" id="summarize">
      </div>
   </form>`;
      const form = document.querySelector("#workspace");

      form.innerHTML = formComponent;

      onstartLoop();
    });
  } catch (err) {
    console.error(err);
  }

  document.querySelector("form").reset();
};

onstartLoop();
