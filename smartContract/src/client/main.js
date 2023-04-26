"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendingSol = void 0;
const web3_js_1 = require("@solana/web3.js");
const fs_1 = require("fs");
const lo = require("buffer-layout");
// const BN = require("bn.js");
/**
 * Vars
 */
const SOLANA_NETWORK = "devnet";
let connection;
let programKeypair;
let programId;
let ringoKeypair;
let johnKeypair;
/**
 * Helper functions.
 */
function createKeypairFromFile(path) {
    return web3_js_1.Keypair.fromSecretKey(Buffer.from(JSON.parse((0, fs_1.readFileSync)(path, "utf-8"))));
}
function sendLamports(from, to, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = Buffer.alloc(8); // 8 bytes
        // lo.ns64("value").encode(new BN(amount), data);
        lo.ns64("value").encode(amount, data);
        let ins = new web3_js_1.TransactionInstruction({
            keys: [
                { pubkey: from.publicKey, isSigner: true, isWritable: true },
                { pubkey: to, isSigner: false, isWritable: true },
                { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            ],
            programId: programId,
            data: data,
        });
        const send = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, new web3_js_1.Transaction().add(ins), [from]);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        connection = new web3_js_1.Connection(`https://api.${SOLANA_NETWORK}.solana.com`, 'confirmed');
        programKeypair = createKeypairFromFile("/home/radeonares/Project/Jobs/NecroClub/smartContract/dist/program/program-keypair.json");
        programId = programKeypair.publicKey;
        ringoKeypair = createKeypairFromFile("/home/radeonares/Project/Jobs/NecroClub/smartContract/src/program/accounts/ringo.json");
        johnKeypair = createKeypairFromFile("/home/radeonares/Project/Jobs/NecroClub/smartContract/src/program/accounts/john.json");
        console.log("John sends some SOL to Ringo...");
        console.log(`   John's public key: ${johnKeypair.publicKey}`);
        console.log(`   Ringo's public key: ${ringoKeypair.publicKey}`);
        /* const send = await sendingSol(1000000000) */
    });
}
/* from: Keypair, to: PublicKey, */
const sendingSol = (amount) => __awaiter(void 0, void 0, void 0, function* () {
    ringoKeypair = createKeypairFromFile("/home/radeonares/Project/Jobs/NecroClub/smartContract/src/program/accounts/ringo.json");
    johnKeypair = createKeypairFromFile("/home/radeonares/Project/Jobs/NecroClub/smartContract/src/program/accounts/john.json");
    let am = 1000000000 * amount;
    const send = yield sendLamports(johnKeypair, ringoKeypair.publicKey, am).then(data => {
        return {
            message: "done"
        };
    }).catch(err => {
        return {
            err: "err"
        };
    });
    return send;
});
exports.sendingSol = sendingSol;
main().then(() => process.exit(), err => {
    console.error(err);
    process.exit(-1);
});
