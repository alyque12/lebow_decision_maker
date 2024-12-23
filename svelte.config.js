import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'dist',  // Output folder for static files
      assets: 'test', // Folder for assets
      fallback: null, // Optional: specify a fallback file (404.html)
    }),
    paths: {
      base: '/lebow_decision_maker/',  // Replace 'repo-name' with your actual GitHub repository name
    },
    prerender: {
      default: false,  // Enable prerendering for all pages
    },
  },
};

export default config;
