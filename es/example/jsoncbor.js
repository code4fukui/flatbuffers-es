import { CBOR } from "https://js.sabae.cc/CBOR.js";

const monster = {
  pos: { x: 1.0, y: 2.0, z: 3.0 },
  mana: 150,
  hp: 100,
  name: "Orc",
  inventory: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  color: 2, // Blue
  weapons: [
    { name: "Sword", damage: 3 },
    { name: "Axe", damage: 3 },
  ],
  equipped: "",
  path: [
    { x: 1.0, y: 2.0, z: 3.0 },
    { x: 4.0, y: 5.0, z: 6.0 },
  ],
};

await Deno.writeTextFile("monster.json", JSON.stringify(monster));
await Deno.writeFile("monster.cbor", CBOR.encode(monster));
