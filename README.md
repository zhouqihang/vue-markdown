# vue-editor-markdown

Markdown editor build for Vue.

# Installation

### npm

```
$ npm install vue-editor-markdown --save
```

# Usage

```javascript
import Vue from 'vue';
import VueEditorMarkdown from 'vue-editor-markdown';

Vue.use(VueEditorMarkdown);

```
```html
<vue-editor-markdown></vue-editor-markdown>
```

# props

| prop | type | default | describe |
| ---- | ---- | ------- | -------- |
| showPreview | Boolean | true | enable html preview |
| isPreview | Boolean | false | enable markdown edit |
| isFullScreen | Boolean | false | full screen |
| navColor | String | null | navigation text color |
| backgroundColor | String | null | navigation and markdown editor background color |
| borderColor | String | null | editor border color |
| v-model | Object | {markdown: '', html: ''} | value |


