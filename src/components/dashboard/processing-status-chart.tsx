'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Facturas Procesadas', value: 340, color: '#0088FE' },
  { name: 'Recibos Digitalizados', value: 125, color: '#00C49F' },
  { name: 'Documentos Pendientes', value: 45, color: '#FFBB28' },
  { name: 'Con Errores', value: 12, color: '#FF8042' },
];

export function ProcessingStatusChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [value, 'Documentos']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}