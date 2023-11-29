// apollo.config.js
export const client = {
  service: {
    name: 'scale-up',
    // URL to the GraphQL API
    url: 'http://localhost:3000/graphql',
  },
  // Files processed by the extension
  includes: [
    'src/**/*.vue',
    'src/**/*.ts',
  ],
};