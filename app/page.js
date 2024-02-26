import Link from "next/link";
import Image from "next/image";
import GroupCard from "./(components)/GroupCard";
export default async function Home() {

  const groups = [];
  function createGroups() {
    for (let i = 0; i < 6; i++) {
      const name = `Barış Özcan`;
      const description = `Aman allahım ne harika bir group!`;
      const image = `/group2.jpg`;
      const group = <GroupCard name={name} description={description} image={image} />;
      groups.push(group);
    }
  }
  return (
    <main className="flex  flex-col ">
      <section className="flex text-center lg:text-left ">
        <div className="mt-10 lg:mt-32">
          <h1 className="text-4xl md:text-6xl font-bold mx-20">
            Together We <br />
            <span className="text-red-500">Achieve</span> More
          </h1>
          <p className="text-2xl mt-2 mb-6 mx-20 ">
            A web application that helps students form virtual study groups.
            Collaborate, share resources, and schedule study sessions.
          </p>
          <Link
            href="/signup"
            className="my-20 ml-20 bg-red-500 text-white text-lg px-8 py-3 rounded hover:bg-red-600 transition-colors duration-200 ease-in-out"
          >
            Create Group
          </Link>
          <Link
            href="/groups"
            className="my-20 mx-10 border-2 border-black  text-lg px-8 py-3 rounded hover:bg-gray-300 transition-colors duration-200 ease-in-out"
          >
            Discover Groups
          </Link>
        </div>

        <Image
          src="/landing-img.jpg"
          alt="Study Group"
          width="0"
          height="0"
          sizes="100wh"
          className="w-1/2 hidden lg:block "
        />
      </section>

      <section className="flex flex-col items-center bg-slate-100 py-20 mt-6 lg:m-0">
        <h2 className="text-4xl font-bold text-center">Features</h2>

        <div className="flex flex-col lg:flex-row gap-20 mt-20">
          <div className="flex flex-col items-center">
            <Image src="/features1.jpg" alt="Icon 1" width="250" height="250" />
            <h3 className="text-2xl mt-8">Create Study Groups</h3>
            <p className="text-center mt-4">
              Create a study group and invite your friends to join.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Image src="/features2.jpg" alt="Icon 3" width="250" height="250" />
            <h3 className="text-2xl mt-8">Collaborate Online</h3>
            <p className="text-center mt-4">
              Collaborate with your study group members online.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Image src="/features3.jpg" alt="Icon 3" width="250" height="250" />
            <h3 className="text-2xl mt-4">Schedule Study Sessions</h3>
            <p className="text-center mt-4">
              Schedule study sessions with your study group members.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center py-20 mt-6 mx-6 lg:mx-28">
        <h2 className="text-4xl font-bold text-center">Recent Groups</h2>

        <div className="flex flex-wrap justify-center gap-10 mt-20 ">
          {createGroups()}
          {groups}
          
        </div>
      </section>
    </main>
  );
}
