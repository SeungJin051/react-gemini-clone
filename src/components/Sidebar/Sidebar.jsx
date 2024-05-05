import "./Sidebar.css";
import { assets } from "../../assets/assets"; // assets 폴더의 이미지 관리 assets.js
import { useState } from "react";

// Gemini Sidebar Components
export const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  // 최상단 div는 상단과 하단이 될 두개의 div를 만들것
  // top -> 상단 메뉴 = menu, new-chat, recent
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)} // 함수의 이전 값의 반대를 반환 (false -> true)
          className="menu"
          src={assets.menu_icon}
          alt="menu_icon"
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="plus_icon" />
          {/* sidebar의 상태에 따라 조건문을 통해 보이고 안보이고를 설정 */}
          {extended ? <p>새 채팅</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">최근</p>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="message_icon" />
              <p>GPT-4 대 제미니</p>
            </div>
          </div>
        ) : null}
      </div>
      {/* bottom */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="question_icon" />
          {extended ? <p>도움말</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="history_icon" />
          {extended ? <p>활동</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="setting_icon" />
          {extended ? <p>설정</p> : null}
        </div>
      </div>
    </div>
  );
};
