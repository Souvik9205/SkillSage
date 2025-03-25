"use client";
import { getCarriersAction } from "@/_actions/carrierActions";
import ProtectedRoute from "@/lib/ProtectedRoute";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const [paths, setPaths] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPaths = async () => {
      const res = await getCarriersAction();
      setPaths(res.data.carrerPath);
    };

    fetchPaths();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Career Paths</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path: any) => (
            <div
              onClick={() => router.push(`/explore-carrier/${path.id}`)}
              key={path.id}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <img
                src={path.img}
                alt={path.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-3">{path.name}</h2>
              <p className="text-gray-600 mt-2">{path.description}</p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Page;
