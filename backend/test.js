function isNumber(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
  }
  
  // Examples
  console.log(isNumber("123"));    // Output: true
  console.log(isNumber("1.23"));   // Output: true
  console.log(isNumber("-45"));    // Output: true
  console.log(isNumber("abc"));  