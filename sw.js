/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-6e567876'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "_app/immutable/assets/0.50af18a6.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/2.f89f364a.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/ReloadPrompt.8b6f04a5.css",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.9bd1d5f2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.9d1d7ce4.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/paths.c6d844c6.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.f0d8996e.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.02c93213.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.17b6373a.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.f99a9faa.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.41fbc68f.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.e63fc737.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.62260138.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.e3547007.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "14a60b695db2bb24c06f3be71a592660"
  }, {
    "url": "favicon-16x16.png",
    "revision": "177518c0336d5d32fc02d687cc9b4798"
  }, {
    "url": "favicon-32x32.png",
    "revision": "51280d3e965b0590da61a44e0e8fb8f5"
  }, {
    "url": "favicon.ico",
    "revision": "5221515690dde05eaf80105f859d88f4"
  }, {
    "url": "pwa-192x192.png",
    "revision": "7fd830423c665d1efbe1c35af34639a6"
  }, {
    "url": "pwa-512x512.png",
    "revision": "1678bc31440677a28e66a725537d3ea4"
  }, {
    "url": "safari-pinned-tab.svg",
    "revision": "1c257ab0706bd73a11b393668b0a73e5"
  }, {
    "url": "exercises/1",
    "revision": "da9a43adabad490459dca38aae7bbc18"
  }, {
    "url": "exercises/10",
    "revision": "ee3119ead574306f1a167cc1ad82942e"
  }, {
    "url": "exercises/100",
    "revision": "3c0ca6af47299a5c20f88eb1fafb4513"
  }, {
    "url": "exercises/101",
    "revision": "1dfebe04ee73ffb7c8ae0a94cdc0d6bb"
  }, {
    "url": "exercises/102",
    "revision": "006bd9570988d610118b3ef4bd5a8b97"
  }, {
    "url": "exercises/103",
    "revision": "aa47b7c032627b89b22bbf392296bade"
  }, {
    "url": "exercises/104",
    "revision": "5d35cf7d74f98369527e06ab0091cebf"
  }, {
    "url": "exercises/105",
    "revision": "a8a6d50fbcbb61281438a73450281dde"
  }, {
    "url": "exercises/106",
    "revision": "ff46abc8f07d53e7e26f5d4fdc3fee54"
  }, {
    "url": "exercises/107",
    "revision": "106e1b363860694a727460babe51af93"
  }, {
    "url": "exercises/108",
    "revision": "2d393f53ad2dba55d6867ccaa5acdceb"
  }, {
    "url": "exercises/109",
    "revision": "8b372becc132fb5c23e2fd618efc99cc"
  }, {
    "url": "exercises/11",
    "revision": "64c66bdb30822556a57fe036d5e16a0b"
  }, {
    "url": "exercises/110",
    "revision": "30b479c56907eb00f5443601f6603309"
  }, {
    "url": "exercises/111",
    "revision": "6b4d7c99366968580b7e900c7d25ab0a"
  }, {
    "url": "exercises/112",
    "revision": "2f111749cf34c2714292ccc2c36acbe8"
  }, {
    "url": "exercises/113",
    "revision": "7b1faa0479e98485e9973136266770ab"
  }, {
    "url": "exercises/114",
    "revision": "00bd1c1b0082bc845a94a5abb8d49119"
  }, {
    "url": "exercises/115",
    "revision": "6e05e3228ac06392ac758fe16bcf4741"
  }, {
    "url": "exercises/116",
    "revision": "7abdc839d3f68df4a1b8445c15cdcc19"
  }, {
    "url": "exercises/117",
    "revision": "1b3eac1e0311a60c4444ceb7ebf64fe2"
  }, {
    "url": "exercises/118",
    "revision": "5d8aa356fb9553de33cafa2e940fc75c"
  }, {
    "url": "exercises/119",
    "revision": "803d02904a1a5748329b034a89d577b0"
  }, {
    "url": "exercises/12",
    "revision": "5571eaaa623b2d7fef221cb43f1ac9b0"
  }, {
    "url": "exercises/120",
    "revision": "da3ffdbdb9e578bf23a394d655ef3ed0"
  }, {
    "url": "exercises/121",
    "revision": "3d263369369ed92cc053c30084beb829"
  }, {
    "url": "exercises/122",
    "revision": "648a53474ecd1b4e92c95b35079dc66e"
  }, {
    "url": "exercises/123",
    "revision": "0670407325e8b0595f2bc74b885c23b0"
  }, {
    "url": "exercises/124",
    "revision": "e7e0c5e8029428640aa7bf4806329e9e"
  }, {
    "url": "exercises/125",
    "revision": "cb38f426cd81e569072253bbef7dd342"
  }, {
    "url": "exercises/13",
    "revision": "da219b2ee134ccc6d8213d690a449686"
  }, {
    "url": "exercises/14",
    "revision": "50da4640979cc2779b49db4f38e3bca4"
  }, {
    "url": "exercises/15",
    "revision": "b9cdd4475393d4be61119e0cccefc822"
  }, {
    "url": "exercises/16",
    "revision": "2c7f5ca83d81895afe7e5289420c89c9"
  }, {
    "url": "exercises/17",
    "revision": "e2cebbb33fa250a9ed393566b56f82d5"
  }, {
    "url": "exercises/18",
    "revision": "f118a27bb54ef8877e3cb0ebc6dee713"
  }, {
    "url": "exercises/19",
    "revision": "99a3b213ec4fcfd0007c97bad7a2221e"
  }, {
    "url": "exercises/2",
    "revision": "2632ab557f2a42e0e3736958e4c22bf1"
  }, {
    "url": "exercises/20",
    "revision": "55d71639f3a2bff23c375858d0cc9f53"
  }, {
    "url": "exercises/21",
    "revision": "605ccb1d7dcb73b394718b1ba623c0fe"
  }, {
    "url": "exercises/22",
    "revision": "2680f71c33084ee22207f0f5dbfd1923"
  }, {
    "url": "exercises/23",
    "revision": "7074b6b66fbdffaddfb0fcb7e373c677"
  }, {
    "url": "exercises/24",
    "revision": "0eb1f692d84e3c85ffb9cf33fa6539dc"
  }, {
    "url": "exercises/25",
    "revision": "62d9d5421e4747ddae623423c3146feb"
  }, {
    "url": "exercises/26",
    "revision": "6545a1e36fb288964229ec0cb2a35af0"
  }, {
    "url": "exercises/27",
    "revision": "1f0abf8b788fb13691edd979797df9ab"
  }, {
    "url": "exercises/28",
    "revision": "f731f7cba4e32a4b4d26211f23c93750"
  }, {
    "url": "exercises/29",
    "revision": "aa7a4f47185443acbf775be53da35604"
  }, {
    "url": "exercises/3",
    "revision": "854809809e545da50efefd438d7479df"
  }, {
    "url": "exercises/30",
    "revision": "6de6861e7e84be8ef931eb0a1c2ac770"
  }, {
    "url": "exercises/31",
    "revision": "3566f633852efde90dd3444b18ae4cee"
  }, {
    "url": "exercises/32",
    "revision": "3432cbf9f6588a02acf3a57f5e1af8c8"
  }, {
    "url": "exercises/33",
    "revision": "46ce7406f57740e5b54232042f7a88b5"
  }, {
    "url": "exercises/34",
    "revision": "7516b43cdf371fc359a14222293dce86"
  }, {
    "url": "exercises/35",
    "revision": "4538060cfe559dc80cc2c2a713035bd5"
  }, {
    "url": "exercises/36",
    "revision": "435ca5aea041b256d67e201d9626aebb"
  }, {
    "url": "exercises/37",
    "revision": "4a07a875529613718e73842a3117e78c"
  }, {
    "url": "exercises/38",
    "revision": "d412af21993b41cb8f97d790bb8bcfc8"
  }, {
    "url": "exercises/39",
    "revision": "8a77ec1b66bed82d86b0a0863199898f"
  }, {
    "url": "exercises/4",
    "revision": "686a74634a903d253da64fbb88084bb3"
  }, {
    "url": "exercises/40",
    "revision": "9d2c6ef5ae0c8eb489651ff0ec59bd63"
  }, {
    "url": "exercises/41",
    "revision": "ce2dc6fcd9d65a476870b8007479f8fe"
  }, {
    "url": "exercises/42",
    "revision": "637502d09b56f1720884b9475f4f7b68"
  }, {
    "url": "exercises/43",
    "revision": "4992d70efdcf77b25c70451f9203bc39"
  }, {
    "url": "exercises/44",
    "revision": "891163b26ecce2385831cb6e9927d5e5"
  }, {
    "url": "exercises/45",
    "revision": "768b2486ac68db99ee6bb54af8dac895"
  }, {
    "url": "exercises/46",
    "revision": "8cfc01ddd6c02660e6b932ce749d1fa3"
  }, {
    "url": "exercises/47",
    "revision": "3e6d3d8d63513f90d30104133bbca04c"
  }, {
    "url": "exercises/48",
    "revision": "18498c5ed9074a8e0e88f3081634bfa0"
  }, {
    "url": "exercises/49",
    "revision": "51ff3e79ea040745ba6fd40d55c70b93"
  }, {
    "url": "exercises/5",
    "revision": "17e3f610996de087fbc10c8bfde6f7c9"
  }, {
    "url": "exercises/50",
    "revision": "0267949d2d91f2aff4ddd8a9a0c861f7"
  }, {
    "url": "exercises/51",
    "revision": "dc390c8eb4463bb2f8cf1d02c5873d5b"
  }, {
    "url": "exercises/52",
    "revision": "031271966a8a956bc4a472e8874f4374"
  }, {
    "url": "exercises/53",
    "revision": "129a3023ad835cbd4c122fa8953e2012"
  }, {
    "url": "exercises/54",
    "revision": "30cf16505011a533aca92ce1937e0f29"
  }, {
    "url": "exercises/55",
    "revision": "9b2e4618899c4e87ea08d8870f4990a2"
  }, {
    "url": "exercises/56",
    "revision": "85c5e20434ff6c07deb66671b8a001cc"
  }, {
    "url": "exercises/57",
    "revision": "d226b67df777d4b5ba136f855ec537c4"
  }, {
    "url": "exercises/58",
    "revision": "06158955714353231684b6781a24a42a"
  }, {
    "url": "exercises/59",
    "revision": "d57570554bcaeef46b11852fe10ea203"
  }, {
    "url": "exercises/6",
    "revision": "7567f88c9129cbeffb8ce51005d826a6"
  }, {
    "url": "exercises/60",
    "revision": "be29b54d74c5df006de5f7e863f158e9"
  }, {
    "url": "exercises/61",
    "revision": "d2e0bb69966bcc4b7555fc5ae6a380bb"
  }, {
    "url": "exercises/62",
    "revision": "3b668fece068f98690fd9981a52fa3d4"
  }, {
    "url": "exercises/63",
    "revision": "842e26ee261ed7aafa1940906d7958ad"
  }, {
    "url": "exercises/64",
    "revision": "680fd1c7c680b129fb397fa9bb3df36d"
  }, {
    "url": "exercises/65",
    "revision": "e57e70c56982cf0a7f06f25d5e77917f"
  }, {
    "url": "exercises/66",
    "revision": "ee838d7f59e61aa96a87d2bd563cb30b"
  }, {
    "url": "exercises/67",
    "revision": "341a67b7bed09b2a206f893756273049"
  }, {
    "url": "exercises/68",
    "revision": "4889a0e0d77fc1b0fee3c7c64fdfc5e0"
  }, {
    "url": "exercises/69",
    "revision": "9c628de7497f5a5a8c84bb499e2a8ad4"
  }, {
    "url": "exercises/7",
    "revision": "58296dc1af3ea6849eaeabccdb83bf42"
  }, {
    "url": "exercises/70",
    "revision": "9bfddb25be2644b35fef4de330e9e6b1"
  }, {
    "url": "exercises/71",
    "revision": "47000345b41f9aff8f00eea539d5e072"
  }, {
    "url": "exercises/72",
    "revision": "f2be3e3c822a48c8cc38854f5100fb8d"
  }, {
    "url": "exercises/73",
    "revision": "ff4f4d485755cd6dd9a0f2596e503495"
  }, {
    "url": "exercises/74",
    "revision": "9593e7cfbd4434193a2196e59e4e86c3"
  }, {
    "url": "exercises/75",
    "revision": "6e9b99abcef420d11be8563affb1bd6e"
  }, {
    "url": "exercises/76",
    "revision": "baebf042db7486afa93ae971895b6b19"
  }, {
    "url": "exercises/77",
    "revision": "f06322886dc5d8353062c494f8585760"
  }, {
    "url": "exercises/78",
    "revision": "0bbe606783eebaa8a9a268ee02baa366"
  }, {
    "url": "exercises/79",
    "revision": "7d67e950ce660e6e3e17b940a5d2108e"
  }, {
    "url": "exercises/8",
    "revision": "a1510f39b78dc8604cc1ddb7bacd4cc6"
  }, {
    "url": "exercises/80",
    "revision": "240632c6a93e279d890a7381b562c542"
  }, {
    "url": "exercises/81",
    "revision": "c250ef82d38ead6960aec75a06c220c2"
  }, {
    "url": "exercises/82",
    "revision": "51f65910fce251097ab97af51bcf92a8"
  }, {
    "url": "exercises/83",
    "revision": "d30c78f6a9a53cef828bc535f50ae0f8"
  }, {
    "url": "exercises/84",
    "revision": "23fef445088564431464b47a8f5403b2"
  }, {
    "url": "exercises/85",
    "revision": "75c1d71147b2966c692f6c11a68a729e"
  }, {
    "url": "exercises/86",
    "revision": "361c180cd283b8892ed0d84e3e82c15d"
  }, {
    "url": "exercises/87",
    "revision": "67bac577223bed9b0c3fe292c7b424e9"
  }, {
    "url": "exercises/88",
    "revision": "f7bd50c6400797f4567eedeb2273e363"
  }, {
    "url": "exercises/89",
    "revision": "c1e3ce696a46375e6e04f836531d3655"
  }, {
    "url": "exercises/9",
    "revision": "4cd1c113b5e41dc266e135f3e4953e99"
  }, {
    "url": "exercises/90",
    "revision": "6ff8fa51a7beb94f2e3523f569f4522f"
  }, {
    "url": "exercises/91",
    "revision": "0a5add860dba87e3a73eb2ca8249cfb5"
  }, {
    "url": "exercises/92",
    "revision": "5d5cb28bacd6f23fc06d9c9476a68205"
  }, {
    "url": "exercises/93",
    "revision": "421363848b51b8dcc20b977b4994d274"
  }, {
    "url": "exercises/94",
    "revision": "92b61495a231d38acc4212b0e921247b"
  }, {
    "url": "exercises/95",
    "revision": "081368ae098da3d1659013f342396d3f"
  }, {
    "url": "exercises/96",
    "revision": "7d015ad22cbf82bc82091df375d99402"
  }, {
    "url": "exercises/97",
    "revision": "73ffbaee58bce4e6337551aa918deecc"
  }, {
    "url": "exercises/98",
    "revision": "9fb3efcd0a81cfc1087b0bacde8ce4ec"
  }, {
    "url": "exercises/99",
    "revision": "a1a9c3bc11b060b67e58cc82eb2d2b4c"
  }, {
    "url": "/exercises/",
    "revision": "cfd8ec15f5f441330544c542f2b2fd22"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
