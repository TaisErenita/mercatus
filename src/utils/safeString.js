/**
 * Utilitários para manipulação segura de strings
 * Previne erros de TypeError ao chamar métodos em valores undefined/null
 */

/**
 * Converte string para lowercase de forma segura
 * @param {string} str - String para converter
 * @param {string} defaultValue - Valor padrão se str for undefined/null
 * @returns {string} String em lowercase
 * @example
 * safeToLowerCase('TOTAL') // 'total'
 * safeToLowerCase(undefined) // 'total'
 * safeToLowerCase(null, 'default') // 'default'
 */
export const safeToLowerCase = (str, defaultValue = 'total') => {
  if (str === null || str === undefined || str === '') {
    return defaultValue.toLowerCase();
  }
  return String(str).toLowerCase();
};

/**
 * Converte string para uppercase de forma segura
 * @param {string} str - String para converter
 * @param {string} defaultValue - Valor padrão se str for undefined/null
 * @returns {string} String em uppercase
 * @example
 * safeToUpperCase('total') // 'TOTAL'
 * safeToUpperCase(undefined) // 'TOTAL'
 */
export const safeToUpperCase = (str, defaultValue = 'TOTAL') => {
  if (str === null || str === undefined || str === '') {
    return defaultValue.toUpperCase();
  }
  return String(str).toUpperCase();
};

/**
 * Retorna string segura (nunca undefined/null)
 * @param {string} str - String para validar
 * @param {string} defaultValue - Valor padrão se str for undefined/null
 * @returns {string} String válida
 * @example
 * safeString('texto') // 'texto'
 * safeString(undefined) // ''
 * safeString(null, 'padrão') // 'padrão'
 */
export const safeString = (str, defaultValue = '') => {
  if (str === null || str === undefined) {
    return defaultValue;
  }
  return String(str);
};

/**
 * Filtra array removendo valores falsy (undefined, null, '', 0, false)
 * @param {Array} arr - Array para filtrar
 * @returns {Array} Array filtrado
 * @example
 * filterValidItems(['a', null, 'b', undefined, 'c']) // ['a', 'b', 'c']
 * filterValidItems([1, 0, 2, null, 3]) // [1, 2, 3]
 */
export const filterValidItems = (arr) => {
  if (!Array.isArray(arr)) {
    return [];
  }
  return arr.filter(item => item);
};

/**
 * Filtra array removendo apenas undefined e null (mantém '', 0, false)
 * @param {Array} arr - Array para filtrar
 * @returns {Array} Array filtrado
 * @example
 * filterNullish(['a', null, '', 0, undefined, false]) // ['a', '', 0, false]
 */
export const filterNullish = (arr) => {
  if (!Array.isArray(arr)) {
    return [];
  }
  return arr.filter(item => item !== null && item !== undefined);
};

/**
 * Trunca string com ellipsis se exceder o limite
 * @param {string} str - String para truncar
 * @param {number} maxLength - Comprimento máximo
 * @param {string} ellipsis - String de ellipsis (padrão: '...')
 * @returns {string} String truncada
 * @example
 * truncateString('Lorem ipsum dolor sit amet', 10) // 'Lorem ipsu...'
 */
export const truncateString = (str, maxLength, ellipsis = '...') => {
  const safeStr = safeString(str);
  if (safeStr.length <= maxLength) {
    return safeStr;
  }
  return safeStr.substring(0, maxLength - ellipsis.length) + ellipsis;
};

/**
 * Capitaliza primeira letra de cada palavra
 * @param {string} str - String para capitalizar
 * @returns {string} String capitalizada
 * @example
 * capitalize('hello world') // 'Hello World'
 * capitalize(undefined) // ''
 */
export const capitalize = (str) => {
  const safeStr = safeString(str);
  return safeStr
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Remove acentos de uma string
 * @param {string} str - String para remover acentos
 * @returns {string} String sem acentos
 * @example
 * removeAccents('José') // 'Jose'
 * removeAccents('São Paulo') // 'Sao Paulo'
 */
export const removeAccents = (str) => {
  const safeStr = safeString(str);
  return safeStr.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Compara strings ignorando case e acentos
 * @param {string} str1 - Primeira string
 * @param {string} str2 - Segunda string
 * @returns {boolean} True se strings são equivalentes
 * @example
 * compareStrings('São Paulo', 'sao paulo') // true
 * compareStrings('José', 'jose') // true
 */
export const compareStrings = (str1, str2) => {
  const safe1 = removeAccents(safeToLowerCase(str1, ''));
  const safe2 = removeAccents(safeToLowerCase(str2, ''));
  return safe1 === safe2;
};
