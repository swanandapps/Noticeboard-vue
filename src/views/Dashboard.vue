<template>
    <div >


 
      
<el-row id="cards_row" >
  
  <el-col :span="5"  >
  
            <v-card color="green" class="white--text">
              <v-layout row style="height:100px">
                <v-flex style="width:100%">
                 
                    <div>
                      <div  style="margin-top:10%" >
                         {{this.current_employee[0].cards_created}}
                         
                      </div>
                      <div style="margin-top:8%;font-size:120%"> Total Cards Created </div>
                     Live Cards :{{live_length}}
                    </div>
               
                </v-flex>
           

    
              </v-layout>
              
            
            </v-card>
    </el-col> 
     <el-col :span="5">
   
            
           <v-card color="green" class="white--text">
              <v-layout row style="height:100px">
                <v-flex style="width:100%">
                 
                    <div>
                      <div  style="margin-top:10%" >
                         {{this.current_employee[0].profile}}
                         
                      </div>
                      <div style="margin-top:8%;font-size:120%">  Profile </div>
                    
                    </div>
               
                </v-flex>
           

    
              </v-layout>
              
            
            </v-card>
    </el-col> 

 <el-col :span="5">
   
           
          <v-card color="green" class="white--text">
              <v-layout row style="height:100px">
                <v-flex style="width:100%">
                 
                    <div>
                      <div  style="margin-top:10%" >
                         {{this.$store.state.clicked_card_details[0].projectname}}
                         
                      </div>
                      <div style="margin-top:8%;font-size:120%">  Current Project </div>
                    
                    </div>
               
                </v-flex>
           

    
              </v-layout>
              
            
            </v-card>
    </el-col> 

 <el-col :span="5">
   
           
            <v-card color="green" class="white--text">
              <v-layout row style="height:100px">
                <v-flex style="width:100%">
                 
                    <div>
                      <div  style="margin-top:10%" >
                         {{this.current_employee[0].doj.toDate().toString()}}
                         
                      </div>
                      <div style="margin-top:8%;font-size:120%"> Date of Joining </div>
                    
                    </div>
               
                </v-flex>
           

    
              </v-layout>
              
            
            </v-card>    </el-col> 

</el-row>

<h3>{{this.current_employee}}</h3>
<h3>{{this.$store.state.clicked_card_details[0]}}</h3>
  
    </div>
</template>

<script>
import { mapState } from "vuex";
import db from "../components/firebaseinit.js";
export default {
  data() {
    return {
      current_employee: [],
      live_length:0
    };
  },

  computed: {
    ...mapState(["clicked_card_details"])
  },

  created() {

     let z = this.$store.state.clicked_card_details[0].cardholder
    console.log(this.$store.state.live_cards)

    var marvelHeroes =  this.$store.state.live_cards.filter(function(card) {
	return  card.cardholder == z;
});

this.live_length =  marvelHeroes.length

console.log(this.live_length)
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
  margin-top: 1%;
}
#cards_row .el-col {
  margin-left: 3%;
}
</style>