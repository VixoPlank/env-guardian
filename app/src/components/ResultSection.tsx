interface ResultItem {
  key: string;
  value: string;
  value1?: string;
  value2?: string;
}

interface ResultSectionProps {
  title: string;
  items: ResultItem[];
  color: string;
  icon: React.ReactNode;
  showComparison?: boolean;
}

export function ResultSection({
  title,
  items,
  color,
  icon,
  showComparison = false,
}: ResultSectionProps) {
  return (
    <div className={`border rounded-lg p-6 ${color}`}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <span className="text-sm text-gray-400">({items.length})</span>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.key}
            className="bg-gray-900/50 rounded-lg p-3 border border-gray-800"
          >
            <div className="font-mono text-sm font-semibold text-white mb-1">
              {item.key}
            </div>
            {showComparison && item.value1 && item.value2 ? (
              <div className="space-y-1">
                <div className="text-xs text-gray-400">Archivo 1:</div>
                <div className="font-mono text-sm text-red-300 bg-red-950/30 p-2 rounded">
                  {item.value1}
                </div>
                <div className="text-xs text-gray-400 mt-2">Archivo 2:</div>
                <div className="font-mono text-sm text-green-300 bg-green-950/30 p-2 rounded">
                  {item.value2}
                </div>
              </div>
            ) : (
              <div className="font-mono text-sm text-gray-300">
                {item.value}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

