

class ActionProvider {
    constructor(createChatbotMessage, setStateFunc) {
        this.createChatbotMessage = createChatbotMessage;
        this.setState = setStateFunc;
    }

    handleUserMessage = (message) => {
        // Convert the message to lowercase for easier comparison
        const userMessage = message.toLowerCase();

        // Define responses based on user input
      
        let botResponse = "";

       
        // Training data: predefined responses
        if (userMessage.includes("hello","hi")) {
            botResponse = "Hi there! How can I assist you today?";
        } else if (userMessage.includes("help","customer support")) {
            botResponse = "Sure! Let me know what you need help with.";
        } else if (userMessage.includes("product")) {
            botResponse = "Sure let me show to the exclusive product by our local artist  ";
        } else if (userMessage.includes("data")) {
            botResponse = "Here is some example data";
        } else if (userMessage.includes("thanks")) {
            botResponse = "You're welcome! Feel free to ask if you need more help.";
        } else {
            botResponse = "Sorry, I didn't quite understand that. Could you try again?";
        }

        // Create a chatbot message using the bot's response
        const botMessage = this.createChatbotMessage(botResponse);

        // Update the chat state with the bot's response
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, botMessage],
        }));
    };
}

export default ActionProvider;
/*
const responses = {
    "hello": "Hi there! How can I assist you today?",
    "Can you help me": "Sure! Let me know what you need help with, or you can just reach out to our contactUs page for customer support ",
    " how are you ": "MODE OF SHIPPING PROVIDE BY INDIAN PSOT ARE  SPEED POST :- ITS A TIME BOUNDED DEVILAR",
    "what are the ": "Here is some example data: [Sample Data 123]",
    "thanks": "You're welcome! Feel free to ask if you need more help.",
};

class ActionProvider {
    constructor(createChatbotMessage, setStateFunc) {
        this.createChatbotMessage = createChatbotMessage;
        this.setState = setStateFunc;
    }

    handleUserMessage = (message) => {
        const userMessage = message.toLowerCase();

        // Check if there is a predefined response for the user's message
        const botResponse = responses[userMessage] || "Sorry, I didn't quite understand that. Could you try again?";

        const botMessage = this.createChatbotMessage(botResponse);

        // Update the chat state with the bot's response
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, botMessage],
        }));
    };
}

export default ActionProvider;
*/