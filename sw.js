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
    "url": "_app/immutable/assets/2.fb239617.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/ReloadPrompt.8b6f04a5.css",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.135f1184.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.4b18e715.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/paths.639421da.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.86db7212.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.0bec87a3.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.ba6fa979.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.a4e9fd9c.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.52498d96.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.9a8798f1.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.4b840a48.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.c27a69a8.js",
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
    "revision": "aeeec729399b5a91c8fba5dc63b1d8fd"
  }, {
    "url": "exercises/10",
    "revision": "6311bbeec59e7b78b92792a6c0b25a34"
  }, {
    "url": "exercises/100",
    "revision": "8b92adaf6c2255b9ee966ab1a173213a"
  }, {
    "url": "exercises/101",
    "revision": "4892b217ba5cef18886645d232c47cbf"
  }, {
    "url": "exercises/102",
    "revision": "24c17e4ae739bd62d2c15fd5c7c5a678"
  }, {
    "url": "exercises/103",
    "revision": "06eef8d358581c729f4eda9297eba5ed"
  }, {
    "url": "exercises/104",
    "revision": "d97f607b1bbfe059f12c0b7a16e41f85"
  }, {
    "url": "exercises/105",
    "revision": "eb9d2fe7568d94b55b5fcb6891a3208b"
  }, {
    "url": "exercises/106",
    "revision": "26f338ef0d4106489f3bc89c40ad1c9b"
  }, {
    "url": "exercises/107",
    "revision": "a86c59e6cdeca838be9bb6cd4efdcd63"
  }, {
    "url": "exercises/108",
    "revision": "e818aa84686edf88236c07f6d750d768"
  }, {
    "url": "exercises/109",
    "revision": "461f164a948c702738e50432ca18bb80"
  }, {
    "url": "exercises/11",
    "revision": "b0fafe158292eec4d1a15bd426b6b94e"
  }, {
    "url": "exercises/110",
    "revision": "e189e9cd755e3a3fc7121825280fa164"
  }, {
    "url": "exercises/111",
    "revision": "b37ed1515bdbe8603d34c4391915a313"
  }, {
    "url": "exercises/112",
    "revision": "76d0252481aef8ed490b6a0dd5c3536d"
  }, {
    "url": "exercises/113",
    "revision": "35049293a4b92f210b67140cc8087d5a"
  }, {
    "url": "exercises/114",
    "revision": "b305aafcb7d93494b077c5c6bca7c054"
  }, {
    "url": "exercises/115",
    "revision": "4521f63df940665bb7b671b9ced93c86"
  }, {
    "url": "exercises/116",
    "revision": "fc7c3a4f466814e93fa04bfb07c69ede"
  }, {
    "url": "exercises/117",
    "revision": "8a0e8b4ad620b29bd58f82f1741841dc"
  }, {
    "url": "exercises/118",
    "revision": "14409061c581c485f43998f123dcb475"
  }, {
    "url": "exercises/119",
    "revision": "98645ea31bc4ef9306f13380cae9badf"
  }, {
    "url": "exercises/12",
    "revision": "0c0d92da3818bb49943ca77eb27ec7fe"
  }, {
    "url": "exercises/120",
    "revision": "37fbe62972e5f2e957ebd22a00f8ea07"
  }, {
    "url": "exercises/121",
    "revision": "1d90cea1f924819cc73854a8725a9ddd"
  }, {
    "url": "exercises/122",
    "revision": "3cde67a3e8b91e10ede780b0e6686ac7"
  }, {
    "url": "exercises/123",
    "revision": "60b40684ea483d5193671a678a56d8e4"
  }, {
    "url": "exercises/124",
    "revision": "5c06e06996976a9a3b855d326b3e152a"
  }, {
    "url": "exercises/125",
    "revision": "d848ba898aae68cf26ed719bd9d52e1c"
  }, {
    "url": "exercises/13",
    "revision": "c99e17a8420ba04fe7c8fc5e444bc9f8"
  }, {
    "url": "exercises/14",
    "revision": "c34f45eb143516684bc4c686fd511260"
  }, {
    "url": "exercises/15",
    "revision": "42de28c8c9850181dc7a14fad7fe11da"
  }, {
    "url": "exercises/16",
    "revision": "d86039c60600a439a1083acdce2f4982"
  }, {
    "url": "exercises/17",
    "revision": "3dfe9f3e3bde1d83a40f65e522abaeda"
  }, {
    "url": "exercises/18",
    "revision": "5227fe3f864d98c4bd43d916a6b1b19e"
  }, {
    "url": "exercises/19",
    "revision": "348a5e65903363e498ad0cf9697fff99"
  }, {
    "url": "exercises/2",
    "revision": "8252714c82aa9541e609300aa6541e6a"
  }, {
    "url": "exercises/20",
    "revision": "0e61804572e0707e30bc44c6dd028b47"
  }, {
    "url": "exercises/21",
    "revision": "a78c91df4e5d2ede1b485df0e0663f77"
  }, {
    "url": "exercises/22",
    "revision": "b27a6ed3fbb76e8de95d1eeea9453758"
  }, {
    "url": "exercises/23",
    "revision": "6fea03455e34b3bb65f14bb73c4163d7"
  }, {
    "url": "exercises/24",
    "revision": "f91061a60e480b13bebb2ae0654f07c4"
  }, {
    "url": "exercises/25",
    "revision": "ca64e4e9b03e3ee046bf6b19f1e6dffe"
  }, {
    "url": "exercises/26",
    "revision": "ac624bf40f722aeb9c0fd2d8ca82d45c"
  }, {
    "url": "exercises/27",
    "revision": "0f1406f354f395da95c5932b449e4d03"
  }, {
    "url": "exercises/28",
    "revision": "3d2d83349f8beb5ffe9da9ccdc7cc037"
  }, {
    "url": "exercises/29",
    "revision": "45f560ec30dbfd4aba90171316ef17ea"
  }, {
    "url": "exercises/3",
    "revision": "ad056a7e42082b44f28f4933a3fadd78"
  }, {
    "url": "exercises/30",
    "revision": "391de212b19972b96ecfc13592c81dff"
  }, {
    "url": "exercises/31",
    "revision": "4cf5ccd742d99619bf59791785780642"
  }, {
    "url": "exercises/32",
    "revision": "0a42be2377cf256102ce846550aed0a2"
  }, {
    "url": "exercises/33",
    "revision": "4559b0ddab24c346b7eecaa10a9519a6"
  }, {
    "url": "exercises/34",
    "revision": "760492745e494e275f1b620ac8937361"
  }, {
    "url": "exercises/35",
    "revision": "7ba9d97b922025ab25f5fe0a06266bde"
  }, {
    "url": "exercises/36",
    "revision": "5c3682908c1f6f895042ddb7e6b33942"
  }, {
    "url": "exercises/37",
    "revision": "7b5ac67212449d1f4d334c2cbec11e81"
  }, {
    "url": "exercises/38",
    "revision": "5c7d80c74478afc616e11407cf01b187"
  }, {
    "url": "exercises/39",
    "revision": "cad3918c180e27623c05a43b526e691e"
  }, {
    "url": "exercises/4",
    "revision": "8a8759a1e408d59145e9b07751e155c2"
  }, {
    "url": "exercises/40",
    "revision": "e2c98e7a7b7222f75f75a18b9f4bdbfd"
  }, {
    "url": "exercises/41",
    "revision": "6cad0049211d5c2cd642ebd2cc70108a"
  }, {
    "url": "exercises/42",
    "revision": "dd04acae53309b4049e664ce9d463a6d"
  }, {
    "url": "exercises/43",
    "revision": "908d8871327b805affac813b0cfacf82"
  }, {
    "url": "exercises/44",
    "revision": "789114c8a018a11e402749d382c18960"
  }, {
    "url": "exercises/45",
    "revision": "59bf870e81b252564b7a7905fe4977a6"
  }, {
    "url": "exercises/46",
    "revision": "379622f5cdcaebcbd8925187b2c49fb6"
  }, {
    "url": "exercises/47",
    "revision": "44aba0f7dff4aa87f2ce5d47cf2e1329"
  }, {
    "url": "exercises/48",
    "revision": "1127bb1676541b1ab985099241970933"
  }, {
    "url": "exercises/49",
    "revision": "c2af298df28f3b93913170a26b69aa4c"
  }, {
    "url": "exercises/5",
    "revision": "04e92a82e0540ba633191adca135e344"
  }, {
    "url": "exercises/50",
    "revision": "e2b3ab6a310e3ee5bf8cc6e374b3a248"
  }, {
    "url": "exercises/51",
    "revision": "d1424024baa457457ee5ebb928cc2724"
  }, {
    "url": "exercises/52",
    "revision": "92f6cde426e00cdc0281c3a9b82e111c"
  }, {
    "url": "exercises/53",
    "revision": "750dd440a72761f6a2d369fd3aecf97c"
  }, {
    "url": "exercises/54",
    "revision": "a286a67eb3d465d23597937f57d29e49"
  }, {
    "url": "exercises/55",
    "revision": "1dec92166a23f4f09bd921874a5b75a6"
  }, {
    "url": "exercises/56",
    "revision": "8e7b97212a9289467985ddb59e800ad0"
  }, {
    "url": "exercises/57",
    "revision": "eff7173cd053eaa0d79676ae330f0a4b"
  }, {
    "url": "exercises/58",
    "revision": "5e551b928341636fe699f35f64ee3410"
  }, {
    "url": "exercises/59",
    "revision": "61c89e9845a27ea5b9f9e1e9cd6715c5"
  }, {
    "url": "exercises/6",
    "revision": "f0ed2b22f0b78d6b0ccce0823b1ff2d6"
  }, {
    "url": "exercises/60",
    "revision": "e0fb3f2bd4608f8d6c7ffa7edbbd78f0"
  }, {
    "url": "exercises/61",
    "revision": "e5f52db3591b32c1214140b81919ac31"
  }, {
    "url": "exercises/62",
    "revision": "bb1221325129857864f3738002964a76"
  }, {
    "url": "exercises/63",
    "revision": "dd4fa835c76b1c2e9a1589439719c69e"
  }, {
    "url": "exercises/64",
    "revision": "bb394a1eee1e1101d4658a1bf8719cf4"
  }, {
    "url": "exercises/65",
    "revision": "2246c38a758c4b4f62200782c7549531"
  }, {
    "url": "exercises/66",
    "revision": "f37f838e2a440e816e4d29e083722973"
  }, {
    "url": "exercises/67",
    "revision": "92953150da7bfa59b456c5e3980c2ac3"
  }, {
    "url": "exercises/68",
    "revision": "49d4d893d4930d8b4e45d90ac56035e6"
  }, {
    "url": "exercises/69",
    "revision": "1cabfce59217c102a7b74a9e9c92e911"
  }, {
    "url": "exercises/7",
    "revision": "cdb6bd806dc6d01f7af3577bbaf9f838"
  }, {
    "url": "exercises/70",
    "revision": "40c7e6846be4601672bb29a5717fae0b"
  }, {
    "url": "exercises/71",
    "revision": "3f635196ec7a56f90a48e4b84a22564c"
  }, {
    "url": "exercises/72",
    "revision": "e2851800c675cda46259e1e66052885b"
  }, {
    "url": "exercises/73",
    "revision": "0c554453abb0942c8d52a0a806f69222"
  }, {
    "url": "exercises/74",
    "revision": "b522194812fcca40381fbe2ef37203f6"
  }, {
    "url": "exercises/75",
    "revision": "010d35622cbd52c2a2672c1fee82d745"
  }, {
    "url": "exercises/76",
    "revision": "14445414155ecfc18f3d33956875de74"
  }, {
    "url": "exercises/77",
    "revision": "21fcf95fffc6e9c2576334ae1536be1b"
  }, {
    "url": "exercises/78",
    "revision": "5f3697b27e4be26c422f1dd94c83d78b"
  }, {
    "url": "exercises/79",
    "revision": "f94c45524ce3baa2f27a42cc093ce723"
  }, {
    "url": "exercises/8",
    "revision": "3c1cf39847cf35b1a8d881f5c3d32f37"
  }, {
    "url": "exercises/80",
    "revision": "248e7dcfa448137b0b8affb9c3ff5d49"
  }, {
    "url": "exercises/81",
    "revision": "4f0fa7737db1a3a9b9715d8839d165d3"
  }, {
    "url": "exercises/82",
    "revision": "06521b932d408c16812b6dce60a3a218"
  }, {
    "url": "exercises/83",
    "revision": "0583e98f0c19c619d7137feeab7e8627"
  }, {
    "url": "exercises/84",
    "revision": "2036007fa08069ab2822d19b3772d59c"
  }, {
    "url": "exercises/85",
    "revision": "a34f067d161426deb477d44d54fcc586"
  }, {
    "url": "exercises/86",
    "revision": "37afb9183562f3ec2c912eb976cf50c5"
  }, {
    "url": "exercises/87",
    "revision": "528d16e75cb8b3fa97e77e34e4802ac5"
  }, {
    "url": "exercises/88",
    "revision": "580887b3de1dd3b30db7a44f3c29a32f"
  }, {
    "url": "exercises/89",
    "revision": "ed8bf846d3cf3a962dafbc1e01aee848"
  }, {
    "url": "exercises/9",
    "revision": "a68f6b153c33664ff5d73c52b9bba312"
  }, {
    "url": "exercises/90",
    "revision": "06335f2aac40d9cdff8b4568b6c45b37"
  }, {
    "url": "exercises/91",
    "revision": "87aa249a967022acde4e64c4f3bd2970"
  }, {
    "url": "exercises/92",
    "revision": "bb346704438637afb2dd03751307f79a"
  }, {
    "url": "exercises/93",
    "revision": "66508234ba2f8ebee43d5f42508ba205"
  }, {
    "url": "exercises/94",
    "revision": "923f55fd69dcd0072f69a69d2831bcd9"
  }, {
    "url": "exercises/95",
    "revision": "42d481df5f595c2134b84742ffff3497"
  }, {
    "url": "exercises/96",
    "revision": "cf1559fe6f6311326e492d948b568dfc"
  }, {
    "url": "exercises/97",
    "revision": "e0698aac80db61d9bbf1e3287324c961"
  }, {
    "url": "exercises/98",
    "revision": "722e2d3b5b7afea024acfc861a2fafd8"
  }, {
    "url": "exercises/99",
    "revision": "f6e489404893aab935bff8f80dfeb263"
  }, {
    "url": "/exercises/",
    "revision": "31b91068b0587d3233d3c2bc3999539b"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
