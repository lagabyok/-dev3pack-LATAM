"use client";

import { MyHoldings } from "./_components";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";

const MyNFTs: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const { writeContractAsync } = useScaffoldWriteContract({ contractName: "YourCollectible" });

  const { data: tokenIdCounter } = useScaffoldReadContract({
    contractName: "YourCollectible",
    functionName: "tokenIdCounter",
    watch: true,
  });

  const handleMintItem = async () => {
    if (tokenIdCounter === undefined) return;

    const tokenIdCounterNumber = Number(tokenIdCounter);
    const currentTokenMetaData = nftsMetadata[tokenIdCounterNumber % nftsMetadata.length];
    const notificationId = notification.loading("🚀 Subiendo a IPFS...");
    try {
      const uploadedItem = await addToIPFS(currentTokenMetaData);

      notification.remove(notificationId);
      notification.success("✅ Metadata subida a IPFS");

      await writeContractAsync({
        functionName: "mintItem",
        args: [connectedAddress, uploadedItem.path],
      });
    } catch (error) {
      notification.remove(notificationId);
      console.error(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        padding: "2rem",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Header con logo y título */}
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
          NFTs
        </h1>
      </header>

      {/* Texto descriptivo */}
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "2rem",
          maxWidth: "600px",
          lineHeight: "1.6",
        }}
      >
        Bienvenido/a a tu colección personal de NFTs únicos y vibrantes. Aquí podrás ver, gestionar y mostrar tus piezas
        digitales con estilo.
      </p>

      {/* Botón Mint */}
      <div style={{ marginBottom: "2rem" }}>
        {!isConnected || isConnecting ? (
          <RainbowKitCustomConnectButton />
        ) : (
          <button
            onClick={handleMintItem}
            style={{
              padding: "12px 30px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: "12px",
              background: "linear-gradient(90deg, #ff0080, #00f0ff, #ffe600)",
              color: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              border: "4px solid",
              borderImageSlice: 1,
              borderWidth: "4px",
              borderImageSource: "linear-gradient(90deg, #ff0080, #00f0ff, #ffe600)",
              cursor: "pointer",
              boxShadow: "0 0 5px #ff6ec4",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            🚀 Mint NFT
          </button>
        )}
      </div>

      {/* Lista de NFTs con borde y sombra pop */}
      <div
        style={{
          backgroundColor: "#1a1a1a",
          border: "4px solid #ff6ec4",
          borderRadius: "15px",
          padding: "1rem",
          boxShadow: "0 0 20px #00ffff",
        }}
      >
        <MyHoldings />
      </div>
    </div>
  );
};

export default MyNFTs;
