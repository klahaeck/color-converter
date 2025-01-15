import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import chroma from "chroma-js";

type ColorContextContextProviderProps = {
  children: ReactNode
}

type ColorContext = {
  bgColor: string | null
  contrastColor: string | null
  conversions: { type: string, color: string }[]
  pallete: string[]
  setBgColor: (color: string) => void
}

const ColorContext = createContext<ColorContext | null>(null)

function generateHighContrastColor(baseColor: string) {
  const base = chroma(baseColor);
  const isDark = base.luminance() < 0.5;
  return isDark ? '#ededed' : '#0a0a0a';
}

function generateComplementaryPalette(baseColor: string, numberOfColors: number = 6) {
  const color = chroma(baseColor);
  const complementary = color.set('hsl.h', (color.get('hsl.h') + 180) % 360);

  // Generate a palette between the base and complementary colors
  const palette = chroma.scale([color, complementary]).mode('lch').colors(numberOfColors);
  palette.shift();
  return palette;
}

export function ColorProvider({ children }: ColorContextContextProviderProps) {
  const [ bgColor, setBgColor ] = useState<string | null>(null);
  const [ contrastColor, setContrastColor ] = useState<string | null>(null);
  const [ conversions, setConversions ] = useState<{ type: string, color: string }[]>([]);
  const [ pallete, setPallete ] = useState<string[]>([]);

  useEffect(() => {
    if (bgColor) {
      const contrastColor = generateHighContrastColor(bgColor);
      setContrastColor(contrastColor);
      setConversions([
        { type: 'hex', color: chroma(bgColor).hex() },
        { type: 'rgb', color: chroma(bgColor).css('rgb') },
        { type: 'hsl', color: chroma(bgColor).css('hsl') },
        { type: 'lab', color: chroma(bgColor).css('lab') },
      ]);
      setPallete(generateComplementaryPalette(bgColor));
    }
  }, [bgColor]);

  return (
    <ColorContext.Provider value={{
      bgColor,
      setBgColor,
      contrastColor,
      conversions,
      pallete,
    }}>
      {children}
    </ColorContext.Provider>
  )
}

export function useColor() {
  const context = useContext(ColorContext)
  if (!context) {
    throw new Error('useColor must be used within a ColorProvider')
  }
  return context
}