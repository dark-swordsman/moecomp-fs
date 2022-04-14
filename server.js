const server = require("express")();
const port = 23210;

// fs with directory

server.post("/upload", (req, res) => {});

server.listen(port, () => console.log(`File server running on ${port}`));
