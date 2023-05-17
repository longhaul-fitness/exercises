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
    "url": "_app/immutable/chunks/index.d68b7c52.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.e9994dec.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/paths.0a3c6ece.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.10edc490.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.da328dd8.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.faf123e2.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.120499dc.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.d2d9f0e3.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.58b80866.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.a0dcb778.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.e03cd200.js",
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
    "revision": "53edf2e13028d8ce36cd570a00e9f904"
  }, {
    "url": "exercises/10",
    "revision": "27e9cb3d6044c5f6e55f69c4e3745290"
  }, {
    "url": "exercises/100",
    "revision": "665347a0f48269f1d872a1ea098e71a5"
  }, {
    "url": "exercises/101",
    "revision": "d6d65fef42d366715c89289dafd180e2"
  }, {
    "url": "exercises/102",
    "revision": "3f96db2fcc4b6a263c3948d157c1432b"
  }, {
    "url": "exercises/103",
    "revision": "1e8f6727f7c7bc827311ff0fc92564c1"
  }, {
    "url": "exercises/104",
    "revision": "afa789330d39c369873c459ce78fce4f"
  }, {
    "url": "exercises/105",
    "revision": "7d6d3bb5b2949d8f1857c08defd998c6"
  }, {
    "url": "exercises/106",
    "revision": "7b2f5d435ef95d39c89dd6f988f5b8b7"
  }, {
    "url": "exercises/107",
    "revision": "8076f889fc4d0f629d28605bc9eddf83"
  }, {
    "url": "exercises/108",
    "revision": "c033dec0e5ad1293abea80d1e7e6e08c"
  }, {
    "url": "exercises/109",
    "revision": "773443ae21559140cca0e6f58468fc42"
  }, {
    "url": "exercises/11",
    "revision": "0abe36ae2aa1e3dc7c29d4c62aee579b"
  }, {
    "url": "exercises/110",
    "revision": "335aaf0d90ccb6a058c622e0e2723105"
  }, {
    "url": "exercises/111",
    "revision": "b3c59c6658cc1275ca4d9333628ef8a4"
  }, {
    "url": "exercises/112",
    "revision": "a1d3e09fdbf2abc6236d6b0de45187c9"
  }, {
    "url": "exercises/113",
    "revision": "b3b800b420616b5e78a249c322b0b8d4"
  }, {
    "url": "exercises/114",
    "revision": "08345ff455852b2f36ac7682af50a885"
  }, {
    "url": "exercises/115",
    "revision": "c425eba67104d9cac53e6ce897f506f6"
  }, {
    "url": "exercises/116",
    "revision": "cc484f651b35eda6e7d258d7270d83fe"
  }, {
    "url": "exercises/117",
    "revision": "d40f2499812b4fc3c5d3059b71474995"
  }, {
    "url": "exercises/118",
    "revision": "72f1aea9f237bfef55ce836efdaf555c"
  }, {
    "url": "exercises/119",
    "revision": "f9b9b6ee24947648be604350f246c573"
  }, {
    "url": "exercises/12",
    "revision": "4d9af2708450f01a39c1a0e9eb077356"
  }, {
    "url": "exercises/120",
    "revision": "c92d15a70121534ba14333f64459dd3e"
  }, {
    "url": "exercises/121",
    "revision": "84da39cd2665c91e31a58eb5fe8403ff"
  }, {
    "url": "exercises/122",
    "revision": "51756191c0761b8106aa282e453a6bdf"
  }, {
    "url": "exercises/123",
    "revision": "8e0840920149de98f4afb17443a27f96"
  }, {
    "url": "exercises/124",
    "revision": "e45bc36f9d760f3eefc89a267aef3a64"
  }, {
    "url": "exercises/125",
    "revision": "6f6fb7bb392aca602affef50eabcf96b"
  }, {
    "url": "exercises/13",
    "revision": "cfe520afe4517cc67a1163b45fea502d"
  }, {
    "url": "exercises/14",
    "revision": "a9ad7897c9a27d14ebfe720f6bca4d08"
  }, {
    "url": "exercises/15",
    "revision": "4d5eff39ddfd0084b25211b0f91a448b"
  }, {
    "url": "exercises/16",
    "revision": "232d96b20fcc343abfe74af50d0961e6"
  }, {
    "url": "exercises/17",
    "revision": "283276f0c56b4af2cb779aed89196e18"
  }, {
    "url": "exercises/18",
    "revision": "e07fedc6ac4d7a22a9bc7a869e864952"
  }, {
    "url": "exercises/19",
    "revision": "a0471d1d81ba65db14e482c042a1c024"
  }, {
    "url": "exercises/2",
    "revision": "27e921116470483bf4ceb9d32b39ce90"
  }, {
    "url": "exercises/20",
    "revision": "29d16fccfbc954c4adb27bca51cc421a"
  }, {
    "url": "exercises/21",
    "revision": "044eeb8e029847d43df34474aca8ccf3"
  }, {
    "url": "exercises/22",
    "revision": "349912bfa3181bd65f7ffaeb9cca7cfc"
  }, {
    "url": "exercises/23",
    "revision": "1bf3978260923700ef70d9a2f9d898bf"
  }, {
    "url": "exercises/24",
    "revision": "b744a57fe8ea4a2e36ae71fa53e58ef6"
  }, {
    "url": "exercises/25",
    "revision": "2decea88dff9f04cbc57518b42b65c90"
  }, {
    "url": "exercises/26",
    "revision": "a86635753f5157e92cd42ee401a3f898"
  }, {
    "url": "exercises/27",
    "revision": "e1ca0a01db73d64e6971ddc7a2f6afc0"
  }, {
    "url": "exercises/28",
    "revision": "661637d71e69087a3c3958d83ae24c25"
  }, {
    "url": "exercises/29",
    "revision": "b12caf719115fc82ce4f85db9b9442b9"
  }, {
    "url": "exercises/3",
    "revision": "e31f569b382bc021a39cc987e51bbfc2"
  }, {
    "url": "exercises/30",
    "revision": "daef9c9a349142d2d3ff947db6732070"
  }, {
    "url": "exercises/31",
    "revision": "0151b34dd4a2dd944741c193b3a598bb"
  }, {
    "url": "exercises/32",
    "revision": "7f5f3c2f30c7c112411514a123b65a1c"
  }, {
    "url": "exercises/33",
    "revision": "ba17ff92005f63b477c11b1157ba09e1"
  }, {
    "url": "exercises/34",
    "revision": "04f0075df2a1c3d2c6106c346b5a9667"
  }, {
    "url": "exercises/35",
    "revision": "47a595ed7fdbc138e41635c2e4bf3c19"
  }, {
    "url": "exercises/36",
    "revision": "6dc767a002f46f57038b7c6f1f32377a"
  }, {
    "url": "exercises/37",
    "revision": "9f115d6c6a5fdc99ad609ba633f6f071"
  }, {
    "url": "exercises/38",
    "revision": "bfd8993a6a50486770fc8be19257d5f4"
  }, {
    "url": "exercises/39",
    "revision": "d0f3623224360863ee4f77cf80271dc3"
  }, {
    "url": "exercises/4",
    "revision": "58344dd476592a8668731df4fada3f38"
  }, {
    "url": "exercises/40",
    "revision": "ee2d7fd9d6269c181586854c2a0ef35e"
  }, {
    "url": "exercises/41",
    "revision": "e399db1d92d4df82224f9376c4c60471"
  }, {
    "url": "exercises/42",
    "revision": "ce3596b259fa9c65c0ad0d1a6ac12afd"
  }, {
    "url": "exercises/43",
    "revision": "c2a825d487ff8d897bb0c8ac74883b43"
  }, {
    "url": "exercises/44",
    "revision": "45a52041e821e548f54103d1356d56dc"
  }, {
    "url": "exercises/45",
    "revision": "770ddf40d840f6c282c9bfb8056eca4a"
  }, {
    "url": "exercises/46",
    "revision": "e98e5655d4238a0b8c752dc9e5384b28"
  }, {
    "url": "exercises/47",
    "revision": "8b5810b8b33ab01200f07e876b92731b"
  }, {
    "url": "exercises/48",
    "revision": "2f08cbebe67a619e20f6c1fd4471d5f3"
  }, {
    "url": "exercises/49",
    "revision": "ad6a8db5f071ecc67a7322c4b09fcb7c"
  }, {
    "url": "exercises/5",
    "revision": "016defddd620d6fada1d855396382106"
  }, {
    "url": "exercises/50",
    "revision": "5298a494af19bf47208ec97c335fbcf1"
  }, {
    "url": "exercises/51",
    "revision": "a3ef452663e70575fc1b4714512bae40"
  }, {
    "url": "exercises/52",
    "revision": "92f2f28b3e25086e2c627de8a4ffa031"
  }, {
    "url": "exercises/53",
    "revision": "196d0fa899c078f540fbaa7057a1c8a5"
  }, {
    "url": "exercises/54",
    "revision": "27761c4b21216100fe1e9e545525c2e4"
  }, {
    "url": "exercises/55",
    "revision": "3df9ada1f3658648560770f64864c6c7"
  }, {
    "url": "exercises/56",
    "revision": "3714c289f96e136c6cf5c174cbd4bf0e"
  }, {
    "url": "exercises/57",
    "revision": "b4b9fe8df17329a126f8480897c18b21"
  }, {
    "url": "exercises/58",
    "revision": "472c5e18d71f5beb62ca0af3edbe0b8b"
  }, {
    "url": "exercises/59",
    "revision": "a82d88cf0c4eebe0b9a0ef691a357e42"
  }, {
    "url": "exercises/6",
    "revision": "ec113c1ad4eb88e96eda7da9e2c084f8"
  }, {
    "url": "exercises/60",
    "revision": "adec331ec69128461f108a7bb2eb5ece"
  }, {
    "url": "exercises/61",
    "revision": "683e77a2c45afcb382cbb47956574908"
  }, {
    "url": "exercises/62",
    "revision": "46968c06b4446a23215e710585127b0b"
  }, {
    "url": "exercises/63",
    "revision": "a283d231c6721ceb91db087eccba34d9"
  }, {
    "url": "exercises/64",
    "revision": "e4f8b711dd17e24ee54c0afaf0bd3b3d"
  }, {
    "url": "exercises/65",
    "revision": "b88c4999241b7398cc2f038effd4c05f"
  }, {
    "url": "exercises/66",
    "revision": "11f13c87ae39d22189d5addbe88dacde"
  }, {
    "url": "exercises/67",
    "revision": "b1504947c61e6e7348adfd74e92b9d28"
  }, {
    "url": "exercises/68",
    "revision": "51b277c1dab05570da8f9814e12c393d"
  }, {
    "url": "exercises/69",
    "revision": "0433497ffc7e6da04c8fba107898c5f3"
  }, {
    "url": "exercises/7",
    "revision": "1bdda8f54e616e66e2982fe2d8ab084c"
  }, {
    "url": "exercises/70",
    "revision": "f7c6d9f84c795ba2357d206ab4b25f0a"
  }, {
    "url": "exercises/71",
    "revision": "941ecc5fa3a5dca34faa72e30908b239"
  }, {
    "url": "exercises/72",
    "revision": "8d1da203875d62d3e46216fc7682c7f9"
  }, {
    "url": "exercises/73",
    "revision": "f2eddd93ab30c571866c4eb4f5cec20f"
  }, {
    "url": "exercises/74",
    "revision": "242cdab6b862478688fc9b9512c25da9"
  }, {
    "url": "exercises/75",
    "revision": "79e7fdf049664c5cd341c31d1c3520e2"
  }, {
    "url": "exercises/76",
    "revision": "98d51e764fd8dd31107cd51c454ab2c7"
  }, {
    "url": "exercises/77",
    "revision": "933d47b4ebdb64860d0b787541277ee2"
  }, {
    "url": "exercises/78",
    "revision": "ec342e15103aa526c9824c0a3baca476"
  }, {
    "url": "exercises/79",
    "revision": "d4d01af63d87d969a30a233846ae0b4a"
  }, {
    "url": "exercises/8",
    "revision": "7256d2a1657fd07cf8909cba920f7b17"
  }, {
    "url": "exercises/80",
    "revision": "89228ac2609ac98f933641dca77308ad"
  }, {
    "url": "exercises/81",
    "revision": "c32c47cb00cb4eca62e5738e0f4b1c4c"
  }, {
    "url": "exercises/82",
    "revision": "17dbf5bf220e61808a938077b8120cf1"
  }, {
    "url": "exercises/83",
    "revision": "fbd0154cc83e68b9659d5f94576ffa53"
  }, {
    "url": "exercises/84",
    "revision": "1777450e969ad255b40940e9da20cef3"
  }, {
    "url": "exercises/85",
    "revision": "82fe45e15b3ee1ec56024db3d404511f"
  }, {
    "url": "exercises/86",
    "revision": "9ae9e7966c4607555fe7f2347f9f9612"
  }, {
    "url": "exercises/87",
    "revision": "52d6f4752dad1321b65ea74f55a712d3"
  }, {
    "url": "exercises/88",
    "revision": "6f85e00c32f17d14794be409cc4eb478"
  }, {
    "url": "exercises/89",
    "revision": "04c798fb2132391563d4e61d8e507fa5"
  }, {
    "url": "exercises/9",
    "revision": "3c6ac3f84c5b5d9f6052c55bf443cb59"
  }, {
    "url": "exercises/90",
    "revision": "e4a5522f6ce23e2b226589c3a05aea2a"
  }, {
    "url": "exercises/91",
    "revision": "07aac3cbe7c44e7470b2ea072309b6eb"
  }, {
    "url": "exercises/92",
    "revision": "b15259ad7556a654fa146b10f2177580"
  }, {
    "url": "exercises/93",
    "revision": "7c19b7c09a23bad5d27e7e5849b8516d"
  }, {
    "url": "exercises/94",
    "revision": "3b80768ae707c0b95c5cc79f5beb1964"
  }, {
    "url": "exercises/95",
    "revision": "5d033b9c97e7dead2d06b32d08880bba"
  }, {
    "url": "exercises/96",
    "revision": "35955ada1c617193ddce657fd04cee8a"
  }, {
    "url": "exercises/97",
    "revision": "107840f601b1fb4743ac8da9a36cc901"
  }, {
    "url": "exercises/98",
    "revision": "67ec28b2cabe61cc8b359c5cfc7077d3"
  }, {
    "url": "exercises/99",
    "revision": "81ff40ebcbdd2ad8af7110ccaf00918f"
  }, {
    "url": "/exercises/",
    "revision": "bcfe49fd1b547c0cd49a4e1f12475bdf"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
