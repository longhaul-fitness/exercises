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
    "url": "_app/immutable/chunks/paths.2791495a.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.b2e5c6a8.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.c2ae283b.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.6bce43a6.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.23a924c7.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.4a016b76.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.5cdeeeca.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.070dc153.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.c66f0992.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.8781e6ce.js",
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
    "revision": "22a07bf4e928f58b5f5c98bdd2875254"
  }, {
    "url": "exercises/10",
    "revision": "fd28c31fb5005281b57fa0baea839217"
  }, {
    "url": "exercises/100",
    "revision": "64d06a7710013925639a816dbe34149b"
  }, {
    "url": "exercises/101",
    "revision": "b6ff31c5a5e30b2dfdab96b2fe942a20"
  }, {
    "url": "exercises/102",
    "revision": "aaf433b540584ace9e8c9313630435c6"
  }, {
    "url": "exercises/103",
    "revision": "eb10dd32afae16388fe68722dd9d6fe6"
  }, {
    "url": "exercises/104",
    "revision": "b33af000b34378561c6dd1bb0e790a87"
  }, {
    "url": "exercises/105",
    "revision": "bc2867e9c5a37fa6e9444b664cd8af12"
  }, {
    "url": "exercises/106",
    "revision": "28fb7a0acc8ddd709914e4aca94c034c"
  }, {
    "url": "exercises/107",
    "revision": "32050e0f2f4b35cb7fedee3e41885818"
  }, {
    "url": "exercises/108",
    "revision": "327634a1ae77770148281a88ae2ce177"
  }, {
    "url": "exercises/109",
    "revision": "33f68245d9ea00042a2c4642d6617753"
  }, {
    "url": "exercises/11",
    "revision": "982e71fbf73a226f52f8a164f7493c23"
  }, {
    "url": "exercises/110",
    "revision": "8eda2ce748a9b374db38d5798cd0dd9b"
  }, {
    "url": "exercises/111",
    "revision": "203769b57f7cc306c4597896d3cb0869"
  }, {
    "url": "exercises/112",
    "revision": "798bf68c6232821993887e2ba8aa7485"
  }, {
    "url": "exercises/113",
    "revision": "3427f7ec82c6e63acb0ba2558d0ba0c3"
  }, {
    "url": "exercises/114",
    "revision": "7e25648f9df736bf13aacf228c73d039"
  }, {
    "url": "exercises/115",
    "revision": "ea9db81a0f350cc4eae26d89ce276812"
  }, {
    "url": "exercises/116",
    "revision": "3f75a8bebb8bc209314a6e7aa66de261"
  }, {
    "url": "exercises/117",
    "revision": "157ad7278fa6e4d83160eb002c60d85f"
  }, {
    "url": "exercises/118",
    "revision": "0320502bf6f56202f04e1e1631b3ac67"
  }, {
    "url": "exercises/119",
    "revision": "de8159faefcd7e31dc0e4fa42f67d988"
  }, {
    "url": "exercises/12",
    "revision": "30c3c76e173f31cd6868a479dfe10093"
  }, {
    "url": "exercises/120",
    "revision": "9ee77b1ca1405fb65c9cc1aece1a7d02"
  }, {
    "url": "exercises/121",
    "revision": "2fc7fd89106a10e0993bb12c47aa47f7"
  }, {
    "url": "exercises/122",
    "revision": "4c71125ce31e0713c1e3448414ed3508"
  }, {
    "url": "exercises/123",
    "revision": "ddce222215ba7a726e58e09dbe9839e2"
  }, {
    "url": "exercises/124",
    "revision": "ee82d5ec74aa96b8dd6b3845285e9d64"
  }, {
    "url": "exercises/125",
    "revision": "5196d0a372378ecbfdb489a754a24560"
  }, {
    "url": "exercises/13",
    "revision": "671de31de417dcc490ad3a580a27b9bc"
  }, {
    "url": "exercises/14",
    "revision": "5a3a49909fd676cceb45df93f5ee5f61"
  }, {
    "url": "exercises/15",
    "revision": "4a6504061e2b86b95506c7b3be2eaf68"
  }, {
    "url": "exercises/16",
    "revision": "7231efd424de1f1e79623cd29e8330cc"
  }, {
    "url": "exercises/17",
    "revision": "9efa6921b6d1c239f5f12d8166f8cc11"
  }, {
    "url": "exercises/18",
    "revision": "2e6fa9e155463035e1a6ebf36cf28e73"
  }, {
    "url": "exercises/19",
    "revision": "e2bf1f710b60a310374bf5b79c87bf86"
  }, {
    "url": "exercises/2",
    "revision": "ddfa5dd2257058766f460d31fb246fcd"
  }, {
    "url": "exercises/20",
    "revision": "d75e01549c37ae2852c3bfff60d0f665"
  }, {
    "url": "exercises/21",
    "revision": "ebbfb75823b9e3cbbff9e9fa5cf36246"
  }, {
    "url": "exercises/22",
    "revision": "a8f1740e18010d5ace35328fbe877e77"
  }, {
    "url": "exercises/23",
    "revision": "2788a85f91285b6a1ecb58e3286c554e"
  }, {
    "url": "exercises/24",
    "revision": "aaf92d620ea01d738e63002db00c226f"
  }, {
    "url": "exercises/25",
    "revision": "4cfef2040790bd4246a5e54f98daf222"
  }, {
    "url": "exercises/26",
    "revision": "d4f1336e340e67c76637cf08ac6a3e00"
  }, {
    "url": "exercises/27",
    "revision": "e649c20894e49d5a9ae8733bc8962a3a"
  }, {
    "url": "exercises/28",
    "revision": "7bf27c22a18f27e5f02de6b0908362b3"
  }, {
    "url": "exercises/29",
    "revision": "1b65b53ac6b5c87c5f92b563ac80c94b"
  }, {
    "url": "exercises/3",
    "revision": "1c9da74198bdbe3f366152675443649e"
  }, {
    "url": "exercises/30",
    "revision": "e737c03908720d24f92e653393ac8d7f"
  }, {
    "url": "exercises/31",
    "revision": "69dbf7f4fa5c33f3b7de0a3f6bcb1c92"
  }, {
    "url": "exercises/32",
    "revision": "e2ea59a9d54d73051b08c31f08486c18"
  }, {
    "url": "exercises/33",
    "revision": "6f2b1b28059b5ed6e80347aa42935506"
  }, {
    "url": "exercises/34",
    "revision": "85fd3e48614d61af001409a0bdfe442e"
  }, {
    "url": "exercises/35",
    "revision": "89eead17b817beff97a95470f1a069da"
  }, {
    "url": "exercises/36",
    "revision": "6b2f302af4a8a69cd6de2ee51cfcd5b0"
  }, {
    "url": "exercises/37",
    "revision": "821293d18f5eb36c0af4d5835f620250"
  }, {
    "url": "exercises/38",
    "revision": "7d9e3b25bfca6f031cb72ad05733bc45"
  }, {
    "url": "exercises/39",
    "revision": "34f95f6f54b1017bba818e9fea173b49"
  }, {
    "url": "exercises/4",
    "revision": "961387e3ca5fe3bba63b35f51fa11562"
  }, {
    "url": "exercises/40",
    "revision": "fc008e83ed2eb326fc1472fb37f81736"
  }, {
    "url": "exercises/41",
    "revision": "d60a431a6df9d3f0a35fbcba4bb10142"
  }, {
    "url": "exercises/42",
    "revision": "b4fe509c0f4560c464d9d2cf1aa2aa13"
  }, {
    "url": "exercises/43",
    "revision": "72b6618810f355fba46b173d12b46d11"
  }, {
    "url": "exercises/44",
    "revision": "5b35071a9f76e026983ee2afde4ead98"
  }, {
    "url": "exercises/45",
    "revision": "51e1f3e6a8a3adf9f0dc7be6b87f87a8"
  }, {
    "url": "exercises/46",
    "revision": "8c9d3dbfc8996626f434be8bfe9a6488"
  }, {
    "url": "exercises/47",
    "revision": "2fca615f46211edacc2667f3b6f5a271"
  }, {
    "url": "exercises/48",
    "revision": "134aa9f6786becbd52de98ee9fbd3735"
  }, {
    "url": "exercises/49",
    "revision": "ee13bab906f4a3e193a56929489dbdc9"
  }, {
    "url": "exercises/5",
    "revision": "f1e7731978b0a6c65eacac7406485d2a"
  }, {
    "url": "exercises/50",
    "revision": "42a67a7cd494cd78cc796eec4f99300f"
  }, {
    "url": "exercises/51",
    "revision": "24cecd0f84b685d3dc2cff5578145a62"
  }, {
    "url": "exercises/52",
    "revision": "3e77c6e963844b7feb2bcfa04a0b6262"
  }, {
    "url": "exercises/53",
    "revision": "384998fc283f38920a563cf597800ec2"
  }, {
    "url": "exercises/54",
    "revision": "8c6d99985aeceac7edf9014393799b39"
  }, {
    "url": "exercises/55",
    "revision": "7c81ec519955e6317b90d0b224f493fb"
  }, {
    "url": "exercises/56",
    "revision": "f55c3f1770020fa1c05772fe6d058fab"
  }, {
    "url": "exercises/57",
    "revision": "66184519b7f664e25d5d6c2416bfac7c"
  }, {
    "url": "exercises/58",
    "revision": "d8e226ca090322c5005f256805e6e5d8"
  }, {
    "url": "exercises/59",
    "revision": "a369caac2b469b907044469bbd329eff"
  }, {
    "url": "exercises/6",
    "revision": "579623fcd07e39a71148615c6a495bef"
  }, {
    "url": "exercises/60",
    "revision": "a0223a1691ed1a1aaa7b661939939963"
  }, {
    "url": "exercises/61",
    "revision": "89a0b000663e85d9e13a710436955a49"
  }, {
    "url": "exercises/62",
    "revision": "8b58880209a22b6509c8320a64465cc0"
  }, {
    "url": "exercises/63",
    "revision": "eb8ef2f56ea4daaa294e86868c761d95"
  }, {
    "url": "exercises/64",
    "revision": "472000c71033178a5af1c12d61ba4c9f"
  }, {
    "url": "exercises/65",
    "revision": "59bd26543597f5993ebfa785b3f383d0"
  }, {
    "url": "exercises/66",
    "revision": "11b637a9774870c481b169d892d5fa03"
  }, {
    "url": "exercises/67",
    "revision": "3b8358cab408f0dd777f32de08b9dea9"
  }, {
    "url": "exercises/68",
    "revision": "1c1dcc215e988a25f312cf57a80e0996"
  }, {
    "url": "exercises/69",
    "revision": "eea0b416892d056650d7aaa8b6f72eb2"
  }, {
    "url": "exercises/7",
    "revision": "ab16c18f6d237d7a4bed0145ccdd8426"
  }, {
    "url": "exercises/70",
    "revision": "3d610232cacc95a615bd4033dbca7b48"
  }, {
    "url": "exercises/71",
    "revision": "fcf4c974affc832edb285b8ecc620b20"
  }, {
    "url": "exercises/72",
    "revision": "bc93fd59c396cd5e2489a7e516b93238"
  }, {
    "url": "exercises/73",
    "revision": "01898b009813e289ea628baf583e2c94"
  }, {
    "url": "exercises/74",
    "revision": "e8ffe43dcb5975d69b7ed3df00e40e4b"
  }, {
    "url": "exercises/75",
    "revision": "5891eeeb048b828ac19226f399fd32cd"
  }, {
    "url": "exercises/76",
    "revision": "5babb7f471f231da7561138b48948a61"
  }, {
    "url": "exercises/77",
    "revision": "9f0b2d9e9ec2f4c61458ef9fb58aa9a0"
  }, {
    "url": "exercises/78",
    "revision": "0e4fa23cff7d6d44124958fa42c4098a"
  }, {
    "url": "exercises/79",
    "revision": "e45640bea9bdfee6e1943578a70b44f5"
  }, {
    "url": "exercises/8",
    "revision": "93b7b58ee6d25ce2545bbeaf9c4ded02"
  }, {
    "url": "exercises/80",
    "revision": "2ad7047487d337bda81792c70d572e43"
  }, {
    "url": "exercises/81",
    "revision": "64dae3ac654a09fa2e3e71fb54414ecd"
  }, {
    "url": "exercises/82",
    "revision": "c496f7a54be7916c0098cd4cb446fb5c"
  }, {
    "url": "exercises/83",
    "revision": "e64663929ef0c15f377a3db311fecf21"
  }, {
    "url": "exercises/84",
    "revision": "88d33694b22280cfb2426aede05802b5"
  }, {
    "url": "exercises/85",
    "revision": "8b69c57551a2966a2c1475f011a0ff83"
  }, {
    "url": "exercises/86",
    "revision": "2e143da03c065e7fd6e0c28633f8e13e"
  }, {
    "url": "exercises/87",
    "revision": "e8e589edff0d11936b113d94fdca78a9"
  }, {
    "url": "exercises/88",
    "revision": "16313779177aabe961b632c510c3d18f"
  }, {
    "url": "exercises/89",
    "revision": "1b95c532e64c1620e0d779cb183be94d"
  }, {
    "url": "exercises/9",
    "revision": "ed599db01f3b526b082feb22b7ee2f36"
  }, {
    "url": "exercises/90",
    "revision": "207e3f99ff069e6fc7e5213f99ddf67f"
  }, {
    "url": "exercises/91",
    "revision": "b8ffc52cad4118a5ea6dcb279d028fcc"
  }, {
    "url": "exercises/92",
    "revision": "58c9a626bac488f1cecfdee24c7ae303"
  }, {
    "url": "exercises/93",
    "revision": "9894e955d46be5cce850d36662c0b51c"
  }, {
    "url": "exercises/94",
    "revision": "eb0424968311bc0ba4bb50e793119d3a"
  }, {
    "url": "exercises/95",
    "revision": "d07c2f73cb7d64cd1e70b2edce8f35da"
  }, {
    "url": "exercises/96",
    "revision": "0327c108e1173f4703b59c69758c4cc6"
  }, {
    "url": "exercises/97",
    "revision": "74027e4a6564bfa36a7ced3f75613583"
  }, {
    "url": "exercises/98",
    "revision": "d82129a262da501c8c56daeb8e8266c1"
  }, {
    "url": "exercises/99",
    "revision": "460a8e851cde85d9792e27b788b46ecc"
  }, {
    "url": "/exercises/",
    "revision": "046960c3dee5917f511571fc7df6c9af"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
