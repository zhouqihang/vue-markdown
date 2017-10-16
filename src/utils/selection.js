/**
 * get cursor position
 * @param {string} target
 * @returns {number}
 */
export function getCursorPosition(target) {
  let carePos = 0;
  if (document.selection) {
    target.focus();
    const sel = document.selection.createRange();
    sel.moveStart('character', -target.value.length);
    carePos = sel.text.length;
  } else if (target.selectionStart || target.selectionStart === '0') {
    carePos = target.selectionStart;
  }
  return carePos;
}

/**
 * set cursor position
 * @param {string} target
 * @param {number} pos
 */
export function setcursorPosition(target, pos) {
  if (target.setSelectionRange) {
    target.focus();
    target.setSelectionRange(pos, pos);
  } else if (target.createTextRange) {
    const range = target.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

/**
 * get selection text
 * @returns {string}
 */
export function getSelectionText(target) {
  try {
    target.focus();
  } catch (e) {
    console.error(e);
  }
  if (document.selection) {
    return document.selection.createRange().text;
  }
  return window.getSelection().toString();
}
