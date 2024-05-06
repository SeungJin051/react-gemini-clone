import { assets } from "../../assets/assets";
import "./Main.css";

export const Main = () => {
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user_icon" />
      </div>
      <div className="main-container">
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
        <div className="main-bottom">
          <div className="search-box">
            <input type="text" placeholder="여기에 프롬프트 입력" />
            <div>
              <img src={assets.gallery_icon} alt="gallery_icon" />
              <img src={assets.mic_icon} alt="mic_icon" />
              <img src={assets.send_icon} alt="send_icon" />
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
