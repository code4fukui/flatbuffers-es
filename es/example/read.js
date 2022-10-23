import * as flatbuffers from 'https://code4fukui.github.io/flatbuffers-es/es/index.js';
import * as Sample from"./monster_generated.js";

const MyGame = { Sample };

const bytes = new Uint8Array(await Deno.readFile("./monster.bin"));
const buf = new flatbuffers.ByteBuffer(bytes);
 
// Get an accessor to the root object inside the buffer.
const monster = MyGame.Sample.Monster.getRootAsMonster(buf);

const hp = monster.hp();
const mana = monster.mana();
const name = monster.name();
console.log({ hp, mana, name });

const pos = monster.pos();
const x = pos.x();
const y = pos.y();
const z = pos.z();
console.log({ x, y, z });

const invLength = monster.inventoryLength();
const thirdItem = monster.inventory(2);
console.log({ invLength, thirdItem });

const weaponsLength = monster.weaponsLength();
const secondWeaponName = monster.weapons(1).name();
const secondWeaponDamage = monster.weapons(1).damage();
console.log({ weaponsLength, secondWeaponName, secondWeaponDamage });

const unionType = monster.equippedType();
console.log({ unionType });
if (unionType == MyGame.Sample.Equipment.Weapon) {
  const weaponName = monster.equipped(new MyGame.Sample.Weapon()).name();     // "Axe"
  const weaponDamage = monster.equipped(new MyGame.Sample.Weapon()).damage(); // 5
  console.log({ weaponName, weaponDamage })
}
