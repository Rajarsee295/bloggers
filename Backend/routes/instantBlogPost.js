export default function (io){
    io.on("connection", (socket) => {
        
        // Listen for the 'blogPost' event from the client
        // and broadcast the data to all connected clients
        socket.on("newBlogPost", (data) => {
            io.emit("blogPost", data);
        });
    });
}