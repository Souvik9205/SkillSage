import Onboarding from "@/lib/Onboarding";
import ProtectedRoute from "@/lib/ProtectedRoute";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <ProtectedRoute>
      <div>
        hello it's home!
        <Link href={"/"}>Back to Root</Link>
        <hr />
        <Link href={"/explore-carrier"}>Learing Path</Link>
        <br />
        <button>Interview</button> <br />
        <button>Profile</button> <br />
        <button>connection</button>
        <Onboarding />
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
