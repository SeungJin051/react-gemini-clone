import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

export const Main = () => {
  // Context API로 상태와 함수를 가져옴
  const {
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
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user_icon" />
      </div>
      <div className="main-container">
        {/* input에 값을 입력시 실행되는 조건문 */}
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>승진님, 안녕하세요</span>
              </p>
              <p>무엇을 도와드릴까요?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>유튜브 채널 팁</p>
                <img src={assets.compass_icon} alt="compass_icon" />
              </div>
              <div className="card">
                <p>사물의 작동 원리</p>
                <img src={assets.bulb_icon} alt="bulb_icon" />
              </div>
              <div className="card">
                <p>언어 학습 계획</p>
                <img src={assets.message_icon} alt="message_icon" />
              </div>
              <div className="card">
                <p>제품의 장단점</p>
                <img src={assets.code_icon} alt="code_icon" />
              </div>
            </div>
          </>
        ) : (
          // input 전송시 실행, 사용자의 질문과 Gemini의 값을 출력
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user_icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini_icon" />
              {/* 동적으로 렌더링하는 방법을 보여줍니다. 구체적으로 `dangerouslySetInnerHTML` 속성은 이름에서 알 수 있듯이 잠재적인 위험성을 내포하고 있어 주의가 필요합니다. */}
              <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                <div className="loader">
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            {/* input 값을 받기 */}
            <input
              onChange={(event) => {
                // input 값을 받아서 setInput()함수로 API에게 보냄
                setInput(event.target.value);
              }}
              value={input}
              type="text"
              placeholder="여기에 프롬프트 입력"
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery_icon" />
              <img src={assets.mic_icon} alt="mic_icon" />
              <img
                onClick={() => {
                  onSend();
                }}
                src={assets.send_icon}
                alt="send_icon"
              />
            </div>
          </div>
          <p className="bottom-info">
            Gemini가 인물 등에 관한 부정확한 정보를 표시할 수 있으므로 대답을
            재확인하세요. <u>개인 정보 보호 및 Gemini 앱</u>
          </p>
        </div>
      </div>
    </div>
  );
};
