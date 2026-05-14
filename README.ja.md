# flatbuffers-es

公式の [google/flatbuffers](https://github.com/google/flatbuffers) ライブラリのESモジュール版であり、ブラウザ、Deno、Node.jsなどのモダンなJavaScript環境向けに設計されています。

## デモ

- [ブラウザで`monster.bin`ファイルを読み込む](https://code4fukui.github.io/flatbuffers-es/es/example/)

## 特徴

-   **ESモジュールネイティブ:** バンドラーなしでブラウザやモダンなランタイムに直接インポート可能です。
-   **高パフォーマンス:** FlatBuffersのメモリ効率を活用し、パースやアンパックを一切行わずにシリアライズされたデータにアクセスできます。
-   **TypeScript対応:** `flatc`コンパイラのTypeScriptジェネレータで生成されたコードとシームレスに動作します。
-   **クロスプラットフォーム:** FlatBuffersがサポートするすべての言語（C++、Java、Python、Rustなど）と互換性のあるバイナリデータの作成および読み込みが可能です。

## 前提条件

-   メインの [google/flatbuffers](https://github.com/google/flatbuffers) プロジェクトの`flatc`コンパイラ。
-   ESモジュールをサポートするJavaScriptランタイム（例: Deno、Node.js、またはモダンなウェブブラウザ）。
-   （オプション）生成されたコードをJavaScriptに変換するためのTypeScriptコンパイラ（`tsc`）。

## 使用方法

ワークフローは主に2つのステップで構成されます。スキーマからのコード生成と、そのコードのアプリケーションでの使用です。

### 1. コード生成

最初に、FlatBuffersスキーマ（`.fbs`）ファイルからTypeScriptコードを生成する必要があります。生成されたコードは`flatbuffers`モジュールをインポートするため、このライブラリのローカルコピーに対してコンパイルする必要があります。

```bash
# ステップ1: スキーマからTypeScriptを生成します。
# 単一ファイルを出力するために --ts-flat-files フラグの使用を推奨します。
flatc --ts --ts-flat-files monster.fbs

# ステップ2: flatbuffers-esモジュールをローカルファイルとしてダウンロードします。
deno bundle https://code4fukui.github.io/flatbuffers-es/es/index.js > flatbuffers.js

# ステップ3: 生成されたファイルがローカルモジュールをインポートするようにパッチを当てます。
# （macOS/Linuxでは `sed` が便利です。Windowsでは手動でファイルを編集する必要があるかもしれません。）
sed -i "s/'flatbuffers'/'.\/flatbuffers.js'/" monster_generated.ts

# ステップ4: 生成されたTypeScriptをJavaScriptにコンパイルします。
tsc --target es2020 --module es2020 monster_generated.ts
```

これで、アプリケーションで使用する `monster_generated.js` と `flatbuffers.js` の準備が整いました。

### 2. アプリケーションコード

これで、生成されたコードをインポートし、FlatBuffersのバイナリデータを読み込むことができます。以下の例は、ブラウザとDenoの両方で動作します。

```javascript
// flatbuffers-esランタイムと生成されたコードをインポートします。
import * as flatbuffers from "https://code4fukui.github.io/flatbuffers-es/es/index.js";
import * as Sample from "./monster_generated.js";

// ゲームデータの名前空間エイリアスを作成します。
const MyGame = { Sample };

// バイナリデータをフェッチし、ByteBufferにラップします。
const response = await fetch("./monster.bin");
const bytes = new Uint8Array(await response.arrayBuffer());
const buf = new flatbuffers.ByteBuffer(bytes);

// FlatBufferのルートオブジェクトにアクセスします。
const monster = MyGame.Sample.Monster.getRootAsMonster(buf);

// monsterオブジェクトからデータを読み取ります。
const hp = monster.hp();
const mana = monster.mana();
const name = monster.name();

console.log({ hp, mana, name }); // { hp: 80, mana: 150, name: "Orc" }
```

## ライセンス

Apache License Version 2.0
