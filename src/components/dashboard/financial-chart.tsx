'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { categoria: 'Gastos Operativos', enero: 45000, febrero: 48000, marzo: 52000 },
  { categoria: 'Ingresos', enero: 85000, febrero: 92000, marzo: 98000 },
  { categoria: 'Impuestos', enero: 15000, febrero: 16800, marzo: 18200 },
  { categoria: 'Inversiones', enero: 25000, febrero: 22000, marzo: 28000 },
];

export function FinancialChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoria" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="enero" fill="#8884d8" name="Enero" />
          <Bar dataKey="febrero" fill="#82ca9d" name="Febrero" />
          <Bar dataKey="marzo" fill="#ffc658" name="Marzo" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}