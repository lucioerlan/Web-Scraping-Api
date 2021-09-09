
/**
 * remove spaces, convert text, replaces breaks
 * @function Cleaning
 */

const Cleaning = (text) => {
  return text && text.text().trim().replace(/\n/g, '');
};

module.exports = { Cleaning };
