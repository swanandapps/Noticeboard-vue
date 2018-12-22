<template>
   <div>
<h1 style="text-align:center;margin-top:2%">Create a Card</h1>
<div class="line"></div>
          <el-col :span="24"><div class="grid-content bg-purple-dark"></div>


        <form id="addprodform">
          
    <v-text-field
      v-model="card.cardholder"
    hint
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="card.tasktitle"

      label="Title"
      required
      @input="$v.price.$touch()"
      @blur="$v.price.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="card.deadline"
      :error-messages="nameErrors"

      label="Deadline"
      required

    ></v-text-field>
    <v-text-field
      v-model="card.projectname"
      :error-messages="nameErrors"

      label="Project Name"
      required

    ></v-text-field>
      

    <v-text-field 
      v-model="card.groupid"
      :error-messages="nameErrors"

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

<!--
<h1 style="text-align:center;margin-top:5%">Update Product Dispatch Date</h1>
<div class="line"></div>
  <form  id="dispatchform">

 <v-text-field id="inputdispatch"
      v-model="dispatchdate"
    hint
      label="Dispatch Date"
      required

    ></v-text-field>
    <v-btn @click="submitdate"> Update Date</v-btn>

  </form>
<div class="line"></div>
-->
 </el-col>





   </div>
</template>
<script>
import db from "../components/firebaseinit.js";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  data: () => ({
    card: {
      tasktitle: "",
      cardholder: "",
      deadline: "",
      description: "",
      groupid: "",

      projectname: ""
    }
  }),

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
      console.log(this);
      const carddata = {
        cardholder: this.card.cardholder,
        deadline: this.card.deadline,
        groupid: this.card.groupid,
        description: this.card.description,
        projectname: this.card.projectname,

        tasktitle: this.card.tasktitle
      };

      db.collection("Card")
        .add({
          cardholder: this.card.cardholder,
          deadline: this.card.deadline,
          groupid: this.card.groupid,
          description: this.card.description,
          projectname: this.card.projectname,

          tasktitle: this.card.tasktitle
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },

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
    console.log(carddata);
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
