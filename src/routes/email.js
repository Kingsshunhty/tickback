import { Router } from "express";
import { Resend } from "resend";
import React from "react";

import { db } from "../firebase.js";

import WelcomeEmail from "../templates/WelcomeEmail.js";
import { render } from "@react-email/render";

import TransferInitiatedEmail from "../emails/TransferInitiatedEmail.jsx";
import TransferInvitationEmail from "../emails/TransferInvitationEmail.jsx";

const router = Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/test", async (req, res) => {
  try {
    const { email } = req.body;

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "TickOnt Email Test",
      html: `
          <h1>Hello from TickOnt</h1>
          <p>Your email system is working.</p>
        `,
    });

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/welcome", async (req, res) => {
  try {
    const { email, firstName } = req.body;

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM,

      to: email,

      subject: "Welcome to TickOnt",

      html: WelcomeEmail({
        firstName,
      }),
    });

    res.json({
      success: true,
      emailId: result.data?.id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/transfer", async (req, res) => {
  try {
    const { transferId } = req.body;

    const transferDoc = await db.collection("transfers").doc(transferId).get();

    if (!transferDoc.exists) {
      return res.status(404).json({
        success: false,
        error: "Transfer not found",
      });
    }

    const transfer = transferDoc.data();

    const senderDoc = await db
      .collection("users")
      .doc(transfer.senderUid)
      .get();

    const sender = senderDoc.data();

    const senderEmail = sender.email;

    const receiverEmail = transfer.emailOrMobile;

    const html = await render(
      React.createElement(TransferInitiatedEmail, {
        recipientName: `${transfer.firstName} ${transfer.lastName}`,
        recipientEmail: transfer.emailOrMobile,
        eventTitle: transfer.eventTitle,
        eventDateTime: transfer.eventDateTime,
        eventLocation: transfer.eventLocation,
        eventCoverImage: transfer.eventCoverImage,
        seatNo: transfer.seatNo,
        admissionType: transfer.admissionType,
        section: transfer.section,
        row: transfer.row,
        seats: transfer.seats,
      }),
    );

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: "gertitrappl@gmail.com",
      subject: "Transfer Initiated",
      html: html,
    });

    const acceptUrl = `localhost:5173/tickets?action=accept-transfer&transferId=${transferId}`;

    const recipientHtml = await render(
      React.createElement(TransferInvitationEmail, {
        senderName: sender.name || sender.displayName || "A TickOnt User",

        recipientName: transfer.firstName,

        transferId,

        eventTitle: transfer.eventTitle,

        eventDateTime: transfer.eventDateTime,

        eventLocation: transfer.eventLocation,

        eventCoverImage: transfer.eventCoverImage,

        admissionType: transfer.admissionType,

        section: transfer.section,

        row: transfer.row,

        seatNo: transfer.seatNo,

        seats: transfer.seats,

        acceptUrl,
      }),
    );

    await resend.emails.send({
      from: process.env.EMAIL_FROM,

      to: "gertitrappl@gmail.com", // temporary

      subject: `You've received tickets for ${transfer.eventTitle}`,

      html: recipientHtml,
    });

    //   await resend.emails.send({
    //     from: process.env.EMAIL_FROM,
    //     to: receiverEmail,
    //     subject: "You've Received A Ticket",
    //     html: `
    //   <h1>Ticket Transfer</h1>

    //   <p>
    //     You've received a ticket for:
    //     ${transfer.eventTitle}
    //   </p>
    // `,
    //   });

    // sender email

    // recipient email

    console.log(html);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
