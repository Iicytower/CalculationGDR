import components from '../components.js'

export default (data) => {
  
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
      data.workPerMeter.numbersOfMeters;
    perMeter.querySelector("input[name=pricePerMeter]").value =
      data.workPerMeter.pricePerMeter;

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
      insertedElement.className = "difficultIts";
      insertedElement.innerHTML = components.difficult;
      insertedElement.querySelector("input[name=name").value = el.name;
      insertedElement.querySelector("input[name=converter").value =
        el.converter;

      const difficultsList = document.querySelector(".difficultsItem");
      difficultsList.insertBefore(insertedElement, null);
    }
  }
};