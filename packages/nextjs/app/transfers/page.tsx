"use client";

import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Transfers: NextPage = () => {
  const { data: transferEvents, isLoading } = useScaffoldEventHistory({
    contractName: "YourCollectible",
    eventName: "Transfer",
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-10">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        padding: "2rem",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
        textShadow: "0 0 3px #ff3366, 0 0 5px #00ffff",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "#ffcc00",
            borderRadius: "50%",
            marginRight: "1rem",
            boxShadow: "0 0 10px #ffcc00",
          }}
        />
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#ff3366",
            textShadow: "2px 2px #00ffff",
          }}
        >
          Lagabyok Transfers
        </h1>
      </header>

      <div
        style={{
          backgroundColor: "#1a1a1a",
          border: "4px solid #ff6ec4",
          borderRadius: "15px",
          padding: "1rem",
          boxShadow: "0 0 20px #00ffff",
          overflowX: "auto",
        }}
      >
        <table
          className="table"
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0 15px",
            color: "#00fff7",
            fontWeight: "600",
          }}
        >
          <thead>
            <tr
              style={{
                background: "linear-gradient(90deg, #333333, #777777, #bbbbbb)",
                color: "#fff",
                fontSize: "1.2rem",
                borderRadius: "15px",
              }}
            >
              <th style={{ padding: "12px", borderRadius: "15px 0 0 15px" }}>Token Id</th>
              <th>From</th>
              <th style={{ borderRadius: "0 15px 15px 0" }}>To</th>
            </tr>
          </thead>
          <tbody>
            {!transferEvents || transferEvents.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#ff6ec4",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  No events found
                </td>
              </tr>
            ) : (
              transferEvents.map((event, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "12px",
                  }}
                >
                  <th
                    style={{
                      textAlign: "center",
                      padding: "12px",
                      color: "color: #fFFFF",
                    }}
                  >
                    {event.args.tokenId?.toString()}
                  </th>

                  <td style={{ padding: "12px" }}>
                    <div
                      style={{
                        border: "1.5px solid rgba(255, 204, 0, 0.7)", // borde amarillo suave
                        borderRadius: "8px",
                        padding: "8px",
                        color: "#fff",
                      }}
                    >
                      <Address address={event.args.from} />
                    </div>
                  </td>

                  <td style={{ padding: "12px" }}>
                    <div
                      style={{
                        border: "1.5px solid rgba(255, 110, 196, 0.7)", // borde rosa chicle suave
                        borderRadius: "8px",
                        padding: "8px",
                        color: "#fff",
                      }}
                    >
                      <Address address={event.args.to} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transfers;
