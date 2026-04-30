"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// 1. Separamos toda la lógica que necesita leer la URL en un componente hijo
function Verify2FAContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [code, setCode] = useState("");
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQR = async () => {
      // Usamos la ruta de tu API
      const res = await fetch(`http://localhost:3000/api/auth/2fa/generate?userId=${userId}`);
      const data = await res.json();
      if (data.qrCode) setQrImage(data.qrCode);
    };
    if (userId) loadQR();
  }, [userId]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:3000/api/auth/2fa/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: Number(userId), code }),
      credentials: "include",
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError("Código incorrecto, intenta de nuevo.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
      <h2 className="text-2xl font-bold mb-4">Seguridad 2FA</h2>
      
      {qrImage && (
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Escanea este código con Google Authenticator</p>
          <img src={qrImage} alt="QR 2FA" className="mx-auto" />
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-4">
        <Input 
          label="Ingresa el código de 6 dígitos"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          required
          placeholder="000000"
          className="text-center text-2xl tracking-widest"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button label="Verificar" type="submit" />
      </form>
    </div>
  );
}

// 2. El componente principal por defecto AHORA solo envuelve al hijo en <Suspense>
export default function Verify2FAPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* El fallback es lo que se muestra mientras lee la URL (fracción de segundo) */}
      <Suspense fallback={<div className="text-gray-500">Cargando seguridad...</div>}>
        <Verify2FAContent />
      </Suspense>
    </div>
  );
}