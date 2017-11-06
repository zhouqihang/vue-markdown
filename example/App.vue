<template>
  <div id="app">
    <vue-editor-markdown v-model="markdown"></vue-editor-markdown>
    <p>{{markdown}}</p>
  </div>
</template>

<script>
import VueEditorMarkdown from '../src/main';

export default {
  name: 'app',
  components: {
    VueEditorMarkdown,
  },
  data() {
    return {
      markdown: {
        markdown: '# vue-editor-markdown',
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
