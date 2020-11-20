<template>
  <div class="v-treeview-container">
    <v-treeview-node
      @selected-item="onSelectItem"
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :selectedItem="selectedItem"
    ></v-treeview-node>
  </div>
</template>

<script>
import VTreeviewNode from "./v-treeview-node.vue";

export default {
  components: {
    VTreeviewNode
  },
  props: { propItems: Array },
  data: function () {
    return {
      items: [],
      selectedItem: {},
      counter: 0
    };
  },
  created() {
    this.items = this.recursiveMap(this.propItems);
  },
  methods: {
    recursiveMap(nodes) {
      return nodes.map((node) => {
        if (node.nodes && node.nodes.length) return { ...node, nodes: this.recursiveMap(node.nodes), selected: false, index: this.counter++ };
        else return { ...node, selected: false, index: this.counter++ };
      });
    },

    onSelectItem({ selectedItem, selected }) {
      if (!selected) this.selectedItem = { ...selectedItem };
      else this.selectedItem = {};

      this.$emit("selected-item", this.selectedItem);
    }
  }
};
</script>

<style>
.v-treeview-container {
  background-image: repeating-linear-gradient(0deg, #cde4f582, #cde4f582 1.5rem, white 1.5rem, white 3rem);
  overflow: hidden;
}
</style>
