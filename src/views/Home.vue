<template>

<div>

<el-row id="navbar" >
  <el-col  style="width:35%"><div class="grid-content bg-purple"><span id="nbtext"><b >NoticeBoard</b></span> <br> <span id="nbtext2">Designed and Developed by Swanand</span> </div></el-col>
  <el-col style="width:45%" >

<input type="search" v-model="searchquery" name="Search" id="inputsearch">
<v-icon @click="searchcard()" id="searchicon">search</v-icon>

</el-col>
  <el-col style="width:20%">
    <div class="grid-content bg-purple">
      
      <v-icon @click="createcard()" id="createicon">create</v-icon>
      </div>
      </el-col>
</el-row>

 <el-row id="products" row style="margin-top:3%">
    <el-col id="store-col" :span="6" v-for="(card,index) in cards" :key="index"   >
     
      <v-card @click="showemployee(card,index)" id="card">
        <router-link to="/dashboard" >
        <v-img st
          :src="card.cardholder_image"
          height="213px"
        >
        </v-img>
         </router-link>

        <v-card-title primary-title>
        
            <div class="title"><b>{{card.tasktitle}}</b></div>
            
            
          
        </v-card-title>
        <div  id="desc">{{card.description}}</div>

       <div class="actions">
        
        <v-icon @click="remove(card,index);">delete</v-icon>
         
          <div class="deadline"> <span style="color:rgb(248, 148, 148)"> Deadline</span> - {{card.deadline}} Days</div>

       </div>
      </v-card>
     
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
      show: false,
      cards: [],
      flag: 0,
      card_id: ""
    };

    searchquery: "";
  },
  computed: {
    ...mapState(["current_emp_id", "clicked_card_details"])
  },
  methods: {
    showemployee: function(card, index) {
      this.$store.state.clicked_card_details = [];
      this.$store.state.clicked_card_details.push(this.cards[index]);
      //console.log(this.$store.state.clicked_card_details);
    },
    searchcard: function() {
      this.cards = this.cards.filter(
        cards =>
          cards.cardholder.toLowerCase() == this.searchquery.toLowerCase()
      );
      if (this.cards.length == 0) {
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

      this.$swal({
        title: "Enter Employee ID",
        input: "text",
        allowEnterKey: true
      }).then(function(ID) {
        tempthis.$store.state.current_emp_id = ID.value;
        console.log(tempthis.$store.state.current_emp_id);

        db.collection("Employees")
          .where("id", "==", ID.value)
          .get()
          .then(function(DocumentSnapshot) {
            DocumentSnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              {
                var data = doc.data();
                console.log(data);
                tempthis.flag = 1;
                tempthis.$router.push("createcard");
              }
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
    },

    showcard: function() {
      console.log(this.cards);
    },
    remove: function(card, index) {
      this.card_id = card.id;
      let tempthis = this;
      console.log(tempthis.card_id);

      this.cards.splice(index, 1);

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
    console.log("home view created");
    let tempthis = this;

    //console.log(this.$store.state.current_emp_id);
    console.log(this.cards);

    db.collection("Card")
      .get()
      .then(function(DocumentSnapshot) {
        let count = 0;
        DocumentSnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          var data = doc.data();

          tempthis.cards.push(data);
          tempthis.cards[count].id = doc.id;

          count++;
        });
        console.log(cards);
      });
  }
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway|Roboto");
@import url("https://unpkg.com/element-ui/lib/theme-chalk/index.css");
#products {
  width: 100%;
}
#store-col {
  width: 34%;
  height: 466px;
}
.title {
  text-align: left;
  font-family: "Roboto", sans-serif;
}
.actions {
  display: flex;
  margin-top: 1%;
  margin-left: 5%;
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
  box-shadow: 0 0 8px 0px black;
  height: 400px;
  padding: 0px;
}
#card:hover {
  transform: scale(1.05);
  transition: 0.2s ease-in;
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
  margin-left: -50%;
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
    margin-top: 10%;
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
    margin-top: 8%;
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
  }
}
</style>
