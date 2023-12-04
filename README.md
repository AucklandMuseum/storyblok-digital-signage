# Digital Signage Astro/Storyblok

This is a hybrid Astro site that outputs static HTML for the signage as well as providing dynamic APIs for data from Tessitura

npm run dev 

will start two scripts to run the site as a server and an https proxy so that Storyblok can load the pages in Preview mode.

npm run build

will build the static HTML into the /dist folder


node server/server.js starts a node express instance to server the content locally