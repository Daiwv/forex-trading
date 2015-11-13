function Base(symbols) {
    var self = this;

    self.symbols = symbols;

    // Begin piggybacking on data feed.
    piggybackDataFeed();

    // Keep piggybacking active.
    window.setInterval(function() {
        if (!io.sockets['https://client.ctoption.com:443'].transport.websocket.piggybacked) {
            self.piggybackDataFeed();
        }
    }, 5000);

    self.initializeTradingSocket();
}

Base.prototype.getTradingMessageTypes = function() {
    return {
        QUOTE: 1,
        CALL: 2,
        PUT: 3
    };
};

Base.prototype.getSymbols = function() {
    return this.symbols;
};

Base.prototype.getTradingSocket = function() {
    return this.tradingSocket;
}

Base.prototype.initializeTradingSocket = function() {
    var self = this;

    self.tradingSocket = new WebSocket('ws://localhost:8080');

    // Watch for messages from the trading socket.
    self.tradingSocket.onmessage = function(event) {
        try {
            var message = JSON.parse(event.data);

            switch (message.type) {
                case tradingMessageTypes.CALL:
                    self.call(message.data.symbol, message.data.investment);
                    break;

                case tradingMessageTypes.PUT:
                    self.put(message.data.symbol, message.data.investment);
                    break;
            }
        }
        catch (error) {
            console.error('TRADING SOCKET ERROR: ' + (error.message || error));
        }
    };
};

Base.prototype.piggybackDataFeed = function() {
    throw 'piggybackDataFeed() not implemented';
};

Base.prototype.showSymbolControls = function() {
    throw 'showSymbolControls() not implemented';
};

Base.prototype.call = function(symbol, investment) {
    throw 'call() not implemented';
};

Base.prototype.put = function(symbol, investment) {
    throw 'put() not implemented';
};

Base.prototype.setTradeInvestment = function(symbol, investment) {
    throw 'setTradeInvestment() not implemented';
};

Base.prototype.initiateTrade = function(symbol) {
    throw 'initiateTrade() not implemented';
};

module.exports = Base;