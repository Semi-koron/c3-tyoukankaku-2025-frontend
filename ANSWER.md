## 解説

### 重力を作ってみよう!

重力をかけるのはとても難しそうに感じますが実はとても簡単です。

```
<Physics gravity={[0, 0, 0]}>
```

編集する部分は上記のコードで、gravity に x 軸、y 軸、z 軸それぞれにかかる重力を設定できます。
今回は y 軸、負の方向に 9.8 の重力加速度を加える必要があるので、答えは

```
<Physics gravity={[0, -9.8, 0]}>
```

となる。

### ジャンプできるようにしてみよう!

ジャンプをするには y 軸方向の正の向きに力を加える必要がある。
よってジャンプの機能を付け足すには、

```
if (jump) {
  playerRef.current?.applyImpulse({ x: 0, y: 5, z: 0 }, true);
}
```

このように、jump が true になった際(spase キーが押された場合)に力を加える様なコードを記述することでジャンプできる様になる。

### チャットウィンドウを開けるようにしてみよう!

チャットウィンドウを開くには、チャットウィンドウの状態を true,false で管理している、showChatWindow を@の中に入れる必要がある。  
showChatWindow を@と置き換えることによって、T キーを押すことで、showChatWindow が true となりチャットウィンドウを開くことができる。

### キューブの色を変更できるようにしてみよう!

キューブの色を行うにはキューブの描画を行なっているプログラムを見る必要があります。

以下のコードが Player の表示を行うコードになります。

```
{/* Player */}
<RigidBody ref={playerRef} colliders="cuboid" position={[0, 1, 0]}>
  <mesh>
    <boxGeometry />
    {/* meshStandardMaterialはプレイヤーの見た目*/}
    <meshStandardMaterial color={"#FFFFFF"} />
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
```

このコードの中に一つカラーコードが入っている部分があります。  
"#FFFFFF"の部分に注目してください。
現状 color 属性に#FFFFFF つまり白が反映されています。
ここに選択した色を格納している color を割り当ててあげることで

### 他のプレイヤーを表示してみよう!

他のプレイヤーを表示するためには

```
{
    Array.isArray(data) && data
    .filter((item) => item.id !== userId)
    .map((item, index) => <OtherPlayer key={index} data={item} />)
}
```

こちらのコードが他のユーザーを表示するための大元になります。

data がデータの集合体(配列であると確認したのちに、.filter で自分のデータを取り除いています)

さらに.map で残ったデータの一つ一つの処理を行なっており、  
item にはヒントにある通り、他のユーザーのキューブ情報の集合体である data を一つ一つ item を利用して処理を記述しています

```
<OtherPlayer key={index} data={item} />
```

となっており、他のユーザー(一人)を表示するシステムに、data(一人のキューブ情報)として item(一人のキューブ情報)を渡すことで表示する処理を data(ユーザー全員のキューブ情報)全体に処理がかかるため、受け取ったデータ全員分の表示が可能となっている。

### 他のプレイヤーに自分のデータを送信して意思疎通しよう!

他のユーザーにデータを送信するには以下のように Player.tsx の data の中身の構成を変える必要があります。

```ts
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
```

まずこちらのデータ送信の定義を読み解くには json について理解する必要があります。

```
hoge : huga
```

のような記述があった場合、
hoge はキー属性といい、データにつける名前のような立ち位置です。いわばラベルのような物です。
huga はデータ属性といい、先ほどのラベルをつけるデータを指します。

今回は posision の中身の x、y、z、rotation の中身の x, y, z, w の 7 個のキー属性に正しいデータ属性を割り振る必要があります。
position はその名の通り、位置のデータを示しています。

今回は x、y、z に位置の値が格納されており、
rx、ry、rz、w には向きの値が格納されています。

よってそれらの格納をデータ属性に適切に割り振ることによって、データを送信できます。
