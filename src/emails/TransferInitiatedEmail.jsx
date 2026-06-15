import React from "react";
import { Html, Body, Tailwind } from "@react-email/components";

export default function TransferInitiatedEmail({
  recipientName,
  recipientEmail,

  eventTitle,
  eventDateTime,
  eventLocation,
  eventCoverImage,

  admissionType,
  section,
  row,
  seats,
  seatNo,
}) {
  return (
    <Html>
      <Tailwind>
        <Body>
          <div
            style={{
              color: "#ffffff",
              padding: "8px 0",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <div
              style={{
                backgroundColor: "#171717",
                width: "380px",
                margin: "0 auto",
                position: "relative",
                overflowX: "clip",
                paddingBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  position: "absolute",
                  top: "175px",
                  left: "310px",
                }}
              >
                <div className="w-12 h-12 bg-[#024bde] rounded-full shadow-[0_0_105px_rgba(2,75,222,0.5)]"></div>
                <div className="w-12 h-12 bg-[#024bde] rounded-full shadow-[0_0_105px_rgba(2,75,222,0.5)]"></div>
              </div>
              <div
                style={{
                  padding: "0 20px",
                }}
              >
                <img
                  src={`https://res.cloudinary.com/domlob3pr/image/upload/v1781445850/ticketmasterw_uzc40u.png`}
                  alt="TickOnt"
                  style={{
                    width: "125px",
                    marginTop: "20px",
                  }}
                />
              </div>

              <div
                style={{
                  fontWeight: 800,
                  fontSize: "36px",
                  lineHeight: "36px",
                  padding: "0 20px",
                }}
              >
                <p>TRANSFER SENT</p>
              </div>
              <div
                style={{
                  fontWeight: 700,
                  marginTop: "8px",
                  marginBottom: "60px",
                  fontSize: "14px",
                  lineHeight: "16px",
                  textTransform: "uppercase",
                  padding: "0 20px",
                }}
              >
                <p>
                  YOUR TICKET TRANSFER TO {recipientName} IS ON THE WAY. AND IS
                  AWAITING ACCEPTANCE.
                </p>
              </div>

              <div
                style={{
                  fontWeight: 700,
                  fontSize: "21px",
                  lineHeight: "24px",
                  padding: "0 20px",
                }}
              >
                <p>{eventTitle}</p>
              </div>

              <div className="font-bold">
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "8px",
                    padding: "0 20px",
                  }}
                >
                  {eventDateTime}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "8px",
                    padding: "0 20px",
                  }}
                >
                  {eventLocation}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "12px",
                    marginTop: "28px",
                    padding: "0 20px",
                    display: "inline-block",
                  }}
                >
                  <span>
                    <img
                      src="https://res.cloudinary.com/domlob3pr/image/upload/v1781454030/h_jzyiis.png"
                      alt=""
                      style={{
                        width: "17px",
                        height: "17px",
                        display: "inline-block",
                      }}
                    />
                  </span>

                  <span className="ml-1.5">
                    <span className="text-xs mr-1.5">x</span>
                    {seats}{" "}
                    <span className="ml-1">ticket(s) pending acceptance</span>
                  </span>
                </p>
              </div>

              <div
                style={{
                  padding: "0 20px",
                }}
              >
                <table
                  width="100%"
                  style={{
                    marginTop: "40px",
                    fontWeight: 800,
                    fontSize: "13px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td>TRANSFER DETAIL(S)</td>
                      <td align="right">{seats} x ticket(s)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {Array.from({ length: seats }).map((_, i) => {
                const baseSeat = seatNo ? Number(seatNo) : null;
                const dynamicSeat = baseSeat !== null ? baseSeat + i : null;
                return (
                  <div
                    style={{
                      padding: "0 20px",
                    }}
                  >
                    <table
                      width="100%"
                      style={{
                        marginTop: "12px",
                        borderTop: "4px solid #024bde",
                        backgroundColor: "#262626",
                        borderCollapse: "collapse",
                        fontSize: "12px",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              padding: "5px",
                              paddingLeft: "10px",
                              fontWeight: 700,
                            }}
                          >
                            Admission
                          </td>

                          <td
                            style={{
                              padding: "5px",
                              fontWeight: 700,
                            }}
                          >
                            Section
                          </td>

                          <td
                            style={{
                              padding: "5px",
                              fontWeight: 700,
                            }}
                          >
                            Row
                          </td>

                          <td
                            style={{
                              padding: "5px",
                              fontWeight: 700,
                            }}
                          >
                            Seat
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              padding: "5px",
                              paddingLeft: "10px",
                            }}
                          >
                            {admissionType}
                          </td>

                          <td style={{ padding: "5px" }}>{section}</td>

                          <td style={{ padding: "5px" }}>{row || "-"}</td>

                          <td style={{ padding: "5px" }}>
                            {dynamicSeat || "-"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}

              <div
                style={{
                  padding: "0 20px",
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    margin: "52px 0",
                    fontSize: "12px",
                    lineHeight: "18px",
                  }}
                >
                  <p className="text-[13px] font-extrabold">
                    IMPORTANT INFORMATION
                  </p>
                  <p className="mt-2">
                    This transfer will remain pending until the recipient
                    accepts it. Once accepted, the ticket(s) will no longer be
                    available in your account.
                  </p>
                  <p className="mt-3">
                    You may cancel this transfer from your account at any time
                    before it has been accepted.
                  </p>
                  <p className="mt-3">
                    Need help? Visit our <span className="underline">FAQ</span>
                  </p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#024bde",
                  padding: "28px 20px",
                  marginBottom: "24px",
                  width: "380px",
                }}
              >
                <div>
                  <p className="font-bold text-[15px]">CONNECT WITH US</p>
                </div>
                <table className="mx-auto my-[11px] w-[280px]">
                  <tbody>
                    <tr>
                      <td className="mx-3">
                        <img className='w-[30px]' src="https://res.cloudinary.com/domlob3pr/image/upload/v1781480048/Subtract_cwrcyw.png" alt="" />
                      </td>
                      <td className="mx-3">
                        <img className='w-[30px]'
                          src="https://res.cloudinary.com/domlob3pr/image/upload/v1781479279/facebook_mr7slo.png"
                          alt=""
                        />
                      </td>
                      <td className="mx-3">
                        <img className='w-[30px]'
                          src="https://res.cloudinary.com/domlob3pr/image/upload/v1781479287/tiktok_avo02i.png"
                          alt=""
                        />
                      </td>
                      <td className="mx-3">
                        <img className='w-[30px]'
                          src="https://res.cloudinary.com/domlob3pr/image/upload/v1781479275/instagram_ybyi1g.png"
                          alt=""
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="w-full pb-5 border-b-1">
                  <p className="text-[13px]">
                    Need help? Contact Our{" "}
                    <span className="underline">Fan Support Team</span>
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mt-7 text-[13px]">
                    <p className="underline mr-[20px]">Ticketmaster</p>
                    <p className="underline mr-[20px]">Privacy Policy</p>
                    <p className="underline mr-8">My Account</p>
                  </div>
                </div>
                <div>
                  <p className="text-[11px]">
                    © Tickont <span className="text-[#024bde]">....</span> All
                    rights reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Body>
      </Tailwind>
    </Html>
  );
}
