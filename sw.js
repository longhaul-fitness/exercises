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
    "url": "_app/immutable/chunks/paths.8c115874.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.51eca629.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.cd557909.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.262f577a.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.b39c0dc8.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.b16efeb6.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.f9b4ff53.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.2d9de097.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.7ffd19ae.js",
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
    "revision": "38a439cfa86ea0955baf3f21a177b600"
  }, {
    "url": "exercises/10",
    "revision": "98e4baf15e5612a65a7cbd105fdd33a4"
  }, {
    "url": "exercises/100",
    "revision": "9a80a7e6dcdb22ac1fa8a6844f719f1a"
  }, {
    "url": "exercises/101",
    "revision": "6ccfb95203f1445b8ff9407652e84f8d"
  }, {
    "url": "exercises/102",
    "revision": "faef6497732eb79c07c40480826fd6ee"
  }, {
    "url": "exercises/103",
    "revision": "960c797889fee2fee927af7fe40e4807"
  }, {
    "url": "exercises/104",
    "revision": "0b0e479b907ac95187951bd9aad9dbb1"
  }, {
    "url": "exercises/105",
    "revision": "f99b6ac6b43bd177f96db9915685484a"
  }, {
    "url": "exercises/106",
    "revision": "64ddaf781ef00bdcbf3d808b2e4e58ce"
  }, {
    "url": "exercises/107",
    "revision": "83fb2adf2fd9c42b81f56344d1499f20"
  }, {
    "url": "exercises/108",
    "revision": "7ac8981b21888f227de3962ad9400e76"
  }, {
    "url": "exercises/109",
    "revision": "af330b9c4e630e3c7d6bd890bb4666fd"
  }, {
    "url": "exercises/11",
    "revision": "b5b481c27e800f8f1addec34090708b1"
  }, {
    "url": "exercises/110",
    "revision": "f7d03ac2c64e6d53a3b64955a997484e"
  }, {
    "url": "exercises/111",
    "revision": "c3bcf3d5d7c0d86a81fbef019dbe7386"
  }, {
    "url": "exercises/112",
    "revision": "e15caf4d28308ebcba14408d894cf936"
  }, {
    "url": "exercises/113",
    "revision": "511d1321ded41ef59aa9dc24542165d2"
  }, {
    "url": "exercises/114",
    "revision": "17a4a46dd4b95ce29f6684e0a94bd5ef"
  }, {
    "url": "exercises/115",
    "revision": "ed0ed75e1941fc5a14ba13e671d8bea6"
  }, {
    "url": "exercises/116",
    "revision": "1c0b1115f21036a00e9de99f941ad39c"
  }, {
    "url": "exercises/117",
    "revision": "2ab7b56f5744ef36d5330c3bc441a93d"
  }, {
    "url": "exercises/118",
    "revision": "5e60ca4e939cad4b3b14582e3fde2e11"
  }, {
    "url": "exercises/119",
    "revision": "b0b7687c35e68658ed654e73b1b923fb"
  }, {
    "url": "exercises/12",
    "revision": "d644fa89d630610bd425c2e59e8ffb26"
  }, {
    "url": "exercises/120",
    "revision": "1a993da35c46b2647ac198489b9554c5"
  }, {
    "url": "exercises/121",
    "revision": "82cbea30e061860007528f80f51f3a8f"
  }, {
    "url": "exercises/122",
    "revision": "4d903692e52582ae1ba2a493ca1563ac"
  }, {
    "url": "exercises/123",
    "revision": "aa0d55c333e4ecb7d1aaed8bfc71fc64"
  }, {
    "url": "exercises/124",
    "revision": "3209a3199d40dd2b89fee399d847ce1d"
  }, {
    "url": "exercises/125",
    "revision": "fc28f48d60cf9ed1a5d52c1cdfdf251a"
  }, {
    "url": "exercises/13",
    "revision": "ad92de0fb5a1488e62eecfe0e7cfed72"
  }, {
    "url": "exercises/14",
    "revision": "78183c1fdd0f7e15506d573e92fc2d65"
  }, {
    "url": "exercises/15",
    "revision": "eb9c7b03b785b453081d76ad5d504282"
  }, {
    "url": "exercises/16",
    "revision": "51b1d666cfe77da175281672a2667afd"
  }, {
    "url": "exercises/17",
    "revision": "4699c96364d35e80504779ad53c7f4ec"
  }, {
    "url": "exercises/18",
    "revision": "f5a3b270d7bb4cf8f88c2e1f07034f74"
  }, {
    "url": "exercises/19",
    "revision": "34c254ca6d90213b624e2fc3c4b6e9be"
  }, {
    "url": "exercises/2",
    "revision": "8076a6fc7791df31b1c4e2fa43b2245c"
  }, {
    "url": "exercises/20",
    "revision": "52953c1a29929f07ecb12346c12860c4"
  }, {
    "url": "exercises/21",
    "revision": "b0e18c55acf9d351eae8501b6089f7e9"
  }, {
    "url": "exercises/22",
    "revision": "f039216b2a11a071e8f9078e18917fd7"
  }, {
    "url": "exercises/23",
    "revision": "dee85f58f300471b8d3641763ad4af0b"
  }, {
    "url": "exercises/24",
    "revision": "92d5bfd4cc68d82a8e2d65dd5d196ad6"
  }, {
    "url": "exercises/25",
    "revision": "8ea796814c1596feb565d746bc5c7fda"
  }, {
    "url": "exercises/26",
    "revision": "6938c95c765a865f993c5dc658c6147c"
  }, {
    "url": "exercises/27",
    "revision": "67d3948d3ee401cec6327b847207e46f"
  }, {
    "url": "exercises/28",
    "revision": "8e8c4c54c6f5ebbbf48af5df091c2d29"
  }, {
    "url": "exercises/29",
    "revision": "c676d41e8b53b53f4efe4bb6785ef182"
  }, {
    "url": "exercises/3",
    "revision": "df73452723ba88fa68ab0fec09889b3b"
  }, {
    "url": "exercises/30",
    "revision": "a5aac555398251892849044e7e4eb93d"
  }, {
    "url": "exercises/31",
    "revision": "9e86d4986b39e8c0de9e07654f220e20"
  }, {
    "url": "exercises/32",
    "revision": "e579316b3ae98d92464a8e1a7dfa6ec1"
  }, {
    "url": "exercises/33",
    "revision": "031affd7292f9d90737b69ab6b375d09"
  }, {
    "url": "exercises/34",
    "revision": "c5861efe17265e850498da2492be2d9f"
  }, {
    "url": "exercises/35",
    "revision": "4e5ba63ae1f529b49748a408a252f8a6"
  }, {
    "url": "exercises/36",
    "revision": "923626ce6cf0e6100809c4be61f7bd52"
  }, {
    "url": "exercises/37",
    "revision": "1872a5f10c0bad5852eb934677ce2ee6"
  }, {
    "url": "exercises/38",
    "revision": "58584f72750eb8cd40a8036a8d6a83ed"
  }, {
    "url": "exercises/39",
    "revision": "a7b105955b9a0beb9cdf325988cce170"
  }, {
    "url": "exercises/4",
    "revision": "bc8297ae6a04a8078429a060b1cc3815"
  }, {
    "url": "exercises/40",
    "revision": "7fc4e61b6c71b898704e06ad33a87aaf"
  }, {
    "url": "exercises/41",
    "revision": "cfb967f662e1fa158dce65a669155a4d"
  }, {
    "url": "exercises/42",
    "revision": "3a13d1e05ba4c2a699ecaaf8d46bef60"
  }, {
    "url": "exercises/43",
    "revision": "a3bf1206e36cf7bd965458822ce0e7d4"
  }, {
    "url": "exercises/44",
    "revision": "8abfac11697a6eefcf06b26b32bff11d"
  }, {
    "url": "exercises/45",
    "revision": "86a943a48fff6184ad614b4b34c5c04e"
  }, {
    "url": "exercises/46",
    "revision": "35ac8286cd8c564ad2944bd450dca0ab"
  }, {
    "url": "exercises/47",
    "revision": "e2ed4a25a2ea2e7ddd8f1d6c24aaae8b"
  }, {
    "url": "exercises/48",
    "revision": "03067d3539af37111cc617482e838933"
  }, {
    "url": "exercises/49",
    "revision": "0c7d0c27164fd601072dae8321357fdc"
  }, {
    "url": "exercises/5",
    "revision": "6bf97a20e8fc010a75dce72a23b7b1b9"
  }, {
    "url": "exercises/50",
    "revision": "63b2003592708e095739ddbf948537c3"
  }, {
    "url": "exercises/51",
    "revision": "9022a8dbdab217b523954d2654efef10"
  }, {
    "url": "exercises/52",
    "revision": "849891ae4654cd0505a91a6fe719865c"
  }, {
    "url": "exercises/53",
    "revision": "121e40afe97a1e99d2cbdcffae90cafd"
  }, {
    "url": "exercises/54",
    "revision": "b9f76e3a5d2e3d03af93d822282ed6cf"
  }, {
    "url": "exercises/55",
    "revision": "bc4ced0d7bc5e982a5cc2b52b3a89528"
  }, {
    "url": "exercises/56",
    "revision": "4f40d8927fe6a9f1a0e0017079d68d3f"
  }, {
    "url": "exercises/57",
    "revision": "b17834883e1c558fc166ce1382311010"
  }, {
    "url": "exercises/58",
    "revision": "aadfff41278dda5aefe71b9c40d0fb17"
  }, {
    "url": "exercises/59",
    "revision": "b5d6c141657813fdb848d0ef8c383ec2"
  }, {
    "url": "exercises/6",
    "revision": "307328116710a4d2d7a4a7cb7fdea280"
  }, {
    "url": "exercises/60",
    "revision": "6eca12afd7cf8265b008aa468dc217df"
  }, {
    "url": "exercises/61",
    "revision": "d8612571359b67b112808adc11434fc2"
  }, {
    "url": "exercises/62",
    "revision": "0aaa324765e8990b8ce9d858caf31db6"
  }, {
    "url": "exercises/63",
    "revision": "df6447a0ace5aded215ce124f8ad4fca"
  }, {
    "url": "exercises/64",
    "revision": "83c6f2690ad576f5f2997e606eec0ca2"
  }, {
    "url": "exercises/65",
    "revision": "588a49cab4cae2b3f2e64a15e2197feb"
  }, {
    "url": "exercises/66",
    "revision": "5588ccf07a55daa5820c22b9251dfca4"
  }, {
    "url": "exercises/67",
    "revision": "05f9e007be7945c3fa3855b072ccfc22"
  }, {
    "url": "exercises/68",
    "revision": "260cf919e732bfd9e00483b64dc415dc"
  }, {
    "url": "exercises/69",
    "revision": "d46d97f91b30e3de61f75ab46ed06170"
  }, {
    "url": "exercises/7",
    "revision": "a545052e341ba57b80bccdfbf9c10af3"
  }, {
    "url": "exercises/70",
    "revision": "e90e8b5d6fc5f3f04c1fedc4f9609fb4"
  }, {
    "url": "exercises/71",
    "revision": "89c780ad824ef888a27c5b3bc8d07ccc"
  }, {
    "url": "exercises/72",
    "revision": "10f7bb4214589e19f58695f028cab771"
  }, {
    "url": "exercises/73",
    "revision": "b4f56e99dda6e3a4087dc65b318c6761"
  }, {
    "url": "exercises/74",
    "revision": "eb2506a28992af3d7d117bddd6f611d1"
  }, {
    "url": "exercises/75",
    "revision": "f82cd52172b4991e3e3d8ac1e55871d0"
  }, {
    "url": "exercises/76",
    "revision": "b687c436db524ca441e53e64eed9f8df"
  }, {
    "url": "exercises/77",
    "revision": "533d31d4de11b87681a1019916c727e6"
  }, {
    "url": "exercises/78",
    "revision": "f451f126d4af187784f2d38ace58e915"
  }, {
    "url": "exercises/79",
    "revision": "1c19d7f4d7f049adceecc7fa864e9398"
  }, {
    "url": "exercises/8",
    "revision": "3cc68dfdc241e47bec06e2a892635172"
  }, {
    "url": "exercises/80",
    "revision": "5a80e0d5bcbafe2493c6c2170ff3bcc5"
  }, {
    "url": "exercises/81",
    "revision": "dbbd51046b2e6869739906782fd283e9"
  }, {
    "url": "exercises/82",
    "revision": "5e72685cd5f22eb14684d299edb2c7f9"
  }, {
    "url": "exercises/83",
    "revision": "4b90b92489d24052a3e9df40d4766bad"
  }, {
    "url": "exercises/84",
    "revision": "be2e101779b1d6717a7bbd2d2a6b39d0"
  }, {
    "url": "exercises/85",
    "revision": "721060d60a73f235b341c9ec5d526235"
  }, {
    "url": "exercises/86",
    "revision": "e9a1c0166c4797d5abb105dc350f4176"
  }, {
    "url": "exercises/87",
    "revision": "a9e0d3bd6ff7da5ccd3fa516aeb359d3"
  }, {
    "url": "exercises/88",
    "revision": "5e1b37b55f15d4991393e0f2f94e7ff9"
  }, {
    "url": "exercises/89",
    "revision": "2c8842baeb202a02579d628e91ee198c"
  }, {
    "url": "exercises/9",
    "revision": "8c0aa9294434b64f330a16b403766e07"
  }, {
    "url": "exercises/90",
    "revision": "c347ab2e2ed189ca6d324a86b48a64f4"
  }, {
    "url": "exercises/91",
    "revision": "d40fa262f1350e460be9cce5957cc2f7"
  }, {
    "url": "exercises/92",
    "revision": "e04cc762d49b457563f93628a2e55382"
  }, {
    "url": "exercises/93",
    "revision": "ad1c7a17a210160325d3c55b48c10eed"
  }, {
    "url": "exercises/94",
    "revision": "f8ad0e6357a10c3f16cc919bc4628d77"
  }, {
    "url": "exercises/95",
    "revision": "8d6acc6d537fe5e7a9eb420fa85eb1c0"
  }, {
    "url": "exercises/96",
    "revision": "aa28e34d8102e8586a1b107abaf42f90"
  }, {
    "url": "exercises/97",
    "revision": "c76e30ea9f526796b310c524876e381e"
  }, {
    "url": "exercises/98",
    "revision": "bc4134a22609e9d66af9b7cea5b8fa74"
  }, {
    "url": "exercises/99",
    "revision": "6cca59d0228a9f9d3c9807b6c86bf78f"
  }, {
    "url": "/sveltekit-gh-pages/",
    "revision": "cdaf3af4e93c1d5040c85dad2e912bd6"
  }, {
    "url": "manifest.webmanifest",
    "revision": "eed4c1c6b9a0ea833b1e41e7c0642bca"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/sveltekit-gh-pages/")));

}));
