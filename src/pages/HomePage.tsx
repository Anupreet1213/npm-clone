import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "npm | Home";
  }, []);

  return (
    <div className="min-h-screen bg-custom-image bg-cover bg-center">
      <div className="container mx-auto py-16 text-center flex flex-col items-center text-white">
        <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] font-bold w-[90vw] sm:w-[70vw] md:w-[40vw] mt-16 leading-tight">
          Build amazing things
        </h1>

        <p className="text-lg sm:text-xl mt-4 w-[90vw] sm:w-[70vw] md:w-[40vw]">
          We're GitHub, the company behind the npm Registry and npm CLI. We
          offer those to the community for free, but our day job is building and
          selling useful tools for developers like you.
        </p>

        <h2 className="text-[2rem] sm:text-[2.3rem] md:text-[2.7rem] font-bold w-[90vw] sm:w-[70vw] md:w-[40vw] mt-12">
          Take your JavaScript development up a notch
        </h2>

        <p className="text-lg sm:text-xl mt-4 w-[90vw] sm:w-[70vw] md:w-[40vw]">
          Get started today for free, or step up to npm Pro to enjoy a premium
          JavaScript development experience, with features like private
          packages.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mt-10">
          <button className="p-3 sm:p-4 px-10 sm:px-14 rounded-full bg-yellow-500 text-base sm:text-lg font-bold text-black shadow-lg">
            Sign up for free
          </button>
          <button className="p-3 sm:p-4 px-10 sm:px-14 rounded-full bg-[#cc3838] text-base sm:text-lg font-bold border-2 border-white shadow-lg">
            Learn about Pro
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
