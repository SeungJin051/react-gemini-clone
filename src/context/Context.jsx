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
  const [prevPrompts, setPrevPrompts] = useState([]); // 아오 !

  // 보여주는 State 초기 채팅 디스플레이를 숨김
  const [showResult, setShowResult] = useState(false);

  // 숨겨지면 로딩 보여줌
  const [loading, setLoading] = useState(false);

  // 결과 보여주기
  const [resultData, setResultData] = useState("");

  // 타이핑시 효과 로직 (입력 필드에 대한 AI 값을 받은 데이터 텍스트)
  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // API 통신 로직
  const onSend = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      // 최근 항목 클릭시 작동
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      // 입력 필드 실행할 때 명령문 실행
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }

    console.log(typeof response); // Log the type of response

    // ** 제거
    let resArray = response.split("**");
    let newRes = "";
    // ** 제거 i가 0이거나 홀수인지를 확인
    for (let i = 0; i < resArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newRes += resArray[i];
      } else {
        // ** -> bold 처리
        newRes += "<b>" + resArray[i] + "</b>";
      }
    }

    // ** 제거 i가 0이거나 홀수인지를 확인
    for (let i = 0; i < resArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newRes += resArray[i];
      } else {
        // ** -> bold 처리
        newRes += "<b>" + resArray[i] + "</b>";
      }
    }
    // 링크를 a 태그로 감싸서 href 처리
    newRes = newRes.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank">$1</a>'
    );

    // 문자열을 배열로 분할하여 각각의 단어를 적절한 딜레이와 함께 표시
    let newRes2 = newRes.split("*").join("</br>");

    // ## 정규 표현식으로 제거
    newRes2 = newRes2.replace(/##/g);
    let newResArray = newRes2.split(" ");
    for (let i = 0; i < newResArray.length; i++) {
      const nextWord = newResArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSend,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
