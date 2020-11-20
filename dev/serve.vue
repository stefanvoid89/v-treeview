<script>
import Vue from "vue";
import VTreeview from "@/v-treeview.vue";

import items from "./data.json";

export default Vue.extend({
  name: "ServeDev",
  components: {
    VTreeview
  },
  data: function() {
    return {
      menuItems: JSON.parse(JSON.stringify(items)),
      selectedItem: {}
    };
  },
  methods: {
    showItem(selectedItem) {
      this.selectedItem = selectedItem;
    }
  }
});
</script>

<template>
  <div id="app">
    <div style="width:400px">
      <v-treeview :propItems="menuItems" @selected-item="showItem" />
    </div>
  </div>
</template>
