import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import HomeComponent from "~/components/HomeComponent";
import SuccessMessage from "~/components/SuccessMessage";

const Home: NextPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Head>
        <title>Ask me anything</title>
        <meta name="description" content="Ask me anything" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/djwjyopfv/image/upload/v1679762692/client-demo/cctzxwsqcnl9ymxfwl0j.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen bg-gradient-to-b from-slate-50 to-slate-400">
        {!submitted && (
          <HomeComponent onMessageSent={() => setSubmitted(true)} />
        )}
        {submitted && <SuccessMessage onBack={() => setSubmitted(false)} />}
      </main>
    </>
  );
};

export default Home;
