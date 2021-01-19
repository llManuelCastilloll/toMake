exports.getURI = () => {
    var uriConnect = {
        serverLocal: `http://192.168.1.77:4000/`,
        herokuServer: `https://tomake-server.herokuapp.com/`
    }

    return uriConnect.herokuServer;
}
