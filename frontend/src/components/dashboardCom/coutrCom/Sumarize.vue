<template>
  <div class="summary">
    <div class="mainInfo">
      <div class="el">
        <label
          >name:
          <input
            type="text"
            name="name"
            placeholder="enter the name of quotation"
            require
        /></label>
      </div>

      <div class="el">
        <fieldset>
          <legend>Method</legend>
          <div>
            <label
              ><input
                type="radio"
                value="perDay"
                name="useMethod"
              />perDay</label
            >
          </div>
          <div>
            <label
              ><input
                type="radio"
                value="perMeter"
                name="useMethod"
              />perMeter</label
            >
          </div>
        </fieldset>
      </div>
    </div>
    <div class="totalPrices">
      <div class="el formIt">
        <label
          >total materials sum price:
          <input
            type="text"
            name="totalMaterialsSumPrice"
            placeholder="0"
            readonly
        /></label>
      </div>
      <div class="el formIt">
        <label
          >total work price:
          <input type="text" name="totalWorkPrice" placeholder="0" readonly
        /></label>
      </div>
      <div class="el formIt">
        <label
          >total price netto:
          <input type="text" name="totalPriceNetto" placeholder="0" readonly
        /></label>
      </div>
      <div class="el formIt">
        <label
          >total price brutto:
          <input type="text" name="totalPriceBrutto" placeholder="0" readonly
        /></label>
      </div>
    </div>
    <div class="formButtons">
      <input type="reset" value="Clear form" />
      <input type="button" value="add quotation to database" id="acceptForm" />
      <input type="button" value="summarize" id="summarize" />
      <input type="button" value="edit" id="edit" />
    </div>
  </div>
</template>

<style lang="scss">
.sumarize {
  input {
    margin: 2px;
  }
}
</style>

<script>
export default {
  data() {
    return {};
  }
};
</script>
