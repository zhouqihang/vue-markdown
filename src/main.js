import VueEditorMarkdown from './components/Markdown';

VueEditorMarkdown.install = Vue => {
  Vue.component(VueEditorMarkdown.name, VueEditorMarkdown);
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueEditorMarkdown);
}

export default VueEditorMarkdown;
