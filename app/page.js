import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <main className="flex  justify-between ">
      <section className="mt-40">
        <h1 className="text-6xl font-bold mt-8 mx-20 ">
          Together We <br />
          <span className="text-red-500">Achieve</span> More
        </h1>
        <p className="text-2xl mt-4 mb-8 mx-20 ">
          A web application that helps students form virtual study groups.
          Collaborate, share resources, and schedule study sessions.
        </p>
        <Link
          href="/signup"
          className="mx-20 bg-red-500 text-white text-lg px-8 py-3 rounded hover:bg-red-400 transition-colors duration-200 ease-in-out"
        >
          Get Started
        </Link>
      </section>
      <Image
        src="/landing3-5.jpg"
        alt="Study Group"
        width="0"
        height="0"
        sizes="100vw"
        className="w-1/2"
      />
    </main>
  );
}
