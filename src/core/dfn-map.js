/** @type {Record<string, Record<string, HTMLElement[]>>} */
const definitionMap = {};

/**
 *
 * @param {HTMLElement} dfn
 * @param {string[]} name
 * @param {Record<string, HTMLElement[]>} definitionMap
 */
export function registerDefinition(dfn, names) {
  for (const name of names) {
    if (!definitionMap[name]) {
      definitionMap[name] = [dfn];
    } else if (!definitionMap[name].includes(dfn)) {
      definitionMap[name].push(dfn);
    }
  }
}
