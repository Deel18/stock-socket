const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);


io.origins(["http://localhost:3000"]);


var simulatePrice = function(price) {
    chance = Math.round(Math.random()) * 2 - 1;

    price += chance/10;

    roundedPrice = Math.round(price * 100) / 100

    return roundedPrice;
}

var stock1 = {
    name: "stock1",
    price: 10.5
}

var stock2 = {
    name: "stock2",
    price: 11
}

var stock3 = {
    name: "stock3",
    price: 10.3
}

var stocks = [stock1, stock2, stock3];

io.on("connection", function(socket) {
    console.info("User connected");

    socket.on("disconnect", () => {
        console.info("User disconnected")
    });

});

setInterval(function() {
    stocks.map(stock => {
        console.info(stock)
        stock["price"] = simulatePrice(stock.price);
        return stock;
    })

    io.emit("stocks", stocks);

}, 5000);

server.listen(8999);
console.log("Socket listening on 8999")

