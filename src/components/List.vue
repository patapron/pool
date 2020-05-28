<template>
  <v-container fluid>
    <v-row :justify="justify" class="mb-2">
      <v-btn color="success" @click="write">confirmar</v-btn>
      <!-- <v-btn color="success" @click="print">descargar</v-btn> -->
    </v-row>
    <v-card class="mx-auto" raised v-for="day in list" :key="day.name" id="list">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">{{day.name}}</th>
              <th class="text-left">Vecinos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="turn in day.turnList" :key="turn.name">
              <td>{{ turn.name }}</td>
              <td>
                <span v-for="(neighbour, n) in turn.neighbourList" :key="neighbour.name">
                  {{ neighbour.name }}
                  <span v-if="n != turn.neighbourList.length - 1">-</span>
                </span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase";
// import VueHtml2pdf from "vue-html2pdf";
export default {
  mounted() {
    this.list = this.$route.params.list || [];
    this.user = this.$route.params.user || "lista";
    // firebase.auth().currentUser.uid;
  },
  data: () => ({
    list: [],
    alignmentsAvailable: ["start", "center", "end", "baseline", "stretch"],
    alignment: "center",
    justifyAvailable: [
      "start",
      "center",
      "end",
      "space-around",
      "space-between"
    ],
    justify: "center"
  }),
  methods: {
    write() {
      firebase
        .database()
        .ref("users/" + this.user)
        .set(this.list)
        .then(user => console.log("okay", user));
    }
    // print() {
    //   // Choose the element that our invoice is rendered in.
    //   const element = document.getElementById("invoice");
    //   // Choose the element and save the PDF for our user.
    //   VueHtml2pdf()
    //     .from(element)
    //     .save();
    // }
  },
  components: {
    // VueHtml2pdf
  }
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
th {
  background: silver;
  min-width: 80px;
}
</style>