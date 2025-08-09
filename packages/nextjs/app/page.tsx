"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex items-center flex-col grow pt-10 min-h-screen bg-black text-white">
      <div className="px-5 max-w-5xl w-full">
        {/* Logo opcional */}
        {/* <Image src="/lagabyok-logo.png" width={180} height={60} alt="Lagabyok Logo" className="mx-auto mb-6" /> */}

        <h1 className="text-center mb-10">
          <span className="block text-2xl mb-2 text-pink-400">🔥 Bienvenido a</span>
          <span className="block text-5xl font-extrabold text-yellow-300">Lagabyok NFTs</span>
          <span className="block text-xl font-bold text-cyan-300 mt-2">
            (SpeedRunEthereum Challenge: Simple NFT Example)
          </span>
        </h1>

        <div className="flex justify-center items-center space-x-2 flex-col bg-gray-900 rounded-2xl p-6 border-4 border-pink-500 shadow-lg">
          <p className="my-2 font-medium text-yellow-300">💳 Dirección conectada:</p>
          <Address address={connectedAddress} />
        </div>

        <div className="flex items-center flex-col flex-grow mt-10">
          <div className="px-5 w-[90%]">
            <h1 className="text-center mb-6">
              <span className="block text-4xl font-bold text-cyan-400">🚀 Challenge: Simple NFT Example</span>
            </h1>
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/hero.png"
                width="727"
                height="231"
                alt="challenge banner"
                className="rounded-xl border-4 border-yellow-400 shadow-lg shadow-pink-500/50"
              />
              <div className="max-w-3xl">
                <p className="text-center text-lg mt-8 text-pink-300">
                  🎫 Crea un NFT increíble para aprender los fundamentos de 🏗️ Scaffold-ETH 2. Usarás 👷‍♀️
                  <a
                    href="https://hardhat.org/getting-started/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-yellow-300 hover:text-cyan-300"
                  >
                    HardHat
                  </a>{" "}
                  para compilar y desplegar contratos inteligentes. Luego, una app React con componentes Ethereum listos
                  para usar. ¡Finalmente, despliega tu NFT a una red pública y compártelo con el mundo! 🌎
                </p>
                <p className="text-center text-lg mt-4 text-cyan-300">
                  🌟 El objetivo: una app que permita comprar y transferir NFTs. ¡Despliega en testnet y sube tu app! 📡
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección inferior */}
        <div className="grow w-full mt-16 px-8 py-12 bg-gray-900 border-t-4 border-pink-500">
          <div className="flex justify-center items-center gap-12 flex-col md:flex-row">
            <div className="flex flex-col bg-black border-4 border-yellow-400 px-10 py-10 text-center items-center max-w-xs rounded-3xl shadow-lg shadow-cyan-400/50">
              <BugAntIcon className="h-8 w-8 text-pink-400" />
              <p className="text-white mt-2">
                Juega con tu contrato inteligente usando la{" "}
                <Link href="/debug" passHref className="underline text-cyan-300 hover:text-yellow-300">
                  pestaña Debug Contracts
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col bg-black border-4 border-cyan-400 px-10 py-10 text-center items-center max-w-xs rounded-3xl shadow-lg shadow-yellow-300/50">
              <MagnifyingGlassIcon className="h-8 w-8 text-yellow-300" />
              <p className="text-white mt-2">
                Explora tus transacciones locales con la{" "}
                <Link href="/blockexplorer" passHref className="underline text-pink-400 hover:text-cyan-300">
                  pestaña Block Explorer
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
