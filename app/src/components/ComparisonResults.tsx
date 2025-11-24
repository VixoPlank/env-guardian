import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import type { ComparisonResult } from "../utils/envParser";
import { StatCard } from "./StatCard";
import { ResultSection } from "./ResultSection";

interface ComparisonResultsProps {
  result: ComparisonResult;
}

export function ComparisonResults({ result }: ComparisonResultsProps) {
  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-white">
        Resultados de la Comparación
      </h2>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Solo en Archivo 1"
          count={result.onlyInFile1.length}
          color="text-blue-400"
          icon={<AlertCircle className="w-5 h-5" />}
        />
        <StatCard
          title="Solo en Archivo 2"
          count={result.onlyInFile2.length}
          color="text-purple-400"
          icon={<AlertCircle className="w-5 h-5" />}
        />
        <StatCard
          title="Valores Diferentes"
          count={result.differentValues.length}
          color="text-yellow-400"
          icon={<XCircle className="w-5 h-5" />}
        />
        <StatCard
          title="Valores Iguales"
          count={result.sameValues.length}
          color="text-green-400"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
      </div>

      {/* Detailed Results */}
      <div className="space-y-6">
        {result.onlyInFile1.length > 0 && (
          <ResultSection
            title="Solo en Archivo #1"
            items={result.onlyInFile1.map((item) => ({
              key: item.key,
              value: item.value,
            }))}
            color="border-blue-500 bg-blue-500/10"
            icon={<AlertCircle className="w-5 h-5 text-blue-400" />}
          />
        )}

        {result.onlyInFile2.length > 0 && (
          <ResultSection
            title="Solo en Archivo #2"
            items={result.onlyInFile2.map((item) => ({
              key: item.key,
              value: item.value,
            }))}
            color="border-purple-500 bg-purple-500/10"
            icon={<AlertCircle className="w-5 h-5 text-purple-400" />}
          />
        )}

        {result.differentValues.length > 0 && (
          <ResultSection
            title="Valores Diferentes"
            items={result.differentValues.map((item) => ({
              key: item.key,
              value: `${item.value1} → ${item.value2}`,
              value1: item.value1,
              value2: item.value2,
            }))}
            color="border-yellow-500 bg-yellow-500/10"
            icon={<XCircle className="w-5 h-5 text-yellow-400" />}
            showComparison
          />
        )}

        {result.sameValues.length > 0 && (
          <ResultSection
            title="Valores Iguales"
            items={result.sameValues.map((item) => ({
              key: item.key,
              value: item.value,
            }))}
            color="border-green-500 bg-green-500/10"
            icon={<CheckCircle2 className="w-5 h-5 text-green-400" />}
          />
        )}
      </div>
    </div>
  );
}

