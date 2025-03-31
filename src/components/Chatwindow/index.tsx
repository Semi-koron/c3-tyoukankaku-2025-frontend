import React from "react";
import { useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { Controls } from "../../App";

type ChatWindowProps = {
  setChatData: React.Dispatch<React.SetStateAction<string>>;
  chatData: string;
  setChatWindow: React.Dispatch<React.SetStateAction<boolean>>;
  chatWindow: boolean;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

export const ChatWindow = ({
  setChatData,
  chatData,
  setChatWindow,
  chatWindow,
  setText,
}: ChatWindowProps) => {
  const [sub, _get] = useKeyboardControls<Controls>();

  useEffect(() => {
    return sub(
      ({ chat }) => ({
        chat,
      }),
      ({ chat }) => {
        if (chat && !chatWindow) {
          setChatWindow(true);
        }
      }
    );
  }, []);

  const messageSend = () => {
    setText(chatData);
    setChatWindow(false);
    setChatData("");
    // 五秒後にsetTextを空にする
    setTimeout(() => {
      setText("");
    }, 5000);
  };

  return (
    <>
      {chatWindow && (
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
    </>
  );
};
