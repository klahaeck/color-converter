"use client";

// import Image from "next/image";
import { useEffect } from "react";
import { useColor } from "@/contexts/Color";
import { useForm, SubmitHandler } from "react-hook-form";
import chroma from "chroma-js";
import { saveColor } from "@/lib/directus";

type Inputs = {
  color: string
  // color1: string
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      // console.log('Copied to clipboard: ', text);
    },
    (err) => {
      console.error('Failed to copy: ', err);
    }
  );
};

export default function Home() {
  const { bgColor, setBgColor, contrastColor, conversions, pallete } = useColor();

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

  useEffect(() => {
    if (bgColor) {      
      saveColor(bgColor);
    }
  }, [bgColor]);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 sm:p-14 w-full transition-all" style={{
      backgroundColor: bgColor || "black",
      color: contrastColor || "white",
    }}>
      <main className="flex flex-col gap-8 items-center justify-center w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex gap-10">
            <label className="flex flex-col gap-2 w-full">
              <span className="hidden">Color</span>
              <input {...register("color")} autoFocus className="text-4xl font-bold bg-transparent px-0 py-1 text-center outline-0 border-b border-white" style={{
                borderColor: contrastColor || "white",
              }} />
            </label>
          </div>
        </form>

        {conversions.length > 1 && (
          <div className="flex flex-col gap-4 text-xl">
            <ul className="flex flex-col gap-2">
              {conversions.map((conversion, index) => (
                <li key={index}>{conversion.type}: <span className="font-bold">{conversion.color}</span></li>
              ))}
            </ul>
          </div>
        )}

        {pallete.length > 1 && (
          <div className="flex flex-col gap-4 text-xl">
            <h2>Pallete (click to copy)</h2>
            <div className="flex gap-2">
              {pallete.map((color, index) => (
                <div key={index} className="w-8 h-8 rounded-full cursor-pointer" style={{
                  backgroundColor: color,
                }} title={color} onClick={() => copyToClipboard(color)} />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="row-start-3 flex gap-6 text-xs uppercase flex-wrap items-center justify-center">
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
