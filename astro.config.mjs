import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import compressor from "astro-compressor";
import { loadEnv } from "vite";
import node from "@astrojs/node";

const { STORYBLOK_TOKEN } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

console.log(STORYBLOK_TOKEN)

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
    host: true
  },
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  //base: 'auckland-museum',
  trailingSlash: 'never',
  integrations: [storyblok({
    accessToken: STORYBLOK_TOKEN,
    apiOptions: {
      region: 'us'
    },
    components: {
      screenLayout: 'components/storyblok/contentTypes/ScreenLayout',
      panel: 'components/storyblok/widgets/Panel',
      sharedPanel: 'components/storyblok/widgets/SharedPanel',
      whatsOnPromo: 'components/storyblok/widgets/WhatsOnPromo',
      htmlBlock: 'components/storyblok/widgets/HtmlBlock',
      videoLoop: 'components/storyblok/widgets/VideoLoop',
      imageLoop: 'components/storyblok/widgets/ImageLoop',
    }
  }), tailwind(), react(), vue(), compressor()],
  output: "hybrid",
  vite: {
    server: {
      host: "localhost",
      port: 3000,
      cors: true,
      headers: {
        "X-Frame-Options": "ALLOW-FROM https://app.storyblok.com",
        "Content-Security-Policy": "frame-ancestors https://app.storyblok.com;"
      },
    }
  },
  adapter: node({
    mode: "standalone"
  })
});