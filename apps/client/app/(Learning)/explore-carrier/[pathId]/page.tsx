"use client";
import { getCarrierByIdAction } from "@/_actions/carrierActions";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const [path, setPath] = useState<any>(null);
  const { pathId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (pathId) {
      const fetchPath = async () => {
        const res = await getCarrierByIdAction(pathId as string);
        setPath(res.data.carrerPath);
      };

      fetchPath();
    }
  }, [pathId]);

  if (!path) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          {/* Banner Image */}
          <img
            src={path.img}
            alt={path.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{path.name}</h1>
            <p className="text-gray-700 mb-4">{path.description}</p>
            <button
              onClick={() => {
                router.push(
                  `/carrier/${path.id}/user/${localStorage.getItem("refreshToken")}`
                );
              }}
            >
              Go to Progress
            </button>
            <hr />
            {/* Learning Nodes */}
            <h2 className="text-2xl font-semibold mb-3">Learning Nodes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {path.learningNodes.map((node: any) => (
                <div
                  key={node.id}
                  className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-gray-50"
                >
                  <h3 className="text-xl font-semibold">{node.title}</h3>
                  <p className="text-gray-600">Type: {node.type}</p>
                  <p className="text-gray-600">Order: {node.order}</p>
                  <p className="text-gray-600">
                    Reward Points: {node.rewardPoints}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Page;
