import {
  Shield,
  CheckCircle2,
  FileCode,
  Lock,
  Zap,
  Github,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "wouter";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 md:py-20">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-400/30 mb-6">
          <Shield className="w-10 h-10 text-cyan-400" />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          env-guardian
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Valida y gestiona tus variables de entorno de forma segura y sin
          errores
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            size="lg"
            className="text-base px-8 py-6 bg-cyan-600 hover:bg-cyan-700 text-white border-0"
            asChild
          >
            <Link href="/test">
              <Zap className="w-5 h-5" />
              Comenzar ahora
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 py-6 border-gray-500/50 bg-gray-900/30 text-gray-200 hover:text-white hover:bg-gray-800/60 hover:border-gray-400"
            asChild
          >
            <a
              href="https://github.com/VixoPlank/env-guardian"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
              Ver en GitHub
            </a>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <FeatureCard
          icon={<CheckCircle2 className="w-6 h-6" />}
          title="Validación Inteligente"
          description="Detecta variables faltantes, tipos inválidos y errores antes de que afecten tu aplicación"
        />
        <FeatureCard
          icon={<FileCode className="w-6 h-6" />}
          title="Tipos Seguros"
          description="Soporte para string, number, boolean, url, email y json con validación automática"
        />
        <FeatureCard
          icon={<Lock className="w-6 h-6" />}
          title="Modo Estricto"
          description="Previene variables no definidas y mantiene tu configuración sincronizada"
        />
      </div>

      {/* Footer */}
      <div className="mt-20 text-center text-gray-500 text-sm">
        <p>Mantén tus variables de entorno bajo control</p>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative p-6 rounded-lg border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:bg-gray-900/50">
      <div className="flex flex-col items-start space-y-4">
        <div className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 group-hover:bg-cyan-500/30 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
