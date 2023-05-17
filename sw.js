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
    "url": "_app/immutable/chunks/paths.eaed488e.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.51eca629.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.4b17c97e.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.c4b3f50a.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.df3e6ce4.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.b16efeb6.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.d2d3d977.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.41115f96.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.ae9e87f2.js",
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
    "revision": "74b6bbbc3c76ddf62601df2ac30359ef"
  }, {
    "url": "exercises/10",
    "revision": "ca5990c319d7f0836fecd0e68c0b441a"
  }, {
    "url": "exercises/100",
    "revision": "0855eb3ef8e5d9ddc1119a240a243d2c"
  }, {
    "url": "exercises/101",
    "revision": "5311c7f9c68f7f1944024547c0b331de"
  }, {
    "url": "exercises/102",
    "revision": "a778a6400f0ad5bc4cc3e321e31e9ef8"
  }, {
    "url": "exercises/103",
    "revision": "b470b968fa4deaf2101132a417a032f9"
  }, {
    "url": "exercises/104",
    "revision": "1b8cf51b3f5b5ac1d2896907c166f7e0"
  }, {
    "url": "exercises/105",
    "revision": "c5839ab2e6dfb97f9ec2c8eaa849037c"
  }, {
    "url": "exercises/106",
    "revision": "c519e0731a20844ba0c860702cb5596b"
  }, {
    "url": "exercises/107",
    "revision": "f720630a016e327a6ae9abada6b0bf07"
  }, {
    "url": "exercises/108",
    "revision": "f4b6247141e444bda546b35001f6a46f"
  }, {
    "url": "exercises/109",
    "revision": "24dd3ede79d01024b5119bf2f9f53c31"
  }, {
    "url": "exercises/11",
    "revision": "9a25d94866c99ec306dcb332b1c73c29"
  }, {
    "url": "exercises/110",
    "revision": "3b437e360f15e49ff9337bd8efa015db"
  }, {
    "url": "exercises/111",
    "revision": "bf6464be2ad67a4c8847a3f821887a60"
  }, {
    "url": "exercises/112",
    "revision": "5a27a20f6cdbf3537a6588d815e58343"
  }, {
    "url": "exercises/113",
    "revision": "a40dbef2ce3e2e016fe8e59a889b8267"
  }, {
    "url": "exercises/114",
    "revision": "6e3daa93b417dad3d00c36db89a76cdc"
  }, {
    "url": "exercises/115",
    "revision": "c6caf954a056a183c82206d9b9637bb2"
  }, {
    "url": "exercises/116",
    "revision": "d969f33257e30e81aee390df8f0a58b8"
  }, {
    "url": "exercises/117",
    "revision": "6c2a9446a70d468d6608f1beef07868e"
  }, {
    "url": "exercises/118",
    "revision": "8ad3ee8640c54e2b8353a2edf2c17b4f"
  }, {
    "url": "exercises/119",
    "revision": "08cb3a8d3e78c9572cf9bd75b7cce365"
  }, {
    "url": "exercises/12",
    "revision": "4e3f2613138d49616e361756dfa779ee"
  }, {
    "url": "exercises/120",
    "revision": "7ad71f69d9072479455881fbd08812ab"
  }, {
    "url": "exercises/121",
    "revision": "5946f5b15b36be87485439f7428bdc22"
  }, {
    "url": "exercises/122",
    "revision": "52af05b121f026d6460aeab28d10d06d"
  }, {
    "url": "exercises/123",
    "revision": "3579ff4d57ceda8651ce2245be63681c"
  }, {
    "url": "exercises/124",
    "revision": "be6dd76766687088114de3f86d8b6fe4"
  }, {
    "url": "exercises/125",
    "revision": "4b81d8390c44373db0d2ba5ace305a7a"
  }, {
    "url": "exercises/13",
    "revision": "f49c92b2ce2e4e34b5a0112deb03e370"
  }, {
    "url": "exercises/14",
    "revision": "ad8d2c2871b3cafb7b0bfd20b6d20489"
  }, {
    "url": "exercises/15",
    "revision": "22e580bd76b8ccc46a01e1422f82b133"
  }, {
    "url": "exercises/16",
    "revision": "1a60bc3648c2ef55b486c09eb37d90f7"
  }, {
    "url": "exercises/17",
    "revision": "c7773eac06e85ab6d8e4b9c657e21f12"
  }, {
    "url": "exercises/18",
    "revision": "d850856e1fdb6fedfaa040f271fc6541"
  }, {
    "url": "exercises/19",
    "revision": "df52e2f1240446f368e808ca796e092b"
  }, {
    "url": "exercises/2",
    "revision": "1000c6b47f3bec061f730b273ca52e29"
  }, {
    "url": "exercises/20",
    "revision": "7cbbd7034ee20739543c61ad0aa556ad"
  }, {
    "url": "exercises/21",
    "revision": "7aa0126e0b56ae2f982ac25736a15f61"
  }, {
    "url": "exercises/22",
    "revision": "1d84d491dc80133ca3a2949b2d76a262"
  }, {
    "url": "exercises/23",
    "revision": "dc499ec0e67bd7d7f96b23f39c4ebd00"
  }, {
    "url": "exercises/24",
    "revision": "d34a61bd194e0f180aa1aca369a82f05"
  }, {
    "url": "exercises/25",
    "revision": "5b130b371b62368a4a83d3b26daee746"
  }, {
    "url": "exercises/26",
    "revision": "2e55e6e5b784db28add9eee8657b52f0"
  }, {
    "url": "exercises/27",
    "revision": "5d3fadb535dc13be6b68270f903167e8"
  }, {
    "url": "exercises/28",
    "revision": "274b3d413f9e92281eb7e0e8ce386c84"
  }, {
    "url": "exercises/29",
    "revision": "6a8ecb9ae6bb1e2eb5801bb7139880e3"
  }, {
    "url": "exercises/3",
    "revision": "ccb86812e907f4b106068f4f162c8a9f"
  }, {
    "url": "exercises/30",
    "revision": "235248a362ec4304434446476cfb89fa"
  }, {
    "url": "exercises/31",
    "revision": "63d9b949a33166c73088e82ec19a378d"
  }, {
    "url": "exercises/32",
    "revision": "13701b46dd7ebd7c7028ccdb923ae087"
  }, {
    "url": "exercises/33",
    "revision": "54e36cec2d8b3e9753d5383eeebbcb46"
  }, {
    "url": "exercises/34",
    "revision": "d795b4580b448644177c4a49210066b9"
  }, {
    "url": "exercises/35",
    "revision": "9db0c7d324b43a90d803fdb789094a0e"
  }, {
    "url": "exercises/36",
    "revision": "622fd839659ac713af67aa7677eb4b5b"
  }, {
    "url": "exercises/37",
    "revision": "dc9fa21f2eddaa0c05152d2c97e5c312"
  }, {
    "url": "exercises/38",
    "revision": "8639bbfe444fde6d2675882269a54f5c"
  }, {
    "url": "exercises/39",
    "revision": "60f40e0028997a013a3eeef230ccbf2a"
  }, {
    "url": "exercises/4",
    "revision": "f22acdbe5424babcde39369ff46929d1"
  }, {
    "url": "exercises/40",
    "revision": "8cc1370186513ec1f682068da183503f"
  }, {
    "url": "exercises/41",
    "revision": "614e7d8f12699c320ffd2e52ee682809"
  }, {
    "url": "exercises/42",
    "revision": "dd2c9a81d8e1bf022a1aa56735377f9a"
  }, {
    "url": "exercises/43",
    "revision": "30ddb9328cf652cef851116d467ca983"
  }, {
    "url": "exercises/44",
    "revision": "544860b4efe65be2d7121cfbec998452"
  }, {
    "url": "exercises/45",
    "revision": "435d2e91e21f01a25096baa53cda7fc2"
  }, {
    "url": "exercises/46",
    "revision": "d7c407aeaf6f9b0f19a645d8bc1046eb"
  }, {
    "url": "exercises/47",
    "revision": "62312c764aad7ab668589c9b7fef47aa"
  }, {
    "url": "exercises/48",
    "revision": "320a5799473f7c077c5d879ff29319a6"
  }, {
    "url": "exercises/49",
    "revision": "bb823421ec2cc3afbe78039770c3b2dd"
  }, {
    "url": "exercises/5",
    "revision": "a6aacb955e74bb5741ea547dad95ae10"
  }, {
    "url": "exercises/50",
    "revision": "0e041b0a1e89a28c473108f8177e0498"
  }, {
    "url": "exercises/51",
    "revision": "0db157bb01edfd7f1d7e5bff65574255"
  }, {
    "url": "exercises/52",
    "revision": "a60e0561688bfc011981e2b786bbead0"
  }, {
    "url": "exercises/53",
    "revision": "26428d773057c71e6d76515618a7a15b"
  }, {
    "url": "exercises/54",
    "revision": "dec4f4821297e87330f4afc60d4d2582"
  }, {
    "url": "exercises/55",
    "revision": "8f38b83c7c285b4d5006e2f616869bdb"
  }, {
    "url": "exercises/56",
    "revision": "ed23cee47c44e84291759f637b87a69a"
  }, {
    "url": "exercises/57",
    "revision": "9f8e2ffd52b39ba7fb2053b981e785e8"
  }, {
    "url": "exercises/58",
    "revision": "08ea69b0787e9540cb027bc4cdda21d5"
  }, {
    "url": "exercises/59",
    "revision": "d99b925b457f3f32c5e494092c4761d7"
  }, {
    "url": "exercises/6",
    "revision": "f2c97dbb963d5e45dc85d00eb1f0fa0b"
  }, {
    "url": "exercises/60",
    "revision": "c9ae8f8b1777f6183c35c84a02707204"
  }, {
    "url": "exercises/61",
    "revision": "9ebbadd91f6b179e2fdcae80ff4ca172"
  }, {
    "url": "exercises/62",
    "revision": "287f83c742d636ea9f0f48313ade3631"
  }, {
    "url": "exercises/63",
    "revision": "a7f968e5312248b88bc59eb32b831c81"
  }, {
    "url": "exercises/64",
    "revision": "1621ca186646b4910bfb4d330c265b20"
  }, {
    "url": "exercises/65",
    "revision": "22b0ef3bee0700769bd3f5c413098fa5"
  }, {
    "url": "exercises/66",
    "revision": "bd3c58f87a3145831f33d08d39983e33"
  }, {
    "url": "exercises/67",
    "revision": "f3135aed0aab230dc535057325e58ee6"
  }, {
    "url": "exercises/68",
    "revision": "1ac34e48452a2f3952e1d71f087b1548"
  }, {
    "url": "exercises/69",
    "revision": "036afeb03617ab8b10bf076f761455ec"
  }, {
    "url": "exercises/7",
    "revision": "c6bcbdabe4a7965b2ba12ae72bed8d35"
  }, {
    "url": "exercises/70",
    "revision": "72b2aee1433a97c4b60a0c8c393e1e6d"
  }, {
    "url": "exercises/71",
    "revision": "e830c693a5422ebb6629e16950cf8ecb"
  }, {
    "url": "exercises/72",
    "revision": "86fa59d6e0c5d357b90d4445f13d59b2"
  }, {
    "url": "exercises/73",
    "revision": "b046b05d5c00ba7b225d12d426b2ec43"
  }, {
    "url": "exercises/74",
    "revision": "ecb0a5333401b1f839d980d512f941d0"
  }, {
    "url": "exercises/75",
    "revision": "78a9da12aaadf07c841414fd3266f5dd"
  }, {
    "url": "exercises/76",
    "revision": "bd1ed587f2ff4a549f163ed09e84bee5"
  }, {
    "url": "exercises/77",
    "revision": "af2c940bc0f9214681e50df6da421647"
  }, {
    "url": "exercises/78",
    "revision": "069afbf585fc02b73b3a54fba954d35e"
  }, {
    "url": "exercises/79",
    "revision": "52edfe1d52196e20bc56de1532716b20"
  }, {
    "url": "exercises/8",
    "revision": "f5f8abcee075ce485cc5913db85fcc1a"
  }, {
    "url": "exercises/80",
    "revision": "5f3e70f7ec77a1b8c375ed314e4e54f4"
  }, {
    "url": "exercises/81",
    "revision": "13f2832aa6dea226d0c257a1290b7226"
  }, {
    "url": "exercises/82",
    "revision": "e528ddba099929d5eeffac71ee11a664"
  }, {
    "url": "exercises/83",
    "revision": "2e5837fab46a270660b7d6bf64c7a566"
  }, {
    "url": "exercises/84",
    "revision": "d822d91b372479b9803afa91d5779d85"
  }, {
    "url": "exercises/85",
    "revision": "cfc8045af10329fa90941f26413d2316"
  }, {
    "url": "exercises/86",
    "revision": "1d4de839d75bef1cbe9b14faa5860b28"
  }, {
    "url": "exercises/87",
    "revision": "55106768ecbff2400c47e1bbcd630639"
  }, {
    "url": "exercises/88",
    "revision": "e2392db80740cc8beaf838b407bb96d1"
  }, {
    "url": "exercises/89",
    "revision": "07720a693b22caa59c334f4a34d23f30"
  }, {
    "url": "exercises/9",
    "revision": "98100012cfdc117a7981f1145ee49e3c"
  }, {
    "url": "exercises/90",
    "revision": "e438e3c26e218732d695d205c7560593"
  }, {
    "url": "exercises/91",
    "revision": "60938c6911cabf0adb53587a92547ea7"
  }, {
    "url": "exercises/92",
    "revision": "d2c429bf6eabf4de11b9131b4cb2db7f"
  }, {
    "url": "exercises/93",
    "revision": "86a966b4e8f60cb02f2700f44945c92d"
  }, {
    "url": "exercises/94",
    "revision": "7e69fed463c1764b93ebe4927e6b4f73"
  }, {
    "url": "exercises/95",
    "revision": "8a7142c4e4f3621ec14a44450e58015a"
  }, {
    "url": "exercises/96",
    "revision": "f8041628ab9f3ad6c489d12293e73959"
  }, {
    "url": "exercises/97",
    "revision": "5fca21f880bbb4b081637f2ab2c8fd37"
  }, {
    "url": "exercises/98",
    "revision": "4ce9cfff0cbb7e3a6644ba27ace96d54"
  }, {
    "url": "exercises/99",
    "revision": "c240560ccacca17394e21f1a2e21c4b8"
  }, {
    "url": "/exercises/",
    "revision": "e81479275b8603bd94a29769e7175e03"
  }, {
    "url": "manifest.webmanifest",
    "revision": "eed4c1c6b9a0ea833b1e41e7c0642bca"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
