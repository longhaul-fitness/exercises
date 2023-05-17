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
    "url": "_app/immutable/chunks/paths.2ae6cbf7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.b2dc85db.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.bf115578.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.b0f69125.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.51fffc0f.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.0e81c2cc.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.62d6392b.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.5f541e20.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.5d54af4e.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.1e9c11f6.js",
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
    "revision": "de500dbbcecd3617d4ffc026c9175a13"
  }, {
    "url": "exercises/10",
    "revision": "1d6e0135ff39bbec8f9b8eaadbf5fed7"
  }, {
    "url": "exercises/100",
    "revision": "63e7028458099aff9f6b19515d6d3667"
  }, {
    "url": "exercises/101",
    "revision": "ff95dd5dce0bf16507440db4061d339a"
  }, {
    "url": "exercises/102",
    "revision": "06e59178e8d58f75cc9ab9029b166243"
  }, {
    "url": "exercises/103",
    "revision": "e77a77455fc1884d7f1bb2f5b6b1f6e7"
  }, {
    "url": "exercises/104",
    "revision": "be2db3d3761a35c39b7c32685c704aa8"
  }, {
    "url": "exercises/105",
    "revision": "01a2d9af0d6b6036efd55502d0b105c1"
  }, {
    "url": "exercises/106",
    "revision": "aa623e62b488510e13d78d8a2df2e959"
  }, {
    "url": "exercises/107",
    "revision": "a34ec94b9fd586dcaee24e80ecdb18fd"
  }, {
    "url": "exercises/108",
    "revision": "133ffb82cabc255931a996a7a5204e3d"
  }, {
    "url": "exercises/109",
    "revision": "15494e5f39bc4623c26c75fe78404db0"
  }, {
    "url": "exercises/11",
    "revision": "c4970f693abfda98c62a58cb7d12e6fa"
  }, {
    "url": "exercises/110",
    "revision": "1c1d714cf00d596e7cd4f879c52980de"
  }, {
    "url": "exercises/111",
    "revision": "ab1ac11fc36a295377299e1bd065d935"
  }, {
    "url": "exercises/112",
    "revision": "9af68354f9118abbcc143c2cbb2df317"
  }, {
    "url": "exercises/113",
    "revision": "c1f184a53f50add076bd6023f62bdf32"
  }, {
    "url": "exercises/114",
    "revision": "354656163feafb76e29b69c566749344"
  }, {
    "url": "exercises/115",
    "revision": "d58a685b87716d93881f05091116bb0e"
  }, {
    "url": "exercises/116",
    "revision": "bdd3d5291c9541a453577e126555feb0"
  }, {
    "url": "exercises/117",
    "revision": "dfea14241ed40299d0ea934c238e5a69"
  }, {
    "url": "exercises/118",
    "revision": "5e8f4d3e80fddbf8b6d4b445e82fa5cd"
  }, {
    "url": "exercises/119",
    "revision": "94836480ec669b3a36d7167a8440f812"
  }, {
    "url": "exercises/12",
    "revision": "d2e58f1653cdeef1498891c385a6d1cd"
  }, {
    "url": "exercises/120",
    "revision": "aa54754519cd0c9e5badb50589740681"
  }, {
    "url": "exercises/121",
    "revision": "aec7be79423897289c7aaeb5e78be5c1"
  }, {
    "url": "exercises/122",
    "revision": "351070f9aafe1c3f6dcf358fe46d33aa"
  }, {
    "url": "exercises/123",
    "revision": "13b1964e0b7caef5ade31979adb3df04"
  }, {
    "url": "exercises/124",
    "revision": "54f098dd118d5ab46cda9f1b03c8ac81"
  }, {
    "url": "exercises/125",
    "revision": "e0b71f8c49a3ff808fba3d5c2245c022"
  }, {
    "url": "exercises/13",
    "revision": "e05044eab8cce9eafa45f2271562e67b"
  }, {
    "url": "exercises/14",
    "revision": "39a490e62a8d5054b0fedeaf9a3ae1bf"
  }, {
    "url": "exercises/15",
    "revision": "ec7326b73d9cd793fe48246d6abaca3d"
  }, {
    "url": "exercises/16",
    "revision": "5db0795b5e2edf64067b9d393ac02ee3"
  }, {
    "url": "exercises/17",
    "revision": "3273ebba53ac5644954378e2ab2a0106"
  }, {
    "url": "exercises/18",
    "revision": "06fa30ee655ab1f9a6f34812f4c6dc83"
  }, {
    "url": "exercises/19",
    "revision": "35d13c43b229e5d113e84b3d30efda54"
  }, {
    "url": "exercises/2",
    "revision": "7144786ac0b9fc54e95ab95ed19875a4"
  }, {
    "url": "exercises/20",
    "revision": "2af203625ffa4e5c757e4f29b7c41cfb"
  }, {
    "url": "exercises/21",
    "revision": "584521d18eb03c18e5edace5388a6243"
  }, {
    "url": "exercises/22",
    "revision": "d4c2c6a30944bf48bb61a61983d6c06c"
  }, {
    "url": "exercises/23",
    "revision": "4b8a3833a5adfb8a53c1186102f2ef83"
  }, {
    "url": "exercises/24",
    "revision": "2c6ccd285d24e099095a90e5f1d19f6a"
  }, {
    "url": "exercises/25",
    "revision": "716f20a0ab98b3b04f3731c4d0b404a2"
  }, {
    "url": "exercises/26",
    "revision": "6f87c9087a52d8ff5b5c66adeae24f6b"
  }, {
    "url": "exercises/27",
    "revision": "769336db87934628fae358d8dbfefd3d"
  }, {
    "url": "exercises/28",
    "revision": "69c10382d808af74b7aa3e675b95990a"
  }, {
    "url": "exercises/29",
    "revision": "bb04127916f5b67e806addb2cc68eb15"
  }, {
    "url": "exercises/3",
    "revision": "98a47e657ff2910e106e7e706be7b20d"
  }, {
    "url": "exercises/30",
    "revision": "3a66fcc0252eb766a22cc3afa821d6c2"
  }, {
    "url": "exercises/31",
    "revision": "b0edb63dabe3bd2da40e2ab0a3f3f336"
  }, {
    "url": "exercises/32",
    "revision": "236bcac34e66d256e90044bd74e57718"
  }, {
    "url": "exercises/33",
    "revision": "9d98d275d28d02f80fd9b3d0ca8d105b"
  }, {
    "url": "exercises/34",
    "revision": "0c6effb33906032b506433feb2a8f771"
  }, {
    "url": "exercises/35",
    "revision": "6f69a9154681d1337dcc43f4afa45a73"
  }, {
    "url": "exercises/36",
    "revision": "b9395120c365ae20f6593b576e3e7ee9"
  }, {
    "url": "exercises/37",
    "revision": "2a0a2ac7a5c3192116f90dd63291548c"
  }, {
    "url": "exercises/38",
    "revision": "b62a1dd459ee7a4603dcf3f89851660e"
  }, {
    "url": "exercises/39",
    "revision": "4ff078fe2573adc41a980ee4c9c96214"
  }, {
    "url": "exercises/4",
    "revision": "ab7afcf6e2cf16cf4ebda33328024756"
  }, {
    "url": "exercises/40",
    "revision": "bbfcb73a46a119f2718fc7fd92964407"
  }, {
    "url": "exercises/41",
    "revision": "52dde958224c69d611042eec8bc6c98f"
  }, {
    "url": "exercises/42",
    "revision": "c96f6fee0d2821ca39d9c17847901d0f"
  }, {
    "url": "exercises/43",
    "revision": "f04c362b94cc2f0d27c8feadd749a615"
  }, {
    "url": "exercises/44",
    "revision": "27635d62c4d42a420c88726385576da1"
  }, {
    "url": "exercises/45",
    "revision": "e24921d85313ea10a5bc8c330b048f7a"
  }, {
    "url": "exercises/46",
    "revision": "6bf06e754a43264546cef255cd8afe0d"
  }, {
    "url": "exercises/47",
    "revision": "cf7cb739818e1f2790126f1d908f545d"
  }, {
    "url": "exercises/48",
    "revision": "231f99eb5db4f279be73bea8ca0c2a55"
  }, {
    "url": "exercises/49",
    "revision": "bede7d98695f835f20c6775a769f3892"
  }, {
    "url": "exercises/5",
    "revision": "af1eb8cf4471e3aeedab7d8692b1e42e"
  }, {
    "url": "exercises/50",
    "revision": "506906c367ec39b0d1aaec519eed5077"
  }, {
    "url": "exercises/51",
    "revision": "c429ed764f6672e31aff49b7f84332f7"
  }, {
    "url": "exercises/52",
    "revision": "48abdd592ccc5b30750b7c47c148685c"
  }, {
    "url": "exercises/53",
    "revision": "de1e340386303838763d5c1c5ab012fc"
  }, {
    "url": "exercises/54",
    "revision": "7a99671cef82eb044f6c3de6dd21cf9b"
  }, {
    "url": "exercises/55",
    "revision": "0f7b0a48efe2e9dbd137f2ba368d2654"
  }, {
    "url": "exercises/56",
    "revision": "b008b1f4694dc09d649ba2e2c7ab38da"
  }, {
    "url": "exercises/57",
    "revision": "14e96244d0ff5c9117aa0da2bc4d2876"
  }, {
    "url": "exercises/58",
    "revision": "24f729d9b38443a3d6998e1aa4a7df76"
  }, {
    "url": "exercises/59",
    "revision": "c1739f85626f46f3bb12bbe2beda9a67"
  }, {
    "url": "exercises/6",
    "revision": "3080e2b944aee3fa34c2f122bacdda27"
  }, {
    "url": "exercises/60",
    "revision": "c89540215ec93ee79e8f6ed2e4ec74c2"
  }, {
    "url": "exercises/61",
    "revision": "17682e3f0645406f7a03d95c4f6436b4"
  }, {
    "url": "exercises/62",
    "revision": "8e72ceacfbcd0e3844dbe990b34b8ec1"
  }, {
    "url": "exercises/63",
    "revision": "932d654dd7ce7c4e64686a8be1501f30"
  }, {
    "url": "exercises/64",
    "revision": "cddafc2392e473ce9909a7f8f94fb7f8"
  }, {
    "url": "exercises/65",
    "revision": "efc9c5d6449f86c916067a13888323f4"
  }, {
    "url": "exercises/66",
    "revision": "7cd579f1d0fa70cad74870bfb7238321"
  }, {
    "url": "exercises/67",
    "revision": "4cbe48c3be717349f86f91405c12fb55"
  }, {
    "url": "exercises/68",
    "revision": "693f709c5835916ddd0dec61a3dac1eb"
  }, {
    "url": "exercises/69",
    "revision": "9a525c55c72e384936d5bb9ab18aabc8"
  }, {
    "url": "exercises/7",
    "revision": "7108d8303d4f7d229dd924642ee5bd87"
  }, {
    "url": "exercises/70",
    "revision": "21ab05bc5e962d2e13c38abc67b426bb"
  }, {
    "url": "exercises/71",
    "revision": "b83727da22696edf9b24661a6ad25bb2"
  }, {
    "url": "exercises/72",
    "revision": "e19dd383ad542c872ce9f6facbde0e8c"
  }, {
    "url": "exercises/73",
    "revision": "d5c45910a3ac3ea6011cd8214a73c343"
  }, {
    "url": "exercises/74",
    "revision": "1b11c6de61415e3f9b0148cfad6404b0"
  }, {
    "url": "exercises/75",
    "revision": "262195c8b920a2a37fc7e0bcdacf1baf"
  }, {
    "url": "exercises/76",
    "revision": "3c0138b2cbb5ec5f194fb9263f4f165a"
  }, {
    "url": "exercises/77",
    "revision": "4081f0a2d53513696e0abb662fee9ae2"
  }, {
    "url": "exercises/78",
    "revision": "6eecbbf19ec8aedec9c75e2ddf780b09"
  }, {
    "url": "exercises/79",
    "revision": "1ceb956043aa7895964ed534a2470bd3"
  }, {
    "url": "exercises/8",
    "revision": "7b2402590ed7e646980d1f5707496245"
  }, {
    "url": "exercises/80",
    "revision": "fda9536fcddef0f43431a4af9a3a8fe1"
  }, {
    "url": "exercises/81",
    "revision": "19d1a4864426f3b8d0fe4f5ca203f679"
  }, {
    "url": "exercises/82",
    "revision": "4039bae1f0f2c46752758618fbbc7c25"
  }, {
    "url": "exercises/83",
    "revision": "e01ee0165876178c6d5b26791c400e94"
  }, {
    "url": "exercises/84",
    "revision": "8b400861f44da85b8d3fb5b46bcfc18a"
  }, {
    "url": "exercises/85",
    "revision": "955bcaeb7bb1ff9cdebb594fe16a50d8"
  }, {
    "url": "exercises/86",
    "revision": "2ef42262f94a7813685ef05545358da2"
  }, {
    "url": "exercises/87",
    "revision": "5759b6e631a12600d7532b5520e4ffc0"
  }, {
    "url": "exercises/88",
    "revision": "25c458b1746ff4328c5b3bf7c9678add"
  }, {
    "url": "exercises/89",
    "revision": "9d4c604635bd4af2b2b7fae0b52b13e2"
  }, {
    "url": "exercises/9",
    "revision": "44a6a21a3abfed9fd4c45d1b56e8c6ed"
  }, {
    "url": "exercises/90",
    "revision": "e0ede86ea1e672bc59cf2e007249b959"
  }, {
    "url": "exercises/91",
    "revision": "04b518cd4234e8fbaf90526731a628e2"
  }, {
    "url": "exercises/92",
    "revision": "6bfdd95e40a9bcfd211546b7ca7435d5"
  }, {
    "url": "exercises/93",
    "revision": "7d77fad831427b2865e5b761675280b0"
  }, {
    "url": "exercises/94",
    "revision": "906025f47a9ddfb5828e9f0d45c599c3"
  }, {
    "url": "exercises/95",
    "revision": "81a51143dc27ca552783fdc2980c5c45"
  }, {
    "url": "exercises/96",
    "revision": "eab7f06e65fc85a39a8fbea1f8aa8b0e"
  }, {
    "url": "exercises/97",
    "revision": "6fd53b2cc1600cf1a81655501b9afbaa"
  }, {
    "url": "exercises/98",
    "revision": "8af43d23d7ee3917c5231fef823b4c2c"
  }, {
    "url": "exercises/99",
    "revision": "cec6bc4be44aa298658d333284c73c67"
  }, {
    "url": "/exercises/",
    "revision": "7d9a58bd1936fddf860077f66fc2a5fe"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
