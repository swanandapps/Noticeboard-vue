import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);



export default new Vuex.Store({


    state: {

        current_dep_id: '',
        current_employee: [],
        current_doc_id: '',
        clicked_card_details: [],
        live_cards: [],
        expired_cards: [],
        department_cards: [],
        current_emp_id: '',
        projects: [],
        cards_project: []

    },
    mutations: {},
    actions: {},


});