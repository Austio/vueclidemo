<template>
  <el-container>
    <el-header>ElasticIQ</el-header>
  </el-container>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'App',
    mounted() {
        this.$store.dispatch('esmapping/fetchMapping');
    },
    watch: {
        $route(newVal, oldVal) {
            this.activeIndex = newVal.path;
        },
    },
    data() {
       return {
           activeIndex: this.$route.path,
       };
    },
  });
</script>
