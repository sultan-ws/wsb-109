const http = require('http');
const {data, user} = require('./support');

console.log(data);


http.createServer((request, response)=>{
    console.log(request.method);

    if(request.method === 'POST' && request.url === '/insert'){
        response.end('data inserted');
    }else if(request.method === 'GET' && request.url === '/read-data'){
        response.end(JSON.stringify(data));
    }
    else{
        response.end('invalid method');
    }
    
}).listen(5000, ()=>{
    console.log('server is running on port 5000');
});
