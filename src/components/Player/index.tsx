import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useEffect } from "react";
import { useRef } from "react";
import { Html, useKeyboardControls } from "@react-three/drei";
import { Controls } from "../../App";
import { useFrame } from "@react-three/fiber";
import { SendData } from "../../types/websocket";

type PlayerProps = {
  text: string;
  id: string;
  chatWindow: boolean;
  sendData: (data: SendData) => void;
  color: string;
};

export const Player = ({
  text,
  id,
  chatWindow,
  sendData,
  color,
}: PlayerProps) => {
  const playerRef = useRef<RapierRigidBody>(null);
  const [sub, _get] = useKeyboardControls<Controls>();

  useFrame(() => {
    if (playerRef.current) {
      const { x, y, z } = playerRef.current.translation(); //自分の現在の位置をx y zに記録するコード
      const { x: rx, y: ry, z: rz, w } = playerRef.current.rotation(); //自分の向きをrx ry rzに記録するコード
      if (y < -10 || y > 50) {
        playerRef.current.setTranslation({ x: 0, y: 1, z: 0 }, true);
        playerRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        playerRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        playerRef.current.setRotation(
          {
            x: 0,
            y: 0,
            z: 0,
            w: 1,
          },
          true
        );
      }

      //他のユーザーに送るデータ
      const data: SendData = {
        id: id, //自分の自身を識別するためのデータ
        position: {
          //自分の位置のデータ
          x: x,
          y: y,
          z: z,
        },
        rotation: {
          //自分がどちらを向いているかのデータ
          x: rx,
          y: ry,
          z: rz,
          w: w,
        },
        color: color, //自分の色のデータ
        chat: text, //自分今しゃべっている言葉のデータ
      };

      sendData(data); //データ送信
    }
  });
  // Subscribe to the keyboard controls
  useEffect(() => {
    return sub(
      ({ forward, back, left, right, jump }) => ({
        forward,
        back,
        left,
        right,
        jump,
      }),
      ({ forward, back, left, right, jump }) => {
        // キーボード入力によって行われる処理
        // playerRef.current?.applyImpulse({ x: 0, y: 0, z: -5 }, true);はzに-5の力をプレイヤーに掛けるという意味
        if (chatWindow) return;
        if (forward) {
          playerRef.current?.applyImpulse({ x: 0, y: 0, z: -5 }, true);
        }
        if (back) {
          playerRef.current?.applyImpulse({ x: 0, y: 0, z: 5 }, true);
        }
        if (left) {
          playerRef.current?.applyImpulse({ x: -5, y: 0, z: 0 }, true);
        }
        if (right) {
          playerRef.current?.applyImpulse({ x: 5, y: 0, z: 0 }, true);
        }
        if (jump) {
          playerRef.current?.applyImpulse({ x: 0, y: 5, z: 0 }, true);
        }
      }
    );
  }, [chatWindow]);

  return (
    <>
      {/* Player */}
      <RigidBody ref={playerRef} colliders="cuboid" position={[0, 1, 0]}>
        <mesh>
          <boxGeometry />
          {/* meshStandardMaterialはプレイヤーの見た目*/}
          <meshStandardMaterial color={color} />
          <Html
            center
            distanceFactor={10}
            position={[0, 1, 0]}
            style={{ width: "500px", textAlign: "center" }}
          >
            <h1>{text}</h1>
          </Html>
        </mesh>
      </RigidBody>
    </>
  );
};
