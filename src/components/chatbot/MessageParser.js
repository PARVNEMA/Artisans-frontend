class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        
        // Pass the user's message to the ActionProvider
       // Pass the user's message to the ActionProvider
       if (message.trim()) {
        this.actionProvider.handleUserMessage(message);
        }
    }
}

export default MessageParser;
