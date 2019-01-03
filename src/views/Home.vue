<template>

<div style="    margin-top: -15px;">

<el-row id="navbar" >
  <el-col  style="width:35%"><div class="grid-content bg-purple"><span id="nbtext"><b > NoticeBoard - </b> {{id}}</span> <br> <span id="nbtext2">Designed and Developed by Swanand</span> </div></el-col>
  <el-col style="width:45%" >

<input type="search" v-model="searchquery" name="Search" id="inputsearch">
<v-icon @click="searchcard()" id="searchicon">search</v-icon>

</el-col>
  <el-col style="width:20%">
    <div class="grid-content bg-purple">
      
      <v-icon @click="createcard()" id="createicon">create </v-icon>
     <!-- <img style="" :src="this.$store.state.current_employee[0].image"></img>-->
      </div>
      </el-col>
</el-row>

 <el-row id="products" row style="margin-top:-2%">
 
  
    <el-col  id="store-col" :span="6" v-for="(card,index) in department_cards" :key="index"   >
     
       <el-row>

         <el-col :span="18">
    
      <el-progress v-if="card.card_completion<100" color="green" style="margin-left:6%" :percentage="card.card_completion"></el-progress>
<el-progress  v-if="card.card_completion>=100" color="green" style="margin-left:6%;    margin-left: 6%;
    width: 123%;
  
    margin-bottom: 2%;" :percentage="card.card_completion" status="success"></el-progress>
<el-progress  v-if="Math.ceil(((card.deadline*24*60*60 +  card.timestamp.seconds) - current_timestamp)/86400) <= 0 && card.card_completion<100 "  style="margin-left:6%;    margin-left: 6%;
    width: 123%;
  
    margin-bottom: 2%;" :percentage="card.card_completion" status="exception"></el-progress>


    </el-col>
    <el-col :span="6" width="30">
    <v-icon v-if="card.card_completion<100" @click="addprogress(card,index)" style="margin-bottom:4%; cursor:pointer">add_box</v-icon>
    </el-col>


  
    
    
    </el-row>
        
      
       
      <v-card style="border: solid white 2px"   @click="showemployee(card,index)" id="card">
        <router-link to="/dashboard" >
        <v-img  style="left: 1%;
    
    margin-top: 1%;"
          :src="card.cardholder_image"
          height="220px"
          width="98%"
        >
        </v-img>
         </router-link>

        <v-card-title primary-title>
        
            <div class="title"><b>{{card.tasktitle}}</b></div>
            
            
          
        </v-card-title>
        <div  id="desc">{{card.description}}</div>



       <div class="actions">
        
        <v-icon @click="remove(card,index);">delete</v-icon>
 
  <!-- {{(((card.deadline*24*60*60 +  card.timestamp.seconds) - current_timestamp)/86400)*24}}
        
             hii -{{ z= (( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60)}}
       
       {{z}}-->
        
       <div v-if="Math.ceil(((card.deadline*24*60*60 +  card.timestamp.seconds) - current_timestamp)/86400) > 1" class="deadline"> <span style="color:rgb(248, 148, 148)"> Deadline - </span>{{Math.ceil(((card.deadline*24*60*60 +  card.timestamp.seconds) - current_timestamp)/86400)}} Days Left</div>
<div style="font-size: 15px;
    font-family: 'Raleway', sans-serif" v-if="Math.ceil(((card.deadline*24*60*60 +  card.timestamp.seconds) - current_timestamp)/86400) == 1 && card.card_completion<100" class="deadline"> <span style="    font-weight: 900;
    color: rgb(248, 148, 148);"> Deadline - </span>{{((((card.deadline*24*60*60 +  card.timestamp.seconds) - current_timestamp)/86000)*24).toString().slice(0,3)}} Hours Left</div>         

<div v-if="Math.ceil(((card.deadline*24*60*60 +  card.timestamp.seconds) - current_timestamp)/86400) <= 0 && card.card_completion<100" class="deadline"> <span style="color:rgb(248, 148, 148)">Card Expired </span></div>





















<div v-if="card.card_completion==100" class="deadline"> <span style="color:green;margin-left:3%"> Task Completed </span>  </div>
       </div> 

      
      <!-- Different Deadline progress bar depending upon percentage like 25 50 75 and 100


     <el-tooltip class="item" effect="dark" content="Time Remaining" placement="top">
  

       <el-progress color="green"  style="margin-top:2%;color: green;" v-if=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60)) > 75 && Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))<100 "   :percentage=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))" >
       
       </el-progress>
       
    </el-tooltip>

   <el-tooltip class="item" effect="dark" content="Time Remaining" placement="top">
  

       <el-progress color="yellow"  style="margin-top:2%;color: green;" v-if="Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60)) > 50 && Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))<75 "   :percentage=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))" >
       
       </el-progress>
       
    </el-tooltip>

     <el-tooltip class="item" effect="dark" content="Time Remaining" placement="top">
  

       <el-progress color="orange"  style="margin-top:2%;color: green;" v-if=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60)) > 25 && Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))<50 "   :percentage=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))" >
       
       </el-progress>
       
    </el-tooltip>

     <el-tooltip class="item" effect="dark" content="Time Remaining" placement="top">
  

       <el-progress color="red"  style="margin-top:2%;color: green;" v-if=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60)) > 0 && Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))< 25  "   :percentage=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))" >
       
       </el-progress>
       
    </el-tooltip>
