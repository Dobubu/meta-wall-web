if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let c={};const l=e=>i(e,o),t={module:{uri:o},exports:c,require:l};s[o]=Promise.all(n.map((e=>t[e]||l(e)))).then((e=>(r(...e),c)))}}define(["./workbox-b3e22772"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.05380d9b.js",revision:null},{url:"assets/index.6e25e574.css",revision:null},{url:"assets/LoginPage.a46bd7e5.js",revision:null},{url:"assets/LoginPage.f2209fdb.css",revision:null},{url:"index.html",revision:"9c011a08a306d8244b8ab560758434dd"},{url:"favicon.ico",revision:"89bfb1ca83e492d15ef74304995c0260"},{url:"apple-touch-icon.png",revision:"f97190b03acfe28281e09cf270b3bb04"},{url:"pwa-192x192.png",revision:"1562138c2da782846c97f068b3b36b58"},{url:"pwa-512x512.png",revision:"bf9c14438c539c0399becbbde98c9d96"},{url:"manifest.webmanifest",revision:"9c4c51acee07c9c9492284d38db070ba"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));