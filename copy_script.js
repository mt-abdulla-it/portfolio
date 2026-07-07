const fs = require('fs');

const src = "C:\\Users\\abdullah\\.gemini\\antigravity-ide\\brain\\ed6fd295-855f-4897-9e79-257c710bd111\\smart_waste_management_final_1783399995993.png";
const dest = "C:\\Users\\abdullah\\Desktop\\portfolio\\public\\projects\\Smart Waste Management System.jpg";

try {
  fs.copyFileSync(src, dest);
  console.log('File copied successfully!');
} catch (err) {
  console.error('Error copying file:', err);
}
