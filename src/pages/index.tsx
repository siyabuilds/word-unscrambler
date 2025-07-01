import Head from "next/head";
import Unscrambler from "@/components/Unscrambler";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Word Unscrambler | Modern AI-Powered Tool</title>
        <meta
          name="description"
          content="Unscramble words instantly with our modern, AI-powered word unscrambler. Fast, accurate, and beautifully designed."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
        <header className="relative z-10 pt-8 pb-4">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
              Word Unscrambler
            </h1>
          </div>
        </header>
        <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
          <Unscrambler />
        </main>
        <Footer />
      </div>
    </>
  );
}
