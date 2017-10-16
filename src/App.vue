<template>
  <div id="app">
    <markdown></markdown>
  </div>
</template>

<script>
  import Markdown from './components/Markdown';

export default {
    name: 'app',
    components: {
      Markdown,
    },
};
</script>

<style>
#app {
  width: 1000px;
  padding:20px;
}
</style>
