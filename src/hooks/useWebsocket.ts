import { useEffect, useState, useRef, useCallback } from "react";
import { ReceiveData, SendData } from "../types/websocket";

// 32文字のランダムな文字列を生成
const generateRandomId = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length: 32 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

export const useWebSocket = () => {
  const url = "wss://c3-tyoukankaku-backend.semikoron.org";
  const [data, setData] = useState<ReceiveData>([]);
  const ws = useRef<WebSocket | null>(null);
  const userId = useRef<string>(generateRandomId()); // 一度だけ生成

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      try {
        const parsedData: ReceiveData = JSON.parse(event.data);
        setData(parsedData);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  // データ送信関数
  const sendData = useCallback((data: SendData) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  }, []);

  return { data, sendData, userId: userId.current };
};
