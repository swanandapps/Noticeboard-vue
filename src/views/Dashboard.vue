<template>
    <div>
        
      
<el-row id="navbar" >
  
  <el-col style="width:45%" >
    {{this.$store.state.clicked_card_details[0]}}
  </el-col>
</el-row>


    </div>
</template>

<script>
import { mapState } from "vuex";
import db from "../components/firebaseinit.js";
export default {
  data() {
    return {};
  },

  computed: {
    ...mapState(["clicked_card_details"])
  },

  created() {
    console.log(this.$store.state.clicked_card_details);
  }
};
</script>