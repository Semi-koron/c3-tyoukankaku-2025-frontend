import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useEffect } from "react";
import { useRef } from "react";
import { Html, useKeyboardControls } from "@react-three/drei";
import { Controls } from "../../App";
import { useFrame } from "@react-three/fiber";

type PlayerProps = {
  text: string;
  chatWindow: boolean;
};

export const Player = ({ text, chatWindow }: PlayerProps) => {
  const playerRef = useRef<RapierRigidBody>(null);
  const [sub, _get] = useKeyboardControls<Controls>();

  useFrame(() => {
    if (playerRef.current) {
      const { y } = playerRef.current.translation();
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
      <RigidBody
        ref={playerRef}
        colliders="cuboid"
        position={[0, 1, 0]}
        restitution={0.5}
      >
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
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
