## 超感覚 C3 講座 2025 HACK

**課題 1**
表示されるキューブを動かしてみよう!

**課題 2**
重力を作ってみよう!

**課題 3**
ジャンプできるようにしてみよう!

**課題 4**
チャットウィンドウを開けるようにしてみよう!

**課題 5**
キューブの色を変更できるようにしてみよう!

課題 7 では自分のキューブの色を変えてみよう
編集するコード
/src/components/Player.tsx/index.tsx
おそらく 112 行目あたり、
チャット欄の左隅にある小さなボタンを押すと色を選択することができるよ！
この色は color という変数(データ)の中に格納されているので、
この値をキューブに反映させてみよう！

ヒント:カラーコードは#XXXXXX のような形式で表され(X は 16 進数)、color にもその値が格納されているよ
("#XXXXXX"のような形式で、"も含まれている)

**課題 6**
他のプレイヤーを表示してみよう!

課題 6 では他のユーザーの動かすキューブの情報を画面に表示できるようにしてみよう

編集するコード
/src/App.tsx
おそらく 72 行目あたり、受信したデータは全て変数 data に含まれる。
つまり data の中身はユーザーの人数分のキューブのデータの集合体です！
今回はそのデータを OtherPlayer を使って表示させるために OtherPlayer の@の代わりに渡すべき値を考えてみよう！
map 関数について、map 関数はデータの集合体を一つずつ処理することができるめちゃ便利な機能
コードで次のような部分を見つけて、答えを考えてみよう！
.map((A, B)=> ここに A と B を使った表示)
※A には集合体のデータを一つ取り出し次の処理に繋げる事ができる。
※B には集合体の中の何個目のデータなのかの数を取り出せる。

**課題 7**
他のプレイヤーに自分のデータを送信して意思疎通しよう!

課題 7 では自分の動かすキューブの情報を他のユーザーに送信できるようにしてみよう。

編集するコード
/src/components/Player/index.tsx
おそらく 49 行目あたり、
他のユーザーに送るための変数(データ)data を定義する。(この data は App.tsx で出てきた data とは別物だよ)
ソースコード上の説明を読みつつ、@に適切な変数を当てはめてみよう。
