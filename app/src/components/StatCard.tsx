import React from "react";

interface StatCardProps {
  title: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}

export function StatCard({ title, count, color, icon }: StatCardProps) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">{title}</span>
        <div className={color}>{icon}</div>
      </div>
      <p className={`text-3xl font-bold ${color}`}>{count}</p>
    </div>
  );
}

