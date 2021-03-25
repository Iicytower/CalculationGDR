<template>
  <fieldset class="p5">
    <legend>Work</legend>
    <div class="work">
      <div class="formIt">
        <label
          >work name<input type="text" name="name" class="workName"
        /></label>
      </div>
      <!-- <div class="materials divOnBtn">
        <button type="button" class="addMaterial">add material</button>
        <div class="materialsItem"></div>
      </div> -->
      <div class="activities divOnBtn">
        <button type="button" class="addActivity">add activity</button>
        <div class="activitiesItem"></div>
      </div>
      <div class="formIt">
        <label
          >sum of working days:
          <input type="text" name="sumOfWorkingDays" placeholder="0" readonly
        /></label>
      </div>
    </div>
  </fieldset>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
