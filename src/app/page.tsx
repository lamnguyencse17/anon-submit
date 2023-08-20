import Image from "next/image";
import Logo from "@/assets/logo.svg";

export default function Home() {
  return (
    <main className="mb-24 mt-8 flex h-full w-full flex-col items-center px-4">
      <div className="flex w-full flex-row items-center justify-center px-32">
        <Image src={Logo} alt="AnonSubmit Logo" width={200} height={200} />
        <h1 className="h-fit px-8 text-3xl">
          A simple and anonymous feedback solution
        </h1>
      </div>
      <div className="mt-12 flex w-full flex-1 flex-row">
        <div className="flex h-full w-1/3 flex-col items-center">
          <h2 className="text-2xl">Simple</h2>
          <h3 className="mt-4 text-center text-xl">
            Our service is easy to use and both desktop and mobile friendly.
            Best of all, it&apos;s free!
          </h3>
        </div>
        <div className="flex h-full w-1/3 flex-col items-center">
          <h2 className="text-2xl">Powerful</h2>
          <h3 className="mt-4 text-center text-xl">
            Collect, publish, edit, and delete submissions with one click, and
            customize your page&apos;s submission portal with our many options.
          </h3>
        </div>
        <div className="flex h-full w-1/3 flex-col items-center">
          <h2 className="text-2xl">Truly anonymous</h2>
          <h3 className="mt-4 text-center text-xl">
            As a submitter, you&apos;re fully anonymous. No IP logging,
            &quot;logins&quot;, &quot;verifications&quot;, or other
            identity-revealing gimmicks.
          </h3>
        </div>
      </div>
    </main>
  );
}
