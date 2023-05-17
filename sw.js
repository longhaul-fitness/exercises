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
    "url": "_app/immutable/chunks/paths.8ce27483.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.b2dc85db.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.303d49f8.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.9d59bf44.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.bfa2768a.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.1db543a3.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.62d6392b.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.ad34016e.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.f12a733d.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.20bbcede.js",
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
    "revision": "62aeb054cb9a9c7becc3f45ca67cdad4"
  }, {
    "url": "exercises/10",
    "revision": "7619c562a9d4d086b9e9e66a13d3c294"
  }, {
    "url": "exercises/100",
    "revision": "4a72ea55d60e705c422503456dde994a"
  }, {
    "url": "exercises/101",
    "revision": "c3acfeebf9cf20e5ee697e48da00f34e"
  }, {
    "url": "exercises/102",
    "revision": "182822d319766023109764b50ab6f443"
  }, {
    "url": "exercises/103",
    "revision": "698e83a216638a933e015d0d8b8044f4"
  }, {
    "url": "exercises/104",
    "revision": "2cc23571d59e2019a3a019885af142c0"
  }, {
    "url": "exercises/105",
    "revision": "937c76ea4c37e5c46c7a20e0f56e1169"
  }, {
    "url": "exercises/106",
    "revision": "5003823622333d2f2f57cf6ca3b23cd7"
  }, {
    "url": "exercises/107",
    "revision": "0d2c6d0db36db3536c7de1da391a0455"
  }, {
    "url": "exercises/108",
    "revision": "c2c0f208e3e47a62f8e876a206a0e0b6"
  }, {
    "url": "exercises/109",
    "revision": "ff448323e8a4aab51c580cfeb344cb8e"
  }, {
    "url": "exercises/11",
    "revision": "f7f6ca63658f712fd5e376506e537731"
  }, {
    "url": "exercises/110",
    "revision": "81248037085ae63377529df9a33aef94"
  }, {
    "url": "exercises/111",
    "revision": "9f9f1049662b97cf233d2f5bcd11dfc1"
  }, {
    "url": "exercises/112",
    "revision": "827359e6895df0e9184a407073968697"
  }, {
    "url": "exercises/113",
    "revision": "f44af64be5db2a7ff18b25e691af6868"
  }, {
    "url": "exercises/114",
    "revision": "39a96e3ac0dec28f58055a54c52563f3"
  }, {
    "url": "exercises/115",
    "revision": "9ba8b094508fc1e3bc237406e9cdbdd8"
  }, {
    "url": "exercises/116",
    "revision": "3a640408234d2711d255f69a7cf6f367"
  }, {
    "url": "exercises/117",
    "revision": "47d4eb3dc47a344ba7b7c63c6a59fd4a"
  }, {
    "url": "exercises/118",
    "revision": "76672a08cc04bfd3a46ae6d16420dfa3"
  }, {
    "url": "exercises/119",
    "revision": "0043f78948bda8980210f8c6cbf03f3d"
  }, {
    "url": "exercises/12",
    "revision": "40aa7bca190498ae89c3fd87e611b10d"
  }, {
    "url": "exercises/120",
    "revision": "cdb91878339329c4a5f83c57e2854ae7"
  }, {
    "url": "exercises/121",
    "revision": "3ff2595ce89b239126d3b9377f0c27fc"
  }, {
    "url": "exercises/122",
    "revision": "c71a6d413ddab179d7231c1f6e07ec8c"
  }, {
    "url": "exercises/123",
    "revision": "280d54491c6276ea8414aa0005cb3af0"
  }, {
    "url": "exercises/124",
    "revision": "8bcf2759dac0671a36b2b8ab4574f9c2"
  }, {
    "url": "exercises/125",
    "revision": "fa92cf26a4c66600ddedfefa93cf2e3c"
  }, {
    "url": "exercises/13",
    "revision": "659ac3561b0ee5083bb9c316c8a2a160"
  }, {
    "url": "exercises/14",
    "revision": "edbb189dbbdec0bca3d2b74b30309601"
  }, {
    "url": "exercises/15",
    "revision": "85c5756b1882afd94e2fe58275524b29"
  }, {
    "url": "exercises/16",
    "revision": "f06f0003b7501bbeefe6564198e34d71"
  }, {
    "url": "exercises/17",
    "revision": "e6e58c354b9c1e3eed2f8dfb9a291f39"
  }, {
    "url": "exercises/18",
    "revision": "4b939376dc2b9607fbcb58f4d74d69ca"
  }, {
    "url": "exercises/19",
    "revision": "99a4815e46455da89b5c2172005ccb59"
  }, {
    "url": "exercises/2",
    "revision": "a7792f6d300a755bb4a8848638f00ffa"
  }, {
    "url": "exercises/20",
    "revision": "bb90c16a550d6550a8e793e826a12409"
  }, {
    "url": "exercises/21",
    "revision": "51916a8bd087a80bc09d8398bfa1c2cb"
  }, {
    "url": "exercises/22",
    "revision": "a378f8e72feeb42711c296925f284612"
  }, {
    "url": "exercises/23",
    "revision": "723cc9cf7601df48e5305afbb4021b1d"
  }, {
    "url": "exercises/24",
    "revision": "e7e784cbb20530d8dcefee51546a4891"
  }, {
    "url": "exercises/25",
    "revision": "290af814c888087bdf2e22ce5d8fed56"
  }, {
    "url": "exercises/26",
    "revision": "2884550b1dc666e277d96ef0186d3e61"
  }, {
    "url": "exercises/27",
    "revision": "59d4e95f52c8da095ee952ee49d30e49"
  }, {
    "url": "exercises/28",
    "revision": "fbc2b36586b353c20da680a04fe260c1"
  }, {
    "url": "exercises/29",
    "revision": "8f68f2a625da48f6f3a25909f11c0465"
  }, {
    "url": "exercises/3",
    "revision": "ac58f9b2ab5d9b76e0eca287d3a86398"
  }, {
    "url": "exercises/30",
    "revision": "58a97efeec68c35decc190f52873428f"
  }, {
    "url": "exercises/31",
    "revision": "1eea92e87483d39fa957250920babb01"
  }, {
    "url": "exercises/32",
    "revision": "08d507bffd4665b7625bfd3fbc98b5bb"
  }, {
    "url": "exercises/33",
    "revision": "464b35d15722b4ec7733bd8f7ae3f047"
  }, {
    "url": "exercises/34",
    "revision": "d1a1b0fabc66f0d194a98c173b4434e9"
  }, {
    "url": "exercises/35",
    "revision": "1b5f5a9a88ad468e6d0c575b7d3af900"
  }, {
    "url": "exercises/36",
    "revision": "c70ff2dfcdbbb619b5f3a511e155fd3a"
  }, {
    "url": "exercises/37",
    "revision": "475ebb4e646f3f2ce8783f1c10894042"
  }, {
    "url": "exercises/38",
    "revision": "03f54e15229ca4a1f31ae3d9661276e4"
  }, {
    "url": "exercises/39",
    "revision": "844df2e435a0c7b5efb0163394dff9d3"
  }, {
    "url": "exercises/4",
    "revision": "e19424886b4fabf65e56722a44725373"
  }, {
    "url": "exercises/40",
    "revision": "1931d6d875d46a0f877f85f67e8ce188"
  }, {
    "url": "exercises/41",
    "revision": "591a51733ea0365b9a79a8633b166dc0"
  }, {
    "url": "exercises/42",
    "revision": "b104f1e39686527c99dc0821c56da5e7"
  }, {
    "url": "exercises/43",
    "revision": "4ceca91948f68cc71007625351af7480"
  }, {
    "url": "exercises/44",
    "revision": "46d498de7ee6aaa20335c7ac9dd0a050"
  }, {
    "url": "exercises/45",
    "revision": "4dbea19e226e1a767d6b1d075357ec4c"
  }, {
    "url": "exercises/46",
    "revision": "64062616691d12a9f994f65a05a2e43a"
  }, {
    "url": "exercises/47",
    "revision": "381318d3c401afdb704667bab569785f"
  }, {
    "url": "exercises/48",
    "revision": "63902fb611b2974f99306088fd6d7a98"
  }, {
    "url": "exercises/49",
    "revision": "ba98622268da441cf68dfb5cb81c80bd"
  }, {
    "url": "exercises/5",
    "revision": "7b550a479cee11d6ed91dc4a6f070a8b"
  }, {
    "url": "exercises/50",
    "revision": "a39785364d1bf5df8b6f9f3b4eb8a13b"
  }, {
    "url": "exercises/51",
    "revision": "637592534291162ff6005d0dc0355cae"
  }, {
    "url": "exercises/52",
    "revision": "1f7609fbb25e8c9036f779756ccce086"
  }, {
    "url": "exercises/53",
    "revision": "b99c34ce994e246f6aef8717de9138cb"
  }, {
    "url": "exercises/54",
    "revision": "fa697024595a2d595ed195193bb407d9"
  }, {
    "url": "exercises/55",
    "revision": "ef419d2a4ea32eed67add0b997653699"
  }, {
    "url": "exercises/56",
    "revision": "e40b2a0083560c03be7dd7ea96420ae8"
  }, {
    "url": "exercises/57",
    "revision": "16c045d22f233724ffb9b75d420e4526"
  }, {
    "url": "exercises/58",
    "revision": "9ea0b873fe540161e96ac4ac8fa7a08e"
  }, {
    "url": "exercises/59",
    "revision": "ce457488e7d4a91c27835ef97fb274f6"
  }, {
    "url": "exercises/6",
    "revision": "d179ed8a9cfc57c01acd2be2a26c9069"
  }, {
    "url": "exercises/60",
    "revision": "ffcc8c42c2db3fcdad5723c2f458ceb7"
  }, {
    "url": "exercises/61",
    "revision": "d2d0b0cd3ff6bc74a1a6358e63f66761"
  }, {
    "url": "exercises/62",
    "revision": "da40f192291470ce6f71bbf34910b90a"
  }, {
    "url": "exercises/63",
    "revision": "80ba5296bcb49109f6482d10e28dccbe"
  }, {
    "url": "exercises/64",
    "revision": "be914e45e73109d53e8c73dd96412f01"
  }, {
    "url": "exercises/65",
    "revision": "995a9ac001e71e7d64d8af0a7fea17ca"
  }, {
    "url": "exercises/66",
    "revision": "a4ae06d948b51ec064ff2de043d253b9"
  }, {
    "url": "exercises/67",
    "revision": "a548753ce6631fd58ffd72c518d41b79"
  }, {
    "url": "exercises/68",
    "revision": "b7f0f0f480bf9cc0557e00251869a3ec"
  }, {
    "url": "exercises/69",
    "revision": "ed6bc4125386bd73b382cc4a040061c5"
  }, {
    "url": "exercises/7",
    "revision": "08501cb13f608e101fc75353334568ad"
  }, {
    "url": "exercises/70",
    "revision": "c5b5b219456bd01439d5f88830de8527"
  }, {
    "url": "exercises/71",
    "revision": "05bc306b4db9e16ad5c53a4123dc36ac"
  }, {
    "url": "exercises/72",
    "revision": "1a7001c5527848b60e2af89de3007a47"
  }, {
    "url": "exercises/73",
    "revision": "0b98af1d1bcdcfc6c318f0efec712b1c"
  }, {
    "url": "exercises/74",
    "revision": "35e4594fc4195eeb56001af70b9bfebe"
  }, {
    "url": "exercises/75",
    "revision": "933562387635c632614b41cba0cf2007"
  }, {
    "url": "exercises/76",
    "revision": "09c82ad005c0ea408148b40d30bbb279"
  }, {
    "url": "exercises/77",
    "revision": "8fda745206996af9c7a68e483d0d7520"
  }, {
    "url": "exercises/78",
    "revision": "0124b639e37ce098ce506efbf2dc44a5"
  }, {
    "url": "exercises/79",
    "revision": "71efe88e126218cc810f59fe346ca922"
  }, {
    "url": "exercises/8",
    "revision": "ae20505128c0226e16ad30f1f55b51dd"
  }, {
    "url": "exercises/80",
    "revision": "34ce24eee2dcb78925e183bcd871df4b"
  }, {
    "url": "exercises/81",
    "revision": "260d0a75bc1e3780d06639e813b83584"
  }, {
    "url": "exercises/82",
    "revision": "cfaf95633a17d442856da732abdd8889"
  }, {
    "url": "exercises/83",
    "revision": "d15144790df98975eda9f121edc250d4"
  }, {
    "url": "exercises/84",
    "revision": "7f8f087e8bd40a01853ec02fc407ce5f"
  }, {
    "url": "exercises/85",
    "revision": "4e008c1c84b07ba7de698108e6790895"
  }, {
    "url": "exercises/86",
    "revision": "09b962ec9b14900b8d51457336acb6c1"
  }, {
    "url": "exercises/87",
    "revision": "dcd69326590fd8be68f35e0ca12197c3"
  }, {
    "url": "exercises/88",
    "revision": "4de4388a1138fe890ef2495dd7efd3d3"
  }, {
    "url": "exercises/89",
    "revision": "d0e9f62f825f562247c8e7fec67015f4"
  }, {
    "url": "exercises/9",
    "revision": "381513fbfd88d620d39af99b1e3f07fe"
  }, {
    "url": "exercises/90",
    "revision": "daa0d2ff6968e89ecab16f83b648018e"
  }, {
    "url": "exercises/91",
    "revision": "1155f3bbb34b232642703e4eb81dd63f"
  }, {
    "url": "exercises/92",
    "revision": "8e48d69f66e1c20abfeaac1bda14c385"
  }, {
    "url": "exercises/93",
    "revision": "22662ff13364433417cd28ae439b1079"
  }, {
    "url": "exercises/94",
    "revision": "0f93d2b3b43eba39be3d91ea480215de"
  }, {
    "url": "exercises/95",
    "revision": "e70a23b38123cbcba43b214ba2703fcc"
  }, {
    "url": "exercises/96",
    "revision": "f9181a89676f407c08a928da01249790"
  }, {
    "url": "exercises/97",
    "revision": "ba096c7beb0bd509413fcaef24de7192"
  }, {
    "url": "exercises/98",
    "revision": "e1309d263e18d5b15641fdb03a227c28"
  }, {
    "url": "exercises/99",
    "revision": "0db032bad54a49cf0fd1fcdce799fc02"
  }, {
    "url": "/exercises/",
    "revision": "56c0aa8f815708ac905c31f784a17041"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
