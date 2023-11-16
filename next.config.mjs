/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [
      "images.unsplash.com", 
      "www.safaricom.co.ke", 
      "i.imgur.com", 
      "images.pexels.com", 
      "img.freepik.com",
      "kenyanwallstreet.com",
      "theexchange.africa",
      "www.the-star.co.ke",
      "disrupt-africa.com",
      "www.businessdailyafrica.com",
      "africanangelacademy.com",
      "www.techafricanews.com"
    ],
  },
};

export default config;
