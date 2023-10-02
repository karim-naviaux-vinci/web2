const fs = require('fs');

/**
 * Parse items given in a .json file
 * @param {String} filePath - path to the .json file
 * If the file does not exist or it's content cannot be parsed as JSON data,
 * use the default data.
 * @param {Array} defaultArray - Content to be used when the .json file does not exists
 * @returns {Array} : the array that was parsed from the file (or defaultData)
 */
function parse(filePath, defaultArray = []) {
    if (!fs.existsSync(filePath)) return defaultArray;
    const fileData = fs.readFileSync(filePath);
    try {
      // parse() Throws a SyntaxError exception if the string to parse is not valid JSON.
      return JSON.parse(fileData);
    } catch (err) {
      return defaultArray;
    }
  }

  
  module.exports = {parse};