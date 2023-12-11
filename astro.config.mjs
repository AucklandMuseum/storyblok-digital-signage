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
      dsScreenLayout: 'components/storyblok/contentTypes/ScreenLayout',
      dsSignageAlias: 'components/storyblok/contentTypes/SignageAlias',
      //widgets
      dsPanel: 'components/storyblok/widgets/Panel',
      dsSharedPanel: 'components/storyblok/widgets/SharedPanel',
      dsWhatsOnPromo: 'components/storyblok/widgets/WhatsOnPromo',
      dsImage: 'components/storyblok/widgets/ImageDisplay',
      dsCopyBlock: 'components/storyblok/widgets/CopyBlock',
      dsHtmlBlock: 'components/storyblok/widgets/HtmlBlock',
      dsVideoLoop: 'components/storyblok/widgets/VideoLoop',
      dsImageLoop: 'components/storyblok/widgets/ImageLoop',
    }
  }), tailwind(), react(), vue()],
  output: env.STORYBLOK_SERVER,
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