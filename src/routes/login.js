import crypto from "crypto";

import { Router } from "express";

import {
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";

import { challenges } from "../utils/challenges.js";

import { db, auth } from "../firebase.js";
import { EXPECTED_ORIGIN, RP_ID } from "../config.js";

const router = Router();

router.post("/options", async (req, res) => {
  try {
    const options = await generateAuthenticationOptions({
      rpID: RP_ID,
      userVerification: "preferred",
    });

    const challengeId = crypto.randomUUID();

    challenges.set(challengeId, options.challenge);

    res.json({
      challengeId,
      options,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { challengeId, authenticationResponse } = req.body;

    const credentialId = authenticationResponse.id;

    const passkeyDoc = await db.collection("passkeys").doc(credentialId).get();

    if (!passkeyDoc.exists) {
      return res.status(404).json({
        error: "Passkey not found",
      });
    }

    const passkey = passkeyDoc.data();

    const uid = passkey.uid;

    const verification = await verifyAuthenticationResponse({
      response: authenticationResponse,

      expectedChallenge: challenges.get(challengeId),

      expectedOrigin: EXPECTED_ORIGIN,

      expectedRPID: RP_ID,

      credential: {
        id: passkey.credentialID,

        publicKey: Uint8Array.from(Buffer.from(passkey.publicKey, "base64")),

        counter: passkey.counter,

        transports: passkey.transports,
      },
    });

    if (!verification.verified) {
      return res.status(401).json({
        error: "Verification failed",
      });
    }

    const newCounter = verification.authenticationInfo.newCounter;

    await db
      .collection("users")
      .doc(uid)
      .collection("passkeys")
      .doc(credentialId)
      .update({
        counter: newCounter,
      });

    await db.collection("passkeys").doc(credentialId).update({
      counter: newCounter,
      lastUsedAt: new Date(),
    });

    const customToken = await auth.createCustomToken(uid);

    challenges.delete(challengeId);

    res.json({
      verified: true,
      customToken,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
