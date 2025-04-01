import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense } from "react";
import "./App.css";
import { useMemo, useState } from "react";
import { KeyboardControlsEntry } from "@react-three/drei";
import { KeyboardControls } from "@react-three/drei";
import { Player } from "./components/Player";
import { ChatWindow } from "./components/Chatwindow";
import { useWebSocket } from "./hooks/useWebsocket";
import { OtherPlayer } from "./components/OtherPlayer";

export enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
  chat = "chat",
}

function App() {
  // プログラミングで必要な変数(データ)を管理するところ
  const [text, setText] = useState("");
  const [chatData, setChatData] = useState<string>("");
  const [chatWindow, setChatWindow] = useState(false); // chatのウィンドウを状態(開いている/開いてない)を管理する変数
  const [color, setColor] = useState("#ffffff"); // プレイヤーの色を管理する変数
  const { data, sendData, userId } = useWebSocket(); // オンラインに接続し、他プレイヤーのデータを受け取る、他プレイヤーにデータを送る

  // キーボード入力を扱う変数
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.chat, keys: ["KeyT"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  return (
    <>
      <KeyboardControls map={map}>
        <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
          <Suspense>
            <directionalLight position={[5, 10, 5]} intensity={5} />
            {/* Physicsは3D空間上にかかる重力の設定ができる。x軸、y軸、z軸のどの軸でも重力を変更することができる */}
            <Physics>
              {/* ステージのプログラム */}
              <RigidBody type="fixed">
                <mesh position={[0, -1, 0]}>
                  <boxGeometry args={[15, 1, 15]} />
                  <meshStandardMaterial
                    color="green"
                    roughness={0.5}
                    metalness={0.5}
                  />
                </mesh>
              </RigidBody>
              {/* Player */}
              <Player
                text={text}
                chatWindow={chatWindow}
                sendData={sendData}
                color={color}
                id={userId}
              />
            </Physics>
            {Array.isArray(data) &&
              data
                .filter((item) => item.id !== userId)
                .map((item, index) => <OtherPlayer key={index} data={item} />)}
            <Sky />
          </Suspense>
        </Canvas>
        {/* Chatwindowではcolorに(cubeにこれから割り当てる"予定")色をchatDataに(これから送信する"予定"の)メッセージを保存できる */}
        <ChatWindow
          setChatData={setChatData}
          chatData={chatData}
          setChatWindow={setChatWindow}
          chatWindow={chatWindow}
          setText={setText}
          color={color}
          setColor={setColor}
        />
      </KeyboardControls>
    </>
  );
}

export default App;
