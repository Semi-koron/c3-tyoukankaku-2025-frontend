import React from "react";
import { useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { Controls } from "../../App";

type ChatWindowProps = {
  setChatData: React.Dispatch<React.SetStateAction<string>>;
  chatData: string;
  setShowChatWindow: React.Dispatch<React.SetStateAction<boolean>>;
  chatWindow: boolean;
  setText: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};

export const ChatWindow = ({
  setChatData,
  chatData,
  setShowChatWindow,
  chatWindow,
  setText,
  color,
  setColor,
}: ChatWindowProps) => {
  const [sub, _get] = useKeyboardControls<Controls>();

  useEffect(() => {
    return sub(
      ({ chat }) => ({
        chat,
      }),
      ({ chat }) => {
        if (chat && !chatWindow) {
          setShowChatWindow(true);
        }
      }
    );
  }, []);

  const messageSend = () => {
    setText(chatData);
    setShowChatWindow(false);
    setChatData("");
    // 五秒後にsetTextを空にする
    setTimeout(() => {
      setText("");
    }, 5000);
  };

  return (
    <>
      {/* 課題 4
      { @ && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "0",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            zIndex: 1,
          }}
        >
          <input
            type="color"
            onChange={(e) => {
              setColor(e.target.value);
              console.log(e.target.value);
            }}
            value={color}
          />
          <input
            type="text"
            style={{
              flex: 1,
              maxWidth: "70%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            value={chatData}
            onChange={(e) => setChatData(e.target.value)}
          />
          <button
            style={{
              padding: "10px 20px",
              background: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => {
              messageSend();
            }}
          >
            Send
          </button>
        </div>
      )}
      */}
    </>
  );
};
