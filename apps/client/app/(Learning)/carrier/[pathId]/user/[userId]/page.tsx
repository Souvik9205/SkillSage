"use client";
import { getUserProgressAction } from "@/_actions/carrierActions";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const [data, setData] = useState<any>(null);
  const { pathId, userId } = useParams();

  useEffect(() => {
    if (pathId) {
      const fetchPath = async () => {
        const res = await getUserProgressAction(pathId as string);
        setData(res.data);
      };

      fetchPath();
    }
  }, [pathId]);

  if (!data) {
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
      <div>{JSON.stringify(data)}</div>
    </ProtectedRoute>
  );
}

export default Page;
