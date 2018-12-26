<template>
   <div>
<h1 style="text-align:center;margin-top:2%"> Welcome  {{this.$store.state.current_employee[0].name}}, Create a Card here</h1>
<div class="line"></div>
          <el-col :span="24"><div class="grid-content bg-purple-dark"></div>


        <form id="addprodform">
          
 

    <v-text-field
      v-model="card.tasktitle"

      label="Title"
      required
      @input="$v.price.$touch()"
      @blur="$v.price.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="card.deadline"
      

      label="Deadline"
      required

    ></v-text-field>
    <v-text-field
      v-model="card.projectname"
      

      label="Project Name"
      required

    ></v-text-field>
      

    <v-text-field 
      v-model="card.groupid"
      

      label="Group ID"
      required

    ></v-text-field>


     <v-flex xs8 style="width:150%">
        <v-text-field
        v-model="card.description"
          name="input-7-1"
          label="Task Description"
          multi-line
          required
        ></v-text-field>

      </v-flex>

    <v-btn @click="submit
    ">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>


 </el-col>





   </div>
</template>
<script>
import db from "../components/firebaseinit.js";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
  data: () => ({
    card: {
      tasktitle: "",
      cardholder: "",
      deadline: "",
      description: "",
      groupid: "",

      projectname: "",
      timestamp: ""
    },
    count: 1
  }),
  computed: {
    ...mapState(["current_emp_id", "current_employee", "current_doc_id"])
  },
  mixins: [validationMixin],

  validations: {
    name: { required },
    price: { required },
    image: { required },
    description: { required },
    type: { required }
  },

  methods: {
    submit() {
      //Get Card Creation Timestamp
      console.log(this);
      var date = new Date();

      var firestore_date = db.app.firebase_.firestore.Timestamp.fromDate(
        date
      ).toDate();

      this.timestamp = firestore_date;

      //temporary this due to scope issues
      let tempthis = this;

      //Adding the Card to database
      db.collection("Card")
        .add({
          cardholder: this.$store.state.current_employee[0].name,
          deadline: this.card.deadline,
          groupid: this.card.groupid,
          description: this.card.description,
          projectname: this.card.projectname,

          tasktitle: this.card.tasktitle,
          cardholder_image: this.$store.state.current_employee[0].image,
          timestamp: tempthis.timestamp
        })
        .then(function() {
          //Counting Number of Cards CREATED by employee

          db.collection("Employees")
            .where("id", "==", tempthis.$store.state.current_emp_id)
            .get()
            .then(function(DocumentSnapshot) {
              DocumentSnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                {
                  var data = doc.data();
                }
                tempthis.count = data.cards_created + 1;

                console.log(tempthis.count);
              });

              tempthis.$swal("Success!", "Card Added to Dashboard!", "success");
            });

          console.log("Document successfully written!");

          var update_cards = db
            .collection("Employees")
            .doc(tempthis.$store.state.current_doc_id);

          return update_cards.update({
            cards_created: tempthis.count
          });
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },

    // Clear form data
    clear() {
      this.$v.$reset();
      this.name = "";
      this.price = "";
      this.description = "";
      this.image = "";
      this.type = "";
      this.select = null;
      this.checkbox = false;
    }
  },

  created() {
    //Get Current Employee data from database using employee id accepted on home.vue
    this.$store.state.current_employee = [];
    console.log(this);
    let tempthis = this;
    db.collection("Employees")
      .where("id", "==", tempthis.$store.state.current_emp_id)
      .get()
      .then(function(DocumentSnapshot) {
        DocumentSnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          {
            var data = doc.data();

            console.log(data);
            tempthis.$store.state.current_doc_id = doc.id;

            tempthis.$store.state.current_employee.push(data);
          }
        });
      });
  }
};
</script>
<style >
#dispatchform {
  margin-left: 30%;
  margin-top: 5%;
  width: 40%;
  margin-bottom: 5%;
}
#orders-col {
  display: -webkit-inline-box;
}
#boxcard {
  margin-left: 15%;
  margin-top: 8%;
}
.el-col-8 {
  display: -webkit-inline-box;
}
.el-card box-card {
  width: 30%;
  margin-left: 10%;
}
#addprodform {
  width: 50%;
  margin: 5% 25%;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.line {
  width: 70%;
  height: 47px;
  margin-left: 17%;
  margin-bottom: 5%;
  border-bottom: 1px solid black;
}
</style>
