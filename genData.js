const fs = require('fs');

let writer = fs.createWriteStream('procels.js', { flags: 'a' });
let celebs = require('./cels');
writer.write('module.exports=');
const procels = celebs.filter(
  cel =>
    cel.image_url !==
    'https://adamsbooks.co.za/wp-content/uploads/2018/01/Sorry-Image-Not-Available-297.png'
);

writer.write(JSON.stringify(procels));
writer.write(';');
writer.close();
console.log('celebrities went from', celebs.length, 'to', procels.length);
console.log('completed!!!!!!!');
