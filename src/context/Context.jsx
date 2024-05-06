import { createContext } from "react";
import PropTypes from "prop-types";
import runChat from "../config/gemini";

export const Context = createContext();

// gemini.js API와 연결
const ContextProvider = (props) => {
  const onSend = async (prompt) => {
    await runChat(prompt);
  };

  onSend("what is react js?");
  const contextValue = {};

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
