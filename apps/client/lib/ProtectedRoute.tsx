"use client";
import { useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { encryptCallback } from "@/hooks/encryption";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("refreshToken");
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      const encryptedCallback = encryptCallback(pathname);
      router.push(
        `/auth/login?callback=${encodeURIComponent(encryptedCallback)}`
      );
    } else {
      setLoading(false);
    }
  }, [token, pathname, router]);

  if (loading) {
    return (
      <div className="flex-center w-screen h-screen">
        <Loader2 className="animate-spin h-20 w-20" />
      </div>
    );
  }
  return <>{children}</>;
};

export default ProtectedRoute;
