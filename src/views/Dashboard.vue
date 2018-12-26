<template>
    <div>
        
hiiii


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