import adapterStatic from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapterStatic(),
    paths: {
      base: '/would_you_rather', // Replace with your repository name
    },
  },
};

export default config;
