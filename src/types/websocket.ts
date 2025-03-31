export type SendData = {
  id: string;
  color: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
    w: number;
  };
  chat: string;
};

export type ReceiveData = SendData[];
