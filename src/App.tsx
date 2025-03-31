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

export enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
  chat = "chat",
}

function App() {
  const [text, setText] = useState("");
  const [chatData, setChatData] = useState<string>("");
  const [chatWindow, setChatWindow] = useState(false);
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
            <Physics>
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
              <Player text={text} chatWindow={chatWindow} />
            </Physics>
            <Sky />
          </Suspense>
        </Canvas>
        <ChatWindow
          setChatData={setChatData}
          chatData={chatData}
          setChatWindow={setChatWindow}
          chatWindow={chatWindow}
          setText={setText}
        />
      </KeyboardControls>
    </>
  );
}

export default App;
