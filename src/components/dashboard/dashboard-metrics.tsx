'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, FileText, DollarSign, Users, CheckCircle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: React.ReactNode;
}

function MetricCard({ title, value, description, trend, trendValue, icon }: MetricCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return null;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <span>{description}</span>
          {trend && trendValue && (
            <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Documentos Procesados"
        value="1,234"
        description="Este mes"
        trend="up"
        trendValue="+20.1%"
        icon={<FileText className="h-4 w-4" />}
      />
      <MetricCard
        title="Ingresos Totales"
        value="$45,231"
        description="Facturación del mes"
        trend="up"
        trendValue="+15.3%"
        icon={<DollarSign className="h-4 w-4" />}
      />
      <MetricCard
        title="Clientes Activos"
        value="89"
        description="Con suscripción activa"
        trend="up"
        trendValue="+12.5%"
        icon={<Users className="h-4 w-4" />}
      />
      <MetricCard
        title="Tasa de Éxito"
        value="98.5%"
        description="Procesamiento correcto"
        trend="up"
        trendValue="+0.8%"
        icon={<CheckCircle className="h-4 w-4" />}
      />
    </div>
  );
}