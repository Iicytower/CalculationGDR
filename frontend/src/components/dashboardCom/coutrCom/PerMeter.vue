<template>
  <div>
    <h3>perMeter</h3>
    <div class="el perMeter">
      <div class="materials divOnBtn">
        <button type="button" class="addMaterial">add material</button>
        <div class="materialsItem"></div>
      </div>

      <div class="difficults divOnBtn">
        <button type="button" class="addDifficult">add difficult</button>
        <div class="difficultsItem"></div>
      </div>
      <div class="numbersOfMeters formIt">
        <label
          >number of meters:
          <input type="number" name="numbersOfMeters" value="200" step="10"
        /></label>
      </div>
      <div class="pricePerMeter formIt">
        <label
          >price per meter:
          <input type="number" name="pricePerMeter" value="100" step="10"
        /></label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
