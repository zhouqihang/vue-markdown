<template>
  <div id="markdown" class="markdown markdown-default">
    <div class="markdown-tools">
      <ul class="markdown-tools-left">
        <!--<li><i class="fa fa-header" aria-hidden="true" title="header"></i></li>-->
        <li><i class="fa markdown-icon" aria-hidden="true" title="header 1" @click="handleText('# ')">H1</i></li>
        <li><i class="fa markdown-icon" aria-hidden="true" title="header 2" @click="handleText('## ')">H2</i></li>
        <li><i class="fa markdown-icon" aria-hidden="true" title="header 3" @click="handleText('### ')">H3</i></li>
        <li><i class="fa markdown-icon" aria-hidden="true" title="header 4" @click="handleText('#### ')">H4</i></li>
        <li><i class="fa markdown-icon" aria-hidden="true" title="header 5" @click="handleText('##### ')">H5</i></li>
        <li><i class="fa markdown-icon" aria-hidden="true" title="header 6" @click="handleText('###### ')">H6</i></li>
        <li><i class="fa markdown-icon markdown-slide-line" aria-hidden="true">|</i></li>
        <li><i class="fa fa-bold" aria-hidden="true" title="bold" @click="handleText('**', '**')"> </i></li>
        <li><i class="fa fa-italic" aria-hidden="true" title="italic" @click="handleText('*', '*')"></i></li>
        <li><i class="fa fa-strikethrough" aria-hidden="true" title="strikethrough" @click="handleText('~~', '~~')"></i></li>
        <li><i class="fa fa-list-ol" aria-hidden="true" title="ol list" @click="handleText('1. ')"></i></li>
        <li><i class="fa fa-list-ul" aria-hidden="true" title="ul list" @click="handleText('* ')"></i></li>
        <li><i class="fa fa-quote-right" aria-hidden="true" title="quote" @click="handleText('> ')"></i></li>
        <li><i class="fa markdown-icon markdown-slide-line" aria-hidden="true">|</i></li>
        <li><i class="fa fa-code" aria-hidden="true" title="code block" @click="handleText('```\n', '\n```')"></i></li>
        <li><i class="fa fa-table" aria-hidden="true" title="table" @click="clickTableIcon"></i></li>
        <li><i class="fa fa-picture-o" aria-hidden="true" title="picture" @click="handleText('', '![]()')"></i></li>
        <li><i class="fa fa-link" aria-hidden="true" title="link" @click="handleText('', '[]()')"></i></li>
        <li><i class="fa fa-minus" aria-hidden="true" title="halving line" @click="handleText('', '\n***')"></i></li>
        <li><i class="fa fa-clock-o" aria-hidden="true" title="current datetime" @click="clickTimeIcon"></i></li>
        <!-- <li><i class="fa fa-smile-o" aria-hidden="true" title="emoji" ></i></li> -->
      </ul>
      <ul class="markdown-tools-right">
        <li><i class="fa fa-eye-slash" aria-hidden="true" title="close preview"></i></li>
        <li><i class="fa fa-desktop" aria-hidden="true" title="full screen preview"></i></li>
        <li><i class="fa fa-arrows-alt" aria-hidden="true" title="full screen"></i></li>
      </ul>
    </div>
    <div class="markdown-content">
      <div class="markdown-edit">
        <textarea
          class="markdown-edit-box"
          v-model="markdownText"
          ref="markdownText"
          @keyup="inputing">
        </textarea>
      </div>
      <div class="markdown-preview markdown-body" ref="markdownHTML"></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked';
import 'github-markdown-css';
import 'highlight.js/styles/github.css';
import 'font-awesome/css/font-awesome.min.css';
import hljs from 'highlight.js';
import { getCursorPosition, getSelectionText } from '@/utils/selection';
import { stringReplace, getLineStringByPos } from '@/utils/string';


