var socketClients = []
var jwtDecode = require("jwt-decode");
var globalSocket = null

function socketConnect(socket) {

    let token = socket.handshake.query.token
    try {
        let decodedToken = jwtDecode(token)
        
        //subscribe the user to the channels
        if (decodedToken) {
            console.log("decodedToken", decodedToken)
            socketClients.push(socket)
            if (decodedToken.user_id) {
                socket.join(`user/${decodedToken.user_id}`)
            }
        }

    } catch (e) {
        console.log("Connect with invalid token.")
    }

}

function emitMessage(room, message, data) {
    console.log("Message:", room, message, data)
    globalSocket.in(room).emit(message, data)
}

function emitMessageToAll(message, data) {
    console.log("Message To All:", message, data)
    globalSocket.emit(message, data)
}

function socketDisconnect(socket, reason) {

    const clientID = socketClients.indexOf(socket)
    const socketClient = socketClients[clientID]
    socketClients.splice(clientID, 1)
}


function setGlobalSocket(socket) {
    globalSocket = socket
}


module.exports = { socketConnect, socketDisconnect, setGlobalSocket, emitMessage, emitMessageToAll };
