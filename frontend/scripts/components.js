export default {
  perDay: `<div class="el perDay">
  <div id="works">
     <button type="button" class="addWork" id="addWork">add work</button>
     <div id="worksList"></div>
  </div>

  <div class="border">&nbsp</div>
  <div class="formIt"><label> total persons quantity <input type="number" name="personsQuantity" value="1"
           required></label></div>
  <div class="formIt"><label> total sum of working days <input type="number" name="totalSumOfWorkingDays" 
           value="0" required readonly></label></div>
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
  <legend>Work</legend>
  <div class="work">
     <div class="formIt"><label>work name<input type="text" name="name" class="workName"></label></div>
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
  <div class="formIt"><label> persons quantity <input type="number" name="personsQuantity" value="1" required></label></div>
  <div class="formIt"><label> money of the day <input type="number" name="moneyOfTheDay" step="50" value="400" required></label></div>
  <div class="materials divOnBtn">
    <button type="button" class="addMaterial">add material</button>
    <div class="materialsItem"></div>
  </div>
  <div class="formIt"><label> staff costs <input type="number" name="staffCosts" placeholder="0" readonly></label></div>
  <div class="formIt"><label>materials sum price: <input type="number" name="materialsSumPrice" placeholder="0" readonly=""></label></div>
  <div class="formIt"><label> sum <input type="number" name="sum" placeholder="0" readonly=""></label></div>
  <div class="delete"></div>
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
  form: `<form id="fullForm" method="POST" enctype="multipart/form-data">
  <div class="toBeCompleted">
    <div class="workspaceForm">
    </div>
  </div>
  <div class="summary">
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
        <input type="button" value="edit" id="edit">
    </div>
  </div>
  </form>`
}; 