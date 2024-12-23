import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'dist',
      assets: 'dist',
      fallback: null,
    }),
    paths: {
      base: '/lebow_decision_maker', // Replace 'your-repo-name' with the actual repository name
    },
  },
};

export default config;
