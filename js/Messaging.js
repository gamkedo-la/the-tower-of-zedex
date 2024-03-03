const MESSAGE_EMPTY = -1;
const MESSAGE_INFO = 0;

function MessagingClass() {
    this.messageQueue = [{ message: " ", type: MESSAGE_EMPTY }];
    this.consoleOutput = false;

    this.toggleConsoleOutput = (consoleOutputEnabled = true) => this.consoleOutput = consoleOutputEnabled;

    this.log = function (currentMessage, messageType = MESSAGE_INFO) {
        const messageObject = { message: currentMessage, type: messageType };
        this.messageQueue.push(messageObject) ;
        if (this.consoleOutput) {
            console.log(messageObject.message);
        }
        return messageObject;
    };

    this.tail = function (lastNMessages = 1) {
        let n = lastNMessages;
        if (this.messageQueue.length - 1 < n) {
           n = this.messageQueue.length - 1         
        }

        const lastNMesasgeQueue = [];
        for (let i = n; i > 0; i--) {
            lastNMesasgeQueue.push(this.messageQueue[this.messageQueue.length - i]);
        }

        if (lastNMessages == 1) {
            return this.messageQueue[this.messageQueue.length - 1];
        }

        return lastNMesasgeQueue;
    };
}

var messagingSystem = new MessagingClass();
messagingSystem.toggleConsoleOutput();
