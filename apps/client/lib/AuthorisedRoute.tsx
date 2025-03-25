// "use client";
// import { ReactNode, useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useAuth } from "@/hooks/useAuth";
// import { decryptCallback } from "@/hooks/encryption";
// import { Loader2 } from "lucide-react";

// interface LoginRedirectProviderProps {
//   children: ReactNode;
// }

// const LoginRedirectProvider = ({ children }: LoginRedirectProviderProps) => {
//   const { isAuthenticated } = useAuth();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (isAuthenticated) {
//       const callbackEncrypted = searchParams.get("callback");
//       let redirectPath = "/dashboard";

//       if (callbackEncrypted) {
//         try {
//           const decryptedPath = decryptCallback(callbackEncrypted);
//           if (decryptedPath) {
//             redirectPath = decryptedPath;
//           }
//         } catch (error) {
//           console.error("Failed to decrypt callback:", error);
//         }
//       }
//       router.push(redirectPath);
//     } else {
//       setLoading(false);
//     }
//   }, [isAuthenticated, searchParams, router]);

//   if (loading) {
//     return (
//       <div className="flex-center w-screen h-screen">
//         <Loader2 className="animate-spin h-20 w-20" />
//       </div>
//     );
//   }
//   return <>{children}</>;
// };

// export default LoginRedirectProvider;
