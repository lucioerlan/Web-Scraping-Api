
/**
 * remove spaces, convert text, replaces breaks
 * @function cleanupText
 */

const cleanupText = (text) => {
  return text && text.text().trim().replace(/\n/g, '');
};

module.exports = { cleanupText };
