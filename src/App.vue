<template>
  <div id="app">
      <v-main-wrapper></v-main-wrapper>
  </div>
</template>

<script>
import vMainWrapper from './components/v-main-wrapper'


export default {
  name: 'App',
  components: {
    vMainWrapper
  }
}
</script>

<style>
body {
  margin: 0;
  font-size: 16px;
  line-height: 1.625;
}
</style>
