<template>
    <div>


<h1>{{this.current_employee}}</h1>
<h1>{{this.$store.state.clicked_card_details[0]}}</h1>
  
  <div>
    <img :src=this.current_employee[0].image alt="">
  </div>
  
      
<el-row id="cards_row" >
  
  <el-col :span="5"  >
  
            <v-card color="green" class="white--text">
              <v-layout row style="height:100px">
                <v-flex style="width:100%">
                  <v-card-title primary-title>
                    <div>
                      <div> <v-icon>picture_in_picture</v-icon> Cards Created </div>
                     {{this.current_employee[0].cards_created}}
                    </div>
                  </v-card-title>
                </v-flex>
           

    
              </v-layout>
                    <div class="headline">

           
           </div>
             
            
            </v-card>
    </el-col> 
     <el-col :span="5">
   
            
            <v-card color="green" class="white--text">
              <v-layout row style="height:100px">
                <v-flex style="width:100%">
                  <v-card-title primary-title>
                    <div>
                      <div> <v-icon>perm_identity</v-icon>Profile</div>
                     
                    </div>
                  </v-card-title>
                </v-flex>
           

    
              </v-layout>
                    <div class="headline">

            
           </div>
             
            
            </v-card>
    </el-col> 

 <el-col :span="5">
   
           
            <v-card color="green" class="white--text">
              <v-layout row style="height:100px">
                <v-flex style="width:100%">
                  <v-card-title primary-title>
                    <div>
                      <div> <v-icon>date_range</v-icon>Date of Joining </div>
                     
                    </div>
                  </v-card-title>
                </v-flex>
           

    
              </v-layout>
                    <div class="headline">

          
           </div>
             
            
            </v-card>
    </el-col> 

 <el-col :span="5">
   
           
            <v-card color="green" class="white--text">
              <v-layout row style="height:100px">
                <v-flex style="width:100%">
                  <v-card-title primary-title>
                    <div>
                      <div> <v-icon></v-icon> Current Project </div>
                     
                    </div>
                  </v-card-title>
                </v-flex>
           

    
              </v-layout>
                    <div class="headline">

           </div>
             
            
            </v-card>    </el-col> 

</el-row>


    </div>
</template>

<script>
import { mapState } from "vuex";
import db from "../components/firebaseinit.js";
export default {
  data() {
    return {
      current_employee: []
    };
  },

  computed: {
    ...mapState(["clicked_card_details"])
  },

  created() {
    console.log(this.$store.state.clicked_card_details);
    let tempthis = this;
    db.collection("Employees")
      .where(
        "name",
        "==",
        tempthis.$store.state.clicked_card_details[0].cardholder
      )
      .get()
      .then(function(DocumentSnapshot) {
        DocumentSnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          {
            var data = doc.data();
            tempthis.current_employee.push(data);
            console.log(tempthis.current_employee);
          }
        });
      });
  }
};
</script>

<style>
#cards_row {
  margin-top: 5%;
}
#cards_row .el-col {
  margin-left: 3%;
}
</style>