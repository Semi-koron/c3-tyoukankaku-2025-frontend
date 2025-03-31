import { Html } from "@react-three/drei";
import { SendData } from "../../types/websocket";
import * as THREE from "three";

type OtherPlayerProps = {
  data: SendData;
};

export const OtherPlayer = ({ data }: OtherPlayerProps) => {
  const position = new THREE.Vector3(
    data.position.x,
    data.position.y,
    data.position.z
  );
  const rotation = new THREE.Euler(
    data.rotation.x,
    data.rotation.y,
    data.rotation.z
  );

  return (
    <>
      {/* Player */}
      <mesh position={position} rotation={rotation}>
        <boxGeometry />
        <meshStandardMaterial color={data.color} />
        <Html
          center
          distanceFactor={10}
          position={[0, 1, 0]}
          style={{ width: "500px", textAlign: "center" }}
        >
          <h1>{data.chat}</h1>
        </Html>
      </mesh>
    </>
  );
};
