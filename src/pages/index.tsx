import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Theater simulator</title>
        <meta name="description" content="Created using next.js + Django" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen h-screen flex flex-col justify-center items-center p-4 gap-4">
        <h2 className="text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold ">
          Randomized <span className="text-purple-400">Simulator</span> App
        </h2>

        <section className="text-gray-700 flex gap-4 items-center">
          <p className="text-xl">This app uses</p>

          <div className="px-4 py-1 bg-purple-100 rounded-md text-purple-600 font-semibold shadow-md">
            <a href="https://next.org" target="_blank" rel="noreferrer">
              Next.js
            </a>
          </div>

          <div className="px-4 py-1 bg-green-100 rounded-md text-green-600 font-semibold shadow-md">
            <a href="https://next.org" target="_blank" rel="noreferrer">
              Django
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
