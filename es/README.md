# flatbuffers-es

[google/flatbuffers](https://github.com/google/flatbuffers) ES modules version.

## Demo

- [https://code4fukui.github.io/flatbuffers-es/es/example/](read monster.bin in flatbuffers on browser)

## How to build

### compile flatc

```bash
cmake .
make
./flatc
```

## make es module version

```bash
cd ts
mkdir ../es
tsc --target es2020 --outDir ../es index.ts
```

### convert schema

```bash
cd es/example
# fbsからTypeScriptを生成 (--ts-flat-files 1ファイルになるから楽)
../../flatc --ts --ts-flat-files monster.fbs
# importを書き換える
gsed -i "s/'flatbuffers'/'.\/..\/index.js'/" monster_generated.ts
# TypeScriptをJavaScriptに変える
bash -c tsc -p ./tsconfig.json monster_generated.ts 
```

## write test

make monster.bin
```bash
deno run -A write.js
```

## read test

read monster.bin
```bash
deno run -A read.js
```

## comparation

write JSON & CBOR
```bash
deno run -A jsoncbor.js
ls -l monster.*
```

result
```
196byte monster.bin
147byte monster.cbor
233byte monster.json
```

## Usage

prepare a IDL file 'monster.fbs', set path to flatc
```bash
flatc --ts --ts-flat-files monster.fbs
# flatbuffersをローカルにコピー
deno bundle https://code4fukui.github.io/flatbuffers-es/es/index.js > ./fb.js
# importを書き換える
gsed -i "s/'flatbuffers'/'.\/fb.js'/" monster_generated.ts
# TypeScriptをJavaScriptに変える
bash -c tsc -p ./tsconfig.json monster_generated.ts 
# importを書き換える
gsed -i "s/'.\/fb.js'/'https:\/\/code4fukui.github.io\/flatbuffers-es\/es\/index.js'/" monster_generated.js
```

from browsers or Deno
```JavaScript
import * as flatbuffers from "https://code4fukui.github.io/flatbuffers-es/es/index.js";
import * as Sample from"./monster_generated.js";

const MyGame = { Sample };

const bytes = new Uint8Array(await (await fetch("./monster.bin")).arrayBuffer());
const buf = new flatbuffers.ByteBuffer(bytes);
const monster = MyGame.Sample.Monster.getRootAsMonster(buf);

const hp = monster.hp();
const mana = monster.mana();
const name = monster.name();
console.log({ hp, mana, name });
```
