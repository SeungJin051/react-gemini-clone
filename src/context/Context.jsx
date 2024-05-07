import { createContext, useState } from "react";
import PropTypes from "prop-types";
import runChat from "../config/gemini";

export const Context = createContext();

// gemini.js API와 연결
const ContextProvider = (props) => {
  // 사용자의 Input을 받아 SendBtn API에게 보내기위한 State
  const [input, setInput] = useState("");

  // 최근의 입력의 State
  const [recentPrompt, setRecentPrompt] = useState("");

  // 과거의 State input 로그, 사이드 바 추가
  const [prevPrompt, setPrevPrompts] = useState([]);

  // 보여주는 State 초기 채팅 디스플레이를 숨김
  const [showResult, setShowResult] = useState(false);

  // 숨겨지면 로딩 보여줌
  const [loading, setLoading] = useState(false);

  // 결과 보여주기
  const [resultData, setResultData] = useState("");

  // API 통신 로직
  const onSend = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    // input 값이 response에 저장
    const response = await runChat(input);
    setResultData(response);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompts,
    onSend,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