-->

<div>
 
</div>

  
      </v-card>
  <el-row>  
<el-col style="margin-left:6%" :span="22">
 <el-tooltip class="item" effect="dark" content="Time Remaining" placement="top">
  

       <el-progress color="#6fc52d"  style="margin-top:2%;color: green;" v-if=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60)) > 75 && Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))<=100 && card.card_completion !=100 "   :percentage=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))" >
       
       </el-progress>
       1
    </el-tooltip>

   <el-tooltip class="item" effect="dark" content="Time Remaining" placement="top">
  

       <el-progress color="yellow"  style="margin-top:2%;color: green;" v-if=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60)) > 50 && Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))<75  && card.card_completion!=100 "   :percentage=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))" >
       
       </el-progress>
       
    </el-tooltip>

     <el-tooltip class="item" effect="dark" content="Time Remaining" placement="top">
  

       <el-progress color="orange"  style="margin-top:2%;color: green;" v-if=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60)) > 25 && Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))<50  && card.card_completion!=100 "   :percentage=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))" >
       
       </el-progress>
       
    </el-tooltip>

     <el-tooltip class="item" effect="dark" content="Time Remaining" placement="top">
  

       <el-progress color="red"  style="margin-top:2%;color: green;" v-if=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60)) > 0 && Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))< 25  && card.card_completion !=100 "   :percentage=" Math.round(100 -(( current_timestamp - card.timestamp.seconds)*100)/(card.deadline*24*60*60))" >
       
       </el-progress>
       
    </el-tooltip>

 </el-col>
</el-row>
    </el-col>
  </el-row>


  
</div>

</template>

<script>
import axios from "axios";
import db from "../components/firebaseinit.js";
import { mapState } from "vuex";
export default {
  name: "home",
  data() {
    return {
      bind:'false',
      show: false,
      cards: [],
      flag: 0,
      card_id: "",
      current_timestamp: "",
      x: 0,
      cards_length:0,
      live_length:0,
      id
     
    };

    searchquery: "";
  },

 
  
  computed: {
    
    
    
    ...mapState(["current_emp_id","current_dep_id", "clicked_card_details","live_cards","expired_cards","department_cards","current_employee"])
  },
  methods: {

    addprogress: function(card,index){

 let x = card.id
      card.card_completion+=25
       
       

   


    
     var update_progress = db
        .collection("Card")
        .doc(x);
      //console.log(tempthis.count);

      return update_progress
        .update({
          card_completion:  card.card_completion
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
       

    },
    showemployee: function(card, index) {
   

       
      this.$store.state.clicked_card_details = [];
      this.$store.state.clicked_card_details.push(card);
      console.log(this.$store.state.clicked_card_details);
    },
    searchcard: function() {
      this.$store.state.department_cards = this.$store.state.department_cards.filter(
        cards =>
          cards.cardholder.toLowerCase() == this.searchquery.toLowerCase()
      );
      if (this.$store.state.department_cards.length == 0) {
        this.$swal({
          type: "error",
          title: "Card Not Found",
          text: "Please Type Full Name of Employee e.g. John Doe",
          preConfirm: () => {
            this.$router.go(0);
          }
        });
      }
    },
    createcard: function() {
      
      var tempthis = this;
      tempthis.flag = 0;

   
       
        
      
     /*  
       else if( tempthis.$store.state.current_emp_id == ID.value ){



        tempthis.$store.state.department_cards.forEach(function(element){

            if(element.department==tempthis.$store.state.current_employee[0].department)
            
            {


                  tempthis.$router.push("createcard");


                      }

                    

                        else {
              tempthis.$swal({
                type: "error",
                title: "Oops...",
                text: "This Employee ID Doesnt Exist!"
              });
            }     
            
        })
      })
      }, */


//Find if Employee Exist or Not in Database
   console.log(tempthis.id)
       this.$swal({
        title: "Enter Employee ID",
        input: "text",
        allowEnterKey: true
      }).then(function(ID) {
        
        db.collection("Employees").where("id", "==", ID.value)
          .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
         

    if (doc.data().department==tempthis.id) {
        console.log("Document data:", doc.data().department);
         localStorage.setItem('current_emp_id', ID.value)
        tempthis.$store.state.current_emp_id = ID.value;
        tempthis.$router.push("createcard");
        console.log(tempthis.$store.state.current_emp_id);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
         
              tempthis.$swal({
                type: "error",
                title: "Sorry",
                text: "You are not Allowed to Create Card in this Department!"
              });
            
    }
})
          
          }); 
        
      });
    },
    

    showcard: function() {
      console.log(this.$store.state.live_cards);
    },
    remove: function(card, index) {
      this.card_id = card.id;
      let tempthis = this;
      console.log(card.id);

      this.$store.state.department_cards.splice(index, 1);

      db.collection("Card")
        .doc(tempthis.card_id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    
    }
  },

  created() {
    this.id=localStorage.getItem('dep_id')
console.log(this.id)
    this.$store.state.department_cards= []
      
    this.$store.state.live_cards =[]
    this.$store.state.expired_cards=[]    
   
    
    var date = new Date();
    this.current_timestamp = db.app.firebase_.firestore.Timestamp.fromDate(
      date
    ).seconds;

    console.log(this.$data.current_timestamp);
    console.log("home view created");
    let tempthis = this;

    //console.log(this.$store.state.current_dep_id);
db.collection("Card")
          .where("department", "==", tempthis.id)
          .get()
          .then(function(DocumentSnapshot) {
            let count=0
            DocumentSnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              {
                var data = doc.data();
               // console.log(data);
                console.log(doc.id)
               // tempthis.flag = 1;
                // tempthis.$router.push("home");

                 tempthis.$store.state.department_cards.push(data)
                tempthis.$store.state.department_cards[count].id = doc.id

                count++
                
              }

             
            })
             console.log(tempthis.$store.state.department_cards)
          })


