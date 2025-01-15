"use client";

// import Image from "next/image";
import { useEffect } from "react";
import { useColor } from "@/contexts/Color";
import { useForm, SubmitHandler } from "react-hook-form";
import chroma from "chroma-js";

type Inputs = {
  color: string
  // color1: string
}

export default function Home() {
  const { bgColor, setBgColor, contrastColor, conversions } = useColor();

  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<Inputs>();

  const watchColor = watch("color");

  useEffect(() => {
    if (watchColor?.length > 5 && chroma.valid(watchColor)) {
      // console.log(chroma(watchColor).hex());
      const color = chroma(watchColor).hex();
      setBgColor(color);
    }
  }, [watchColor, setBgColor]);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-16 sm:p-20" style={{
      backgroundColor: bgColor || "black",
      color: contrastColor || "white",
    }}>
      <main className="grow flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <label className="flex flex-col gap-2">
              <span className="hidden">Color</span>
              <input {...register("color")} autoFocus className="text-3xl bg-transparent px-0 py-1 text-center outline-0 border-b border-white" style={{
                borderColor: contrastColor || "white",
              }} />
            </label>
          </div>
        </form>

        {conversions.length > 1 && (
          <div className="flex flex-col gap-4 text-xl">
            <ul className="flex flex-col gap-2">
              {conversions.map((conversion, index) => (
                <li key={index}>{conversion.type}: {conversion.color}</li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://thesion.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          /> */}
          Thesion Tools
        </a>
      </footer>
    </div>
  );
}
