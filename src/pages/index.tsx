import Head from "next/head";
import Unscrambler from "./Unscrambler";

export default function Home() {
  return (
    <>
      <Head>
        <title>Word Unscrambler</title>
        <meta
          name="description"
          content="Unscramble words instantly using our API-powered tool!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <Unscrambler />
      </main>
    </>
  );
}
