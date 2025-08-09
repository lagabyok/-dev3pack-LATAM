"use client";

import { lazy, useEffect, useState } from "react";
import type { NextPage } from "next";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";

const LazyReactJson = lazy(() => import("react-json-view"));

const IpfsUpload: NextPage = () => {
  const [yourJSON, setYourJSON] = useState<object>(nftsMetadata[0]);
  const [loading, setLoading] = useState(false);
  const [uploadedIpfsPath, setUploadedIpfsPath] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleIpfsUpload = async () => {
    setLoading(true);
    const notificationId = notification.loading("Uploading to IPFS...");
    try {
      const uploadedItem = await addToIPFS(yourJSON);
      notification.remove(notificationId);
      notification.success("Uploaded to IPFS");

      setUploadedIpfsPath(uploadedItem.path);
    } catch (error) {
      notification.remove(notificationId);
      notification.error("Error uploading to IPFS");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        /* Strings en rosa chicle */
        .react-json-view .string-value {
          color: #ff6ec4 !important;
          text-shadow: none !important;
        }
        /* Data types (string, number, boolean) en cian neón */
        .react-json-view .data-type,
        .react-json-view .type-label,
        .react-json-view .data-type-string {
          color: #00ffff !important;
          text-shadow: none !important;
        }
      `}</style>

      <div
        className="flex items-center flex-col flex-grow pt-10"
        style={{
          backgroundColor: "#2a2a2a",
          minHeight: "100vh",
          padding: "2rem",
          fontFamily: "'Poppins', sans-serif",
          color: "#fff",
          textShadow: "0 0 6px #ff6ec4, 0 0 10px #00ffc8",
        }}
      >
        <h1
          className="text-center mb-4"
          style={{
            fontSize: "2.5rem",
            fontWeight: "900",
            background: "linear-gradient(90deg, #ff6ec4, #00ffc8, #ff3366, #ffe600)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
          }}
        >
          Upload to IPFS
        </h1>

        {mounted && (
          <LazyReactJson
            style={{
              padding: "1rem",
              borderRadius: "0.75rem",
              backgroundColor: "#3f3f3f",
              boxShadow: "0 0 8px 2px #ff6ec4",
              color: "#fff",
              fontWeight: "600",
              fontSize: "1rem",
              maxWidth: "100%",
              overflowX: "auto",
              textShadow: "none",
            }}
            src={yourJSON}
            theme="apathy" /* menos conflictivo que monokai */
            enableClipboard={false}
            onEdit={edit => {
              setYourJSON(edit.updated_src);
            }}
            onAdd={add => {
              setYourJSON(add.updated_src);
            }}
            onDelete={del => {
              setYourJSON(del.updated_src);
            }}
          />
        )}

        <button
          className={`btn btn-secondary mt-4 ${loading ? "loading" : ""}`}
          disabled={loading}
          onClick={handleIpfsUpload}
          style={{
            background: "linear-gradient(90deg, #ff6ec4, #00ffc8, #ffcbf2)",
            border: "none",
            padding: "0.75rem 2rem",
            borderRadius: "1rem",
            fontWeight: "700",
            color: "#1a1a1a",
            boxShadow: "0 0 10px #ff6ec4, 0 0 20px #00ffc8",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Upload to IPFS
        </button>

        {uploadedIpfsPath && (
          <div
            className="mt-4"
            style={{
              fontSize: "1rem",
              background: "linear-gradient(90deg, #ff6ec4, #00ffc8, #ffcbf2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              wordBreak: "break-word",
              userSelect: "all",
              marginTop: "1rem",
            }}
          >
            <a
              href={`https://ipfs.io/ipfs/${uploadedIpfsPath}`}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              {`https://ipfs.io/ipfs/${uploadedIpfsPath}`}
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default IpfsUpload;
