export function getCursortPosition(target) {
  let carePos = 0;
  if (document.selection) {
    target.focus();
    const sel = document.selection.createRange();
    sel.moveStart('character', -target.value.length);
    carePos = sel.text.length;
  } else if (target.selectionStart || target.selectionStart == '0') {
    carePos = target.selectionStart;
  }
  return carePos;
}

export function setCarePosition(target, pos) {
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
