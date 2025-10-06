/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      'logs/**',
      'drizzle/**',
      '.next/**',
      'out/**',
      'src/models/**',
      'src/config/**',
      'src/app.js',
      'src/server.js',
      'src/index.js',
    ],
  },
];


