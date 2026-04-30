// src/components/ui/TwoFactorInput.tsx
"use client";
import { useState, useRef } from "react";

export const TwoFactorInput = ({ onCompleteAction }: { onCompleteAction: (code: string) => void }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1); // Solo un dígito
    setCode(newCode);

    // Mover al siguiente input
    if (value && index < 5) inputs.current[index + 1]?.focus();
    
    if (newCode.every(digit => digit !== "")) onCompleteAction(newCode.join(""));
  };

  return (
    <div className="flex gap-2 justify-center">
      {code.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          type="text"
          className="w-12 h-12 text-center text-xl border-2 rounded-lg focus:border-primary text-black"
          value={digit}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !code[i] && i > 0) inputs.current[i - 1]?.focus();
          }}
        />
      ))}
    </div>
  );
};