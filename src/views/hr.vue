<template>
 <div style="    text-align: -webkit-center;
   
">
        
 
<el-form style=" margin-top: 2%;width:50%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
  <el-form-item label="Employee name" prop="name">
    <el-input v-validate="'required|email'" type="text" v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="Employee Department" prop="department">
    <el-select v-model="ruleForm.department" placeholder="Select Department">
      <el-option label="Development" value="development"></el-option>
      <el-option label="Human Resource Management" value="hr"></el-option>
        <el-option label="Marketing" value="marketing"></el-option>
      <el-option label="Accounting and Finance" value="accounting"></el-option>
    </el-select>
  </el-form-item>

   <el-form-item label="Employee Sub- Department" prop="sub-dept">
    <el-checkbox-group v-model="ruleForm.subdept">
      <el-checkbox label="Frontend" name="type"></el-checkbox>
      <el-checkbox label="Backend" name="type"></el-checkbox>
      <el-checkbox label="Business" name="type"></el-checkbox>
      <el-checkbox label="Testing" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  
  <el-form-item label="Allocate Employee id" required>
   <el-input v-model="ruleForm.empid">
       </el-input>
       </el-form-item>
       <el-form-item label="Image" required>
   <el-input v-model="ruleForm.image">
       </el-input>
       </el-form-item>
           <el-form-item label="Profile" required>
   <el-input v-model="ruleForm.profile">
       </el-input>
       </el-form-item>

<!--  <el-form-item label="Instant delivery" prop="delivery">
    <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
  </el-form-item>
  -->

  
  <!--<el-form-item label="Resources" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="Sponsorship"></el-radio>
      <el-radio label="Venue"></el-radio>
    </el-radio-group>
  </el-form-item>
  -->
  <el-form-item label="Employee Details" prop="desc">
    <el-input type="textarea" v-model="ruleForm.details"></el-input>
  </el-form-item>
 <el-button @click="submitemp()">Submit</el-button>
</el-form>
        
    


    </div>
</template>

<script>
import db from "../components/firebaseinit.js";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        department: "",
        subdept: [],
        empid: "",

        details: "",
        doj: "",
        image: "",
        profile: ""
      }
    };
  },

  methods: {
    submitemp: function() {
      console.log(this.ruleForm);
      var date = new Date();

      var firestore_date = db.app.firebase_.firestore.Timestamp.fromDate(
        date
      ).toDate();

      this.doj = firestore_date;

      db.collection("Employees")
        .add({
          name: this.ruleForm.name,
          department: this.ruleForm.department,
          subdept: this.ruleForm.subdept,
          doj: this.doj,
          id: this.ruleForm.empid,
          image: this.ruleForm.image,
          profile: this.ruleForm.profile,
          details: this.ruleForm.details,
          cards_created: 0
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>