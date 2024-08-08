import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const afterNameMessage = () => {
    const message = createChatBotMessage('Let me know your query so I can provide you the best solution for it.');
    updateState(message)
  }

  const initialAction = () => {
    const message = createChatBotMessage('Just type in your queries to get it resolevd.');
    updateState(message, "query")
  }

  const updateState = (message,checker) => {
    setState((prev) => ({
      ...prev,
      messages: {...prev.messages, message},
      checker,
    }))
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            initialAction,
            afterNameMessage
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;