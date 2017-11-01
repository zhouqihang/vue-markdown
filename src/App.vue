<template>
  <div id="app">
    <markdown v-model="markdown"></markdown>
    <p>{{markdown}}</p>
  </div>
</template>

<script>
  import Markdown from './components/Markdown';

  export default {
    name: 'app',
    components: {
      Markdown,
    },
    data() {
      return {
        markdown: {
          markdown: '# init header',
          html: '',
        },
      };
    },
  };
</script>

<style>
  #app {
    width: 1000px;
    padding: 20px;
  }
</style>
