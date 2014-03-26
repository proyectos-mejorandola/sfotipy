var http = require('http'),
    st   = require('node-static'),
    opts = { },
    file = new st.Server('./public', opts);

http.createServer(function (req, res) {
    file.serve(req, res);
}).listen(process.env.PORT || 8080)