export default {
  name: 'markdown',
  data() {
    return {
      markdownText: '',
      showPreview: true,
      isPreview: false,
      isFullScreen: false,
    };
  },
  computed: {
    markdownHTML: {
      get() {
        return marked(this.markdownText);
      },
    },
  },
  methods: {
    /**
     * init DOM
     */
    initDomVars() {
      try {
        this.markdownTextDom = this.$refs.markdownText;
        this.markdownHTMLDom = this.$refs.markdownHTML;
      } catch (e) {
        console.error(e);
      }
    },
    /**
     * when inputing, change markdown to HTML and highlight code
     */
    inputing() {
      this.setMarkdownHTML();
      this.highlightMarkdownHTML();
    },
    /**
     * change markdown to HTML, set HTMl to DOM
     */
    setMarkdownHTML() {
      try {
        this.markdownHTMLDom.innerHTML = this.markdownHTML;
      } catch (e) {
        console.error(e);
      }
    },
    /**
     * highlight code
     */
    highlightMarkdownHTML() {
      let codes = [];
      try {
        codes = this.markdownHTMLDom.querySelectorAll('pre code');
      } catch (e) {
        console.error(e);
      }
      Array.from(codes)
        .forEach(i => {
          hljs.highlightBlock(i);
        });
    },
    clickTableIcon() {
      const table = '|   |   |   |\n|---|---|---|\n|   |   |   |';
      this.handleText('', table);
    },
    clickTimeIcon() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      const dateTime = `${year}年${month}月${day}日 ${hour}时${minute}分${second}秒`;
      this.handleText('', dateTime);
    },
    /**
     * add markdown to text
     * @param {string} prefix
     * @param {string} suffix
     */
    handleText(prefix = '', suffix = '') {
      if (getSelectionText(this.markdownTextDom) !== '') {
        // replace selection text to 'replaceValue'
        const searchValue = getSelectionText(this.markdownTextDom);
        const replaceValue = `${prefix}${searchValue}${suffix}`;
        this.markdownText = stringReplace({
          target: this.markdownText,
          position: getCursorPosition(this.markdownTextDom),
          searchValue,
          replaceValue,
        });
      } else {
        // replace cursor line to 'replaceValue'
        const searchInfo = getLineStringByPos({
          target: this.markdownText,
          position: getCursorPosition(this.markdownTextDom),
        });
        const searchValue = searchInfo.text;
        const replaceValue = `${prefix}${searchValue}${suffix}`;
        this.markdownText = stringReplace({
          target: this.markdownText,
          position: searchInfo.position,
          searchValue,
          replaceValue,
        });
      }
      this.inputing();
    },
  },
  mounted() {
    this.initDomVars();
  },
};
</script>

<style scoped type="text/css">
  .markdown {
    width: 100%;
    height: 400px;
    border: 1px solid #eeeff1;
    box-sizing: border-box;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    overflow: hidden;
  }
  .markdown .markdown-icon {
    font-weight: bold;
    font-size: inherit;
  }
  .markdown .markdown-icon.markdown-slide-line {
    cursor: default;
    opacity: 0.7;
  }
  .markdown > .markdown-tools {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #eeeff1;
    line-height: 40px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 15px;
  }
  .markdown > .markdown-tools > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: inline-block;
    overflow: hidden;
  }
  .markdown > .markdown-tools > ul > li {
    float: left;
  }
  .markdown > .markdown-tools > ul > li:nth-child(n+2) {
    margin-left: 15px;
  }
  .markdown > .markdown-tools > ul > li i {
    cursor: pointer;
  }
  .markdown > .markdown-tools > ul > li i:hover {
    opacity: 0.7;
  }
  .markdown > .markdown-tools > .markdown-tools-left {
    float: left;
  }
  .markdown > .markdown-tools > .markdown-tools-right {
    float: right;
  }
  .markdown > .markdown-content {
    width: 100%;
    height: calc(100% - 41px);
    display: flex;
  }
  .markdown > .markdown-content > .markdown-edit {
    flex: 1;
  }
  .markdown > .markdown-content > .markdown-edit > .markdown-edit-box {
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1.8;
    font-size: 14px;
  }
  .markdown > .markdown-content > .markdown-preview {
    flex: 1;
    padding: 15px;
    overflow: auto;
  }

  /*github markdown css*/
  .markdown-body {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  /*default theme*/
  .markdown.markdown-default > .markdown-content > .markdown-edit {
    border-right: 1px solid #eeeff1;
    background-color: rgb(250, 251, 252);
    color: rgb(101, 101, 101);
  }
  .markdown.markdown-default > .markdown-tools {
    color: rgb(101, 101, 101);
    background-color: rgb(250, 251, 252);
  }
</style>
