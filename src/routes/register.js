import { Router } from "express";

import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";

import { challenges } from "../utils/challenges.js";
import { db } from "../firebase.js";

const router = Router();

router.post("/options", async (req, res) => {
  try {
    const { uid, email } = req.body;

    const options = await generateRegistrationOptions({
      rpName: "TickOnt",

      rpID: "localhost",

      userID: new TextEncoder().encode(uid),

      userName: email,

      attestationType: "none",

      authenticatorSelection: {
        residentKey: "required",
        userVerification: "preferred",
      },
    });

    challenges.set(uid, options.challenge);

    res.json(options);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { uid, registrationResponse } = req.body;

    const expectedChallenge = challenges.get(uid);

    const verification = await verifyRegistrationResponse({
      response: registrationResponse,

      expectedChallenge,

      expectedOrigin: "http://localhost:5173",

      expectedRPID: "localhost",

      requireUserVerification: true,
    });

    if (verification.verified) {
      const credential = verification.registrationInfo.credential;

      const passkeyData = {
        uid,

        credentialID: credential.id,

        publicKey: Buffer.from(credential.publicKey).toString("base64"),

        counter: credential.counter,

        transports: credential.transports,

        createdAt: new Date(),
      };

      await db
        .collection("users")
        .doc(uid)
        .collection("passkeys")
        .doc(credential.id)
        .set(passkeyData);

      await db.collection("passkeys").doc(credential.id).set(passkeyData);

      challenges.delete(uid);
    }

    res.json({
      verified: verification.verified,

      registrationInfo: verification.registrationInfo,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
