import React from "react";

import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
// import LearningOptions from "./components/LearningOptions";

const config = {
    initialMessages: [
        createChatBotMessage("Welcome to Crafted Indian! How can I assist you today?", {
          widget: "learningOptions",
        }),
      ],
    //   widgets: [
    //     {
    //       widgetName: "learningOptions",
    //       widgetFunc: (props) => <LearningOptions {...props} />,
    //     },
    //   ],
      
    
    customStyles: {
        botMessageBox: {
            backgroundColor: "#5A9",
        },
        chatButton: {
            backgroundColor: "#5A9",
        },
    },
    actionProvider: ActionProvider,
};

export default config;
