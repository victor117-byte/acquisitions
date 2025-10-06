'use client';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { mes: 'Ene', documentos: 65, facturas: 45, recibos: 20 },
  { mes: 'Feb', documentos: 89, facturas: 55, recibos: 34 },
  { mes: 'Mar', documentos: 78, facturas: 48, recibos: 30 },
  { mes: 'Abr', documentos: 95, facturas: 65, recibos: 30 },
  { mes: 'May', documentos: 112, facturas: 78, recibos: 34 },
  { mes: 'Jun', documentos: 134, facturas: 89, recibos: 45 },
];

export function DocumentsChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="documentos" 
            stroke="#8884d8" 
            strokeWidth={2}
            name="Total Documentos"
          />
          <Line 
            type="monotone" 
            dataKey="facturas" 
            stroke="#82ca9d" 
            strokeWidth={2}
            name="Facturas"
          />
          <Line 
            type="monotone" 
            dataKey="recibos" 
            stroke="#ffc658" 
            strokeWidth={2}
            name="Recibos"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}