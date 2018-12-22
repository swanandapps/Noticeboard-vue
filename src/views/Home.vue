<template>

<div>

<el-row id="navbar" >
  <el-col  style="width:35%"><div class="grid-content bg-purple"><span id="nbtext"><b >NoticeBoard</b></span> <br> <span id="nbtext2">Designed and Developed by Swanand</span> </div></el-col>
  <el-col style="width:45%" >

<input type="search" name="Search" id="inputsearch">
<v-icon id="searchicon">search</v-icon>

</el-col>
  <el-col style="width:20%">
    <div class="grid-content bg-purple">
      
      <v-icon @click="createcard()" id="createicon">create</v-icon>
      </div>
      </el-col>
</el-row>

 <v-layout row style="margin-top:3%">
    <v-flex v-for="(card,index) in cards" :key="index" style="width:100%" xs3 >
      <v-card  id="card">
        <v-img st
          :src="card.image"
          height="213px"
        >
        </v-img>

        <v-card-title primary-title>
        
            <div class="title"><b>{{card.tasktitle}}</b></div>
            
          
        </v-card-title>
        <div  id="desc">{{card.description}}</div>

       <div class="actions">
        
        <v-icon @click="remove(card,index);">delete</v-icon>
         
          <div class="deadline"> <span style="color:rgb(248, 148, 148)"> Deadline</span> - {{card.deadline}} Days</div>

       </div>
      </v-card>
    </v-flex>
  </v-layout>


  
</div>

</template>

<script>
import axios from "axios";
import db from "../components/firebaseinit.js";
export default {
  name: "home",
  data() {
    return {
      show: false,
      cards: [],
      flag: 0
    };
  },
  watch: {
    // call again the method if the route changes
    $route: "Cards"
  },
  methods: {
    createcard: function() {
      var tempthis = this;
      tempthis.flag = 0;
      console.log(tempthis.flag);
      this.$swal({
        title: "Enter Employee ID",
        input: "text"
      }).then(function(ID) {
        console.log(ID.value);

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
      this.cards.splice(index, 1);
      console.log(this.cards);
      var card_query = db
        .collection("Card")
        .where("tasktitle", "==", card.tasktitle);
      card_query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      });
    }
  },

  created() {
    var cards = this.cards;

    db.collection("Card")
      .get()
      .then(function(DocumentSnapshot) {
        DocumentSnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          var data = doc.data();

          cards.push(data);
        });
      });
  }
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway|Roboto");
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
</style>
