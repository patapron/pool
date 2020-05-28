<template>
  <v-container fluid>
    <v-row :align="alignment" :justify="justify">
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-text-field
          v-model="formData.name"
          :rules="numberRules"
          label="Nombre de la lista"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.total"
          :rules="numberRules"
          min="0"
          step="1"
          type="number"
          label="Numbero de vecinos"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.days"
          :rules="numberRules"
          min="0"
          step="1"
          type="number"
          label="Días en total"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.hours"
          :rules="numberRules"
          min="0"
          step="1"
          type="number"
          label="Horas por día"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.turn"
          :rules="numberRules"
          min="0"
          step="1"
          type="number"
          label="Horas por turno"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.number"
          :rules="numberRules"
          min="0"
          step="1"
          type="number"
          label="Vecinos por turno"
          required
        ></v-text-field>
        <v-row :justify="justify">
          <v-btn :disabled="!valid" color="success" @click="calculate">Calcular</v-btn>
        </v-row>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    checkbox: false,
    lazy: false,
    alignmentsAvailable: ["start", "center", "end", "baseline", "stretch"],
    alignment: "center",
    dense: false,
    justifyAvailable: [
      "start",
      "center",
      "end",
      "space-around",
      "space-between"
    ],
    justify: "center",
    numberRules: [v => !!v || "Inserta un número"],
    formData: []
  }),

  methods: {
    calculate() {
      let turns = this.formData.hours / this.formData.turn;
      let neighbour = [];
      for (let n = 0; n < this.formData.total; n++) {
        neighbour.push({ id: n + 1, name: "Vecino " + (n + 1) });
      }
      let totalList = [];
      let index = 0;
      for (let i = 0; i < this.formData.total; i++) {
        let day = {};
        day.name = "Día " + (i + 1);
        day.turnList = [];
        for (let y = 0; y < turns; y++) {
          let turn = {};
          turn.name = "Turno " + (y + 1);
          turn.neighbourList = [];
          for (let v = 0; v < this.formData.number; v++) {
            if (neighbour[index]) {
              turn.neighbourList.push(neighbour[index]);
              index++;
            } else {
              index = 0;
              turn.neighbourList.push(neighbour[index]);
              index++;
            }
          }
          day.turnList.push(turn);
        }
        totalList.push(day);
      }
      console.log("lista ", totalList);
      this.$router.push({
        name: "List",
        params: { list: totalList, user: this.formData.name }
      });
    }
  }
};
</script>

<style>
</style>