import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
    TransactionInstruction,
} from '@solana/web3.js';
import { readFileSync } from "fs";
import path from 'path';

const lo = require("buffer-layout");
// const BN = require("bn.js");



/**
 * Vars
 */

const SOLANA_NETWORK = "devnet";

let connection: Connection;
let programKeypair: Keypair;
let programId: PublicKey;

let ringoKeypair: Keypair;
let johnKeypair: Keypair;



/**
 * Helper functions.
 */

function createKeypairFromFile(path: string): Keypair {
    return Keypair.fromSecretKey(
        Buffer.from(JSON.parse(readFileSync(path, "utf-8")))
    )
}


async function sendLamports(from: Keypair, to: PublicKey, amount: number) {

    let data = Buffer.alloc(8) // 8 bytes
    // lo.ns64("value").encode(new BN(amount), data);
    lo.ns64("value").encode(amount, data);
    let ins = new TransactionInstruction({
        keys: [
            { pubkey: from.publicKey, isSigner: true, isWritable: true },
            { pubkey: to, isSigner: false, isWritable: true },
            { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        programId: programId,
        data: data,
    })

    const send: any = await sendAndConfirmTransaction(
        connection,
        new Transaction().add(ins),
        [from]
    )
        return send
}


async function main() {

    connection = new Connection(
        `https://api.${SOLANA_NETWORK}.solana.com`, 'confirmed'
    );

    programKeypair = createKeypairFromFile(
        "/home/radeonares/Project/Jobs/NecroClub/smartContract/dist/program/program-keypair.json"

    );

    programId = programKeypair.publicKey;
    ringoKeypair = createKeypairFromFile("/home/radeonares/Project/Jobs/NecroClub/smartContract/src/program/accounts/ringo.json");
    johnKeypair = createKeypairFromFile("/home/radeonares/Project/Jobs/NecroClub/smartContract/src/program/accounts/john.json");

    console.log("John sends some SOL to Ringo...");
    console.log(`   John's public key: ${johnKeypair.publicKey}`);
    console.log(`   Ringo's public key: ${ringoKeypair.publicKey}`);
    /* const send = await sendingSol(1000000000) */
   
}

/* from: Keypair, to: PublicKey, */
export const sendingSol = async ( amount: number) => {
    ringoKeypair = createKeypairFromFile("/home/radeonares/Project/Jobs/NecroClub/smartContract/src/program/accounts/ringo.json");
    johnKeypair = createKeypairFromFile("/home/radeonares/Project/Jobs/NecroClub/smartContract/src/program/accounts/john.json");
    let am = 1000000000 * amount
    const send: any = await sendLamports(johnKeypair, ringoKeypair.publicKey, am).then(data => {
        return {
            message: "done"
        }
    }).catch(err => {
        console.log(err);
        return {
            err: "err"
        }
    })
    
    return send
}