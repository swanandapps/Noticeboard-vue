<template>
   <div>

     <router-link to="/projectmanager"><v-btn @click="welcome_manager()">
        Project Manager
      </v-btn>
      </router-link> 
         <v-btn @click="welcome_members()">
           Project Team Members
         </v-btn>

         <router-link to="/hr" >
           <v-btn @click="welcome_hr()">
           HR Executive
         </v-btn>
         </router-link>
         
      

   </div>
</template>
<script>
import db from "../components/firebaseinit.js";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
  data: () => ({
    card: {}
  }),
  computed: {
    ...mapState([
      "current_dep_id",
      "current_employee",
      "current_doc_id",
      "department_cards"
    ])
  },

  methods: {
    welcome_hr: function() {},
    welcome_members: function() {
      console.log(this);

      this.$store.state.department_cards = [];

      let tempthis = this;

      this.$swal({
        title: "Enter Department ID",
        input: "text",
        allowEnterKey: true
      }).then(function(ID) {
        tempthis.$store.state.current_dep_id = ID.value;
        console.log(tempthis.$store.state.current_dep_id);
        localStorage.setItem("dep_id", tempthis.$store.state.current_dep_id);
        //console.log(localStorage)

        db.collection("Card")
          .where("department", "==", ID.value)
          .get()
          .then(function(DocumentSnapshot) {
            DocumentSnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              {
                var data = doc.data();
                console.log(data);
                tempthis.flag = 1;
                tempthis.$router.push("home");

                //  tempthis.$store.state.department_cards.push(data)
              }

              console.log(tempthis.$store.state.department_cards);
            });
            if (tempthis.flag == 0) {
              tempthis.$swal({
                type: "error",
                title: "Oops...",
                text: "This Employee ID Doesnt Exist!"
              });
            }
          });
      });
    }
  },

  created() {
    //Get Current Employee data from database using employee id accepted on home.vue
  }
};
</script>


<style>
a {
  text-decoration: none;
}
</style>