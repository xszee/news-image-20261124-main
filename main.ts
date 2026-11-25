// "THE WORLD IN ONE DAY" — Tuesday 24 November 2026, in one image.
//
// The front page in entry.png sums up the world's news of 24 Nov 2026
// (lead: Nvidia reinstates Jensen Huang as CEO after Trump intervenes;
// also the ICJ Rohingya ruling, Shenzhou-24, the UN's call for global AI
// safety rules, and the Nepal earthquake). The picture itself was composed
// by the entrant in ChatGPT from a researched prompt; this program only
// checks that the file the judge will see is a whole, in-limits image and
// copies it to the output directory, so both grader runs produce
// byte-identical output. Node 22, standard library only, no network.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = new URL("./entry.png", import.meta.url);
const DEST_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const DEST_NAME = "entry.png";
const LIMIT = 1048576;
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function fail(why: string): never {
  console.error(`entry rejected: ${why}`);
  process.exit(1);
}

function pngDims(buf: Buffer): [number, number] {
  if (buf.toString("latin1", 12, 16) !== "IHDR") fail("PNG has no IHDR chunk");
  return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
}

function jpegDims(buf: Buffer): [number, number] {
  // Walk JPEG markers until the first Start Of Frame (baseline/progressive).
  let off = 2;
  while (off + 9 <= buf.length) {
    if (buf[off] !== 0xff) fail("JPEG marker stream is broken");
    const marker = buf[off + 1];
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      off += 2;
      continue;
    }
    const len = buf.readUInt16BE(off + 2);
    if (marker === 0xda) fail("scan data starts before any Start Of Frame");
    if (marker === 0xc0 || marker === 0xc2) {
      return [buf.readUInt16BE(off + 7), buf.readUInt16BE(off + 5)];
    }
    off += 2 + len;
  }
  fail("JPEG has no Start Of Frame marker");
}

if (!existsSync(ENTRY)) fail("entry.png is missing from the repository");
const pic = readFileSync(ENTRY);
if (pic.length > LIMIT) fail(`entry.png is ${pic.length} bytes, over the 1 MiB limit`);

let dims: [number, number];
let kind: string;
if (pic.subarray(0, 8).equals(PNG_SIG)) {
  kind = "PNG";
  dims = pngDims(pic);
} else if (pic[0] === 0xff && pic[1] === 0xd8 && pic[2] === 0xff) {
  kind = "JPEG";
  dims = jpegDims(pic);
} else {
  fail("entry.png is neither a PNG nor a JPEG");
}
if (dims[0] !== 1024 || dims[1] !== 1024) {
  fail(`entry.png is ${dims[0]}x${dims[1]}, expected 1024x1024`);
}

mkdirSync(DEST_DIR, { recursive: true });
const dest = join(DEST_DIR, DEST_NAME);
writeFileSync(dest, pic);

const back = readFileSync(dest);
const want = createHash("sha256").update(pic).digest("hex");
const got = createHash("sha256").update(back).digest("hex");
if (back.length !== pic.length || got !== want) {
  fail("output bytes differ from entry.png");
}
console.log(`wrote ${dest} (${back.length} bytes, ${dims[0]}x${dims[1]} ${kind}, sha256 ${got})`);
