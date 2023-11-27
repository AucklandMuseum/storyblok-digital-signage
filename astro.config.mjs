import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import compressor from "astro-compressor";
import { loadEnv } from "vite";
import node from "@astrojs/node";
import netlify from "@astrojs/netlify/functions";

const env = loadEnv(process.env.NODE_ENV, process.cwd(), "STORYBLOK");


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
    accessToken: env.STORYBLOK_TOKEN,
    bridge: env.STORYBLOK_IS_PREVIEW === 'yes',
    apiOptions: {
      region: 'us'
    },
    components: {
      //content types
      screenLayout: 'components/storyblok/contentTypes/ScreenLayout',
      signageAlias: 'components/storyblok/contentTypes/SignageAlias',
      //widgets
      panel: 'components/storyblok/widgets/Panel',
      sharedPanel: 'components/storyblok/widgets/SharedPanel',
      whatsOnPromo: 'components/storyblok/widgets/WhatsOnPromo',
      htmlBlock: 'components/storyblok/widgets/HtmlBlock',
      htmlBlockDS: 'components/storyblok/widgets/HtmlBlock',
      videoLoop: 'components/storyblok/widgets/VideoLoop',
      imageLoop: 'components/storyblok/widgets/ImageLoop',
    }
  }), tailwind(), react(), vue(), compressor()],
  output: env.STORYBLOK_IS_PREVIEW === 'yes' ? 'server' : 'static',
  ...(env.STORYBLOK_ENV === 'development' && {
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
    }
  }),
  ...(env.STORYBLOK_ENV === 'development' && {
    adapter: node({
      mode: "standalone"
    })
  }),
  ...(env.STORYBLOK_ENV === 'production' && {
    adapter: netlify({
    
    })
  }),
});