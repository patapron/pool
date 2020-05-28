<template>
  <v-container fluid>
    <v-row :justify="justify" class="mt-10">
      <v-icon x-large>mdi-pool</v-icon>
    </v-row>
    <v-row :align="alignment" :justify="justify" style="height: 300px;">
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-text-field v-model="formData.user" :rules="numberRules" label="Usuario" required></v-text-field>
        <v-text-field
          v-model="formData.pass"
          :rules="numberRules"
          type="pass"
          label="Clave"
          required
        ></v-text-field>
        <v-row :justify="justify" style="height: 300px;">
          <v-btn :disabled="!valid" color="success" @click="login">Entrar</v-btn>
        </v-row>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  mounted() {
    // Get a reference to the database service
    var database = firebase.database();
  },
  data: () => ({
    valid: true,
    lazy: false,
    alignmentsAvailable: ["start", "center", "end", "baseline", "stretch"],
    alignment: "center",
    justifyAvailable: [
      "start",
      "center",
      "end",
      "space-around",
      "space-between"
    ],
    justify: "center",
    numberRules: [v => !!v || "Incorrecto"],
    formData: []
  }),

  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.formData.user, this.formData.pass)
        .then(
          user => {
            console.log("user ", user);
            this.$router.push({
              name: "Setup",
              params: { user: this.formData.user }
            });
          },
          error => {
            console.log("error ", error);
            this.formData.user = "";
            this.formData.pass = "";
            this.valid = false;
          }
        )
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    }
  }
};
</script>

<style scoped>
</style>