,

    db.collection("Card")
      .get()
      .then(function(DocumentSnapshot) {
        let count = 0;
        DocumentSnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          var data = doc.data();

          tempthis.$store.state.live_cards.push(data)
          tempthis.$store.state.live_cards[count].id = doc.id;

          count++;
        });
       
      //Finding Out Expired Cards
         tempthis.$store.state.live_cards.forEach(element => {
           
         let a= element.deadline*24*60*60

          let b= element.timestamp.seconds

          let c= tempthis.current_timestamp

           if(a +b < c){

            // console.log(element)

             tempthis.$store.state.expired_cards.push(element)

           //  console.log("expired" ,  tempthis.$store.state.expired_cards)

           }
         });
      });


    
  }
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway|Roboto");
@import url("https://unpkg.com/element-ui/lib/theme-chalk/index.css");


.deadline{
      align-self: center;
}
#products {
  width: 100%;
}
#store-col {
  width: 34%;
  height: 466px;
}
.border{

  border: red 2px solid
}
.title {
  text-align: left;
  font-family: "Roboto", sans-serif;
}
.actions {
  display: flex;
  margin-top: 1%;
  margin-left: 5%;
  height:25px
}
.line{

  width:100%;
  height:7px;
 border-top: 1px solid rgba(0,0,0,.05);
}
#desc {
  height: 90px;
  text-align: left;
  padding-left: 6%;
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: black;
}
.deadline {
  margin-left: 25%;
}
#card {
  width: 85%;
  margin-left: 7%;
 box-shadow: 3px 3px 5px 6px rgb(218, 214, 214);
  height: 440px;
  padding: 0px;
  
}

#navbar {
  width: 100%;
  display: inline-flex;
  background: linear-gradient(40deg, #ffd86f, #fc6262);
  padding: 0%;
  margin: 0%;
  height: 70px;
}

#navbar .el-col {
  margin-top: 1%;
}
a {
  text-decoration: none;
}

#inputsearch {
  background-color: #fcebcd;
  border-style: none;

  border-radius: 0%;

  width: 70%;
  height: 25px;
  margin-left: -20%;
  margin-top: 1%;
}

#searchicon {
  position: absolute;
  background: linear-gradient(80deg, #ffd86f, #fc6262);
  border-color: #ffee58;
  border-style: none;
  cursor: pointer;
  margin-top: 0.5%;
}

#createicon {
  cursor: pointer;
}
#nbtext {
  margin-left: -35%;
  font-size: 150%;
}
#nbtext2 {
  margin-left: -36%;
  font-size: 80%;
}

@media screen and (max-width: 480px) {
  #store-col {
    width: 100%;
    height: 466px;
    margin-top: 15%;
  }
  #products {
    width: 100%;

    margin-left: -1%;
  }
}

@media screen and (min-width: 481px) and (max-width: 720px) {
  #store-col {
    width: 50%;
    height: 466px;
    margin-top: 10%;
  }
}

@media screen and (min-width: 721px) and (max-width: 1024px) {
  #store-col {
    width: 33%;
    height: 466px;
    margin-top: 6%;
  }
}

@media screen and (min-width: 1025px) and (max-width: 1400px) {
  #store-col {
    width: 25%;
    margin-top:5%
  }
  .deadline{

    margin-left:34%
  }
}
</style>
