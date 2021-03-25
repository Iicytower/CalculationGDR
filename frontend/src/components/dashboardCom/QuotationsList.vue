<template>
  <li class="listItem">
    <div class="name">
      <h3>{{ el.name }}</h3>
    </div>
    <div class="dates">
      <div class="dateItem">
        last update: <br />
        {{ getYMD(el.createdAt) }}
      </div>
      <div class="dateItem">
        created at: <br />
        {{ getYMD(el.updatedAt) }}
      </div>
    </div>
    <div class="delBtn">
      <button type="button" class="delete" v-bind:id="el._id">delete</button>
    </div>
  </li>
</template>

<style lang="scss">
@import "../../../scss/variables.scss";

.listItem {
  padding: 5px;
  margin-top: 12px;
  border: $borderPrimary;
  border-radius: $borderRadius;
  display: flex;
  flex-direction: column;
  // cursor: pointer;
  .name {
    text-align: left;
    padding: 2px;
  }
}

.dates {
  display: flex;
  flex-direction: row;
  font-size: 10px;
  justify-content: flex-end;
  .dateItem {
    color: $fontColorSecondary;
    margin: 3px;
  }
}

.delBtn {
  justify-content: flex-end;
  flex-direction: row;
  display: flex;
  button {
    display: block;
    margin: 2px;
    cursor: pointer;
  }
}
</style>

<script>
export default {
  props: ["el"],
  data() {
    return {};
  },
  methods: {
    getYMD(date) {
      const d = new Date(date);
      return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    }
  }
};
</script>
