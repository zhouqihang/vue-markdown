/**
 * replace string by cursor position
 * @param {string} target
 * @param {number} position
 * @param {string} searchValue
 * @param {string} replaceValue
 * @returns {string}
 */
export function stringReplace(
  { target = '', position = 0, searchValue = '', replaceValue = '' },
) {
  const startString = target.slice(0, position);
  const endString = target.slice(position);
  return startString + endString.replace(searchValue, replaceValue);
}

/**
 * get line text and cursor position where cursor is
 * @param {string} target
 * @param {number} position
 * @returns {{text: string, position: Number}}
 */
export function getLineStringByPos({ target = '', position = 0 }) {
  const startString = target.slice(0, position);
  const endString = target.slice(position);
  let startIndex = startString.lastIndexOf('\n');
  startIndex = startIndex === -1 ? 0 : startIndex + 1;
  let endIndex = endString.indexOf('\n');
  endIndex = endIndex === -1 ? target.length : (startString.length + endIndex);
  return {
    text: target.slice(startIndex, endIndex),
    position: startIndex,
  };
}
