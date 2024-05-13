import "./Sidebar.css";
import { assets } from "../../assets/assets"; // assets 폴더의 이미지 관리 assets.js
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Context } from "../../context/Context";

// Gemini Sidebar Components
export const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSend, prevPrompts, setRecentPrompt } = useContext(Context); // context api로 가져옴

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSend(prompt);
  };
  // 최상단 div는 상단과 하단이 될 두개의 div를 만들것
  // top -> 상단 메뉴 = menu, new-chat, recent
  return (
    // 상태에 따라 사이드바의 너비를 조정하여 애니메이션을 적용
    <motion.div
      className="sidebar"
      initial={{ width: "90px" }} // 초기 width 90px
      animate={{ width: extended ? "280px" : "90px" }} //extended 상태에 따라 사이드바의 너비를 조정하여 애니메이션을 적용
      exit={{ width: "30px" }} // 언마운트시 width 30px
    >
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
            {prevPrompts && prevPrompts.length > 0
              ? prevPrompts.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        loadPrompt(item);
                      }}
                      className="recent-entry"
                      key={index}
                    >
                      <img src={assets.message_icon} alt="message_icon" />
                      {/* 값이 길면 넘쳐서 자르기~ */}
                      <p>{item.slice(0, 18)} ...</p>
                    </div>
                  );
                })
              : null}
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
    </motion.div>
  );
};
