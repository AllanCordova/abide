import Login from "@/components/auth/Login";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div>
      <Suspense fallback={<div>Carregando...</div>}>
        <Login />
      </Suspense>
    </div>
  );
}
