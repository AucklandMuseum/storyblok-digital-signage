import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import compressor from "astro-compressor";

import node from "@astrojs/node";

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
    //accessToken: env.STORYBLOK_TOKEN,
    accessToken: 'p3nWauZqXhuE8lNTLndLHgtt',
    apiOptions: {
      region: 'us'
    },
    components: {
      screenLayout: 'components/storyblok/contentTypes/ScreenLayout',
      panel: 'components/storyblok/widgets/Panel',
      sharedPanel: 'components/storyblok/widgets/SharedPanel',
      whatsOnPromo: 'components/storyblok/widgets/WhatsOnPromo',
      htmlBlock: 'components/storyblok/widgets/HtmlBlock'
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
      }
    }
  },
  adapter: node({
    mode: "standalone"
  })
});