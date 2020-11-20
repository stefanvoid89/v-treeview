<template>
  <div>
    <div :class="['v-treeview-node-body', { 'v-treeview-node-body-selected': selected }]" @click="selectItem">
      <div v-if="item.nodes && item.nodes.length" v-html="getIcon" @click="toggleChildren"></div>
      <div :class="['v-treeview-node-name', { 'v-treeview-node-name-left-padding': hasLeftPadding }]">{{ item.label }}</div>
    </div>

    <div v-if="item.nodes" v-show="showChildren">
      <v-treeview-node
        class="v-treeview-node-leaf"
        v-for="(item, index) in item.nodes"
        :key="index"
        :item="item"
        :selectedItem="selectedItem"
        @selected-item="onSelectItem"
      ></v-treeview-node>
    </div>
  </div>
</template>

<script>
import globalMixin from "./mixins/globalMixin.js";
export default {
  name: "v-treeview-node",
  mixins: [globalMixin],
  props: { item: Object, selectedItem: Object },
  data: function() {
    return {
      showChildren: true,
      selected: false
    };
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren;
    },
    selectItem() {
      if (!this.item.nodes || !this.item.nodes.length) {
        this.$emit("selected-item", { selectedItem: this.item, selected: this.selected });
      }
    },
    onSelectItem({ selectedItem, selected }) {
      this.$emit("selected-item", { selectedItem, selected });
    }
  },
  watch: {
    selectedItem() {
      if (this.selectedItem.index === this.item.index) {
        this.selected = !this.selected;
      } else this.selected = false;
    }
  },

  computed: {
    hasLeftPadding() {
      if (!this.item.nodes || !this.item.nodes.length) {
        return true;
      }
      return false;
    },
    getIcon() {
      return this.showChildren ? this.icons.arrow_down : this.icons.arrow_rigth;
    }
  }
};
</script>

<style>
.v-treeview-node-body {
  display: flex;
  text-align: center;
  height: 1.5rem;
  padding-left: 100%;
  margin-left: -100%;
}

.v-treeview-node-icon {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  color: #cbd5e0;
}

.v-treeview-node-name {
  display: flex;
  font-size: 0.875rem;
  margin-left: 0.5rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
}

.v-treeview-node-name-left-padding {
  padding-left: 1.5rem;
}

.v-treeview-node-leaf {
  padding-left: 1.25rem;
}
.v-treeview-node-body-selected {
  background: #0073ac;
  color: white;
}
</style>
