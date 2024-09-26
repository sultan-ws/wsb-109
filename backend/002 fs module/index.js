const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, 'public');


//create file
// fs.writeFileSync(`${filePath}/index.html`, '<h1>hello world</h1>');


// read file
fs.readFile(`${filePath}/index.html`, 'utf-8', (error, content)=>{
    if(error) return console.log(error);

    console.log(content);
});

// update file

// fs.appendFile(`${filePath}/index.html`, '<p> lorem ipsum </p>', (error, success)=>{
//     if(error) return console.log(error);

//     console.log('file updated');
// });

//delete file
// fs.unlinkSync(`${filePath}/index.html`);