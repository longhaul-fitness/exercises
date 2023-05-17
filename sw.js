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
    "url": "_app/immutable/chunks/paths.4f509d29.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.f0d8996e.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.1257851e.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.6bce43a6.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.8a02e2f2.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.f54e9f39.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.41fbc68f.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.6290e7b5.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.e8ff35a2.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.643a9d88.js",
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
    "revision": "5dc53508d1bf03b7c90d8fafa57b13b9"
  }, {
    "url": "exercises/10",
    "revision": "677a2d84308249903c50b413e63ea448"
  }, {
    "url": "exercises/100",
    "revision": "354a2a750eb88bc34ffdeed9d35941f5"
  }, {
    "url": "exercises/101",
    "revision": "ddf4c316c4f93693021289c81386516f"
  }, {
    "url": "exercises/102",
    "revision": "163e343ebe56cb7e02705be5351ef2af"
  }, {
    "url": "exercises/103",
    "revision": "ec2440950e66426aab998dc45afa47b3"
  }, {
    "url": "exercises/104",
    "revision": "69725627b78233c41ed019519d8f470d"
  }, {
    "url": "exercises/105",
    "revision": "9df6054a9d8d7ccdbe0877e01ca5a4af"
  }, {
    "url": "exercises/106",
    "revision": "0660f30d47dd8e60efe979248c42e6f0"
  }, {
    "url": "exercises/107",
    "revision": "106c44c6cd8beeb90d4adf59d28c213f"
  }, {
    "url": "exercises/108",
    "revision": "b7cf9a2d7eb24c94083660a7b571d3b8"
  }, {
    "url": "exercises/109",
    "revision": "6ec1d04c048654d7f85d12f482b2c4c1"
  }, {
    "url": "exercises/11",
    "revision": "d26ab607e5131b30d3986dca4d81d89e"
  }, {
    "url": "exercises/110",
    "revision": "67344f1ab9805b993f6ac7d3d0430cff"
  }, {
    "url": "exercises/111",
    "revision": "e7cbb16885752c0ff5d6a0d8bcb29915"
  }, {
    "url": "exercises/112",
    "revision": "690ad47e6b7c4cefeccd28db657301f8"
  }, {
    "url": "exercises/113",
    "revision": "0003c2481f5a769b6bd037986c2ee4b8"
  }, {
    "url": "exercises/114",
    "revision": "6c92aea56f532d7f4176b6bd96263a82"
  }, {
    "url": "exercises/115",
    "revision": "09003cc37cd89f14b78f59a77604cdc7"
  }, {
    "url": "exercises/116",
    "revision": "e8248aaa950867ac0dd2c912a283e5b1"
  }, {
    "url": "exercises/117",
    "revision": "155eabc3e3dd45e39fe274a575808b88"
  }, {
    "url": "exercises/118",
    "revision": "950c01d9a42d7a6a5c0b643d233c13b7"
  }, {
    "url": "exercises/119",
    "revision": "8a3152c71f5f7324770311db184c402f"
  }, {
    "url": "exercises/12",
    "revision": "2fa829357fac90a4cbac6bdd6172ad73"
  }, {
    "url": "exercises/120",
    "revision": "3009389389c28dd44d13756cfdb23520"
  }, {
    "url": "exercises/121",
    "revision": "867a042e32badbc43ff23d2ba9e57e80"
  }, {
    "url": "exercises/122",
    "revision": "8addfbd806be531ecd31c3aeabe9aaf2"
  }, {
    "url": "exercises/123",
    "revision": "0f3276e367594a86a5989401b16e2060"
  }, {
    "url": "exercises/124",
    "revision": "d7cba3675c52a272b146ea02fb5552c7"
  }, {
    "url": "exercises/125",
    "revision": "e8249ff1d1745513c29fd6663a6fc512"
  }, {
    "url": "exercises/13",
    "revision": "8c0e5d25177faa1e29c76ad5fccc628c"
  }, {
    "url": "exercises/14",
    "revision": "1bccca6b1291c175f1114d3b961ce12b"
  }, {
    "url": "exercises/15",
    "revision": "1c344ae323c5a0b1a4dcb1e92ce698a9"
  }, {
    "url": "exercises/16",
    "revision": "107073f57e1777613d1b05e98e4c876c"
  }, {
    "url": "exercises/17",
    "revision": "4d8a639ac1d0a9f5defb7fd0a78bece6"
  }, {
    "url": "exercises/18",
    "revision": "97f3f60238f6011077d98cb5a9377c86"
  }, {
    "url": "exercises/19",
    "revision": "6c0bcba687041d43a78b912d40058e97"
  }, {
    "url": "exercises/2",
    "revision": "85fd35aac9c5b1888202396d926faf76"
  }, {
    "url": "exercises/20",
    "revision": "6657949b0a051988b17716d53a685c1e"
  }, {
    "url": "exercises/21",
    "revision": "48fee03db60b64f4b7dae9857e6dd6aa"
  }, {
    "url": "exercises/22",
    "revision": "95e17fe25136e780473832b121a542e0"
  }, {
    "url": "exercises/23",
    "revision": "d1059c930fc06b3b79cd233580f6dbc8"
  }, {
    "url": "exercises/24",
    "revision": "07d7d827d944ce704d7335d5af58a46e"
  }, {
    "url": "exercises/25",
    "revision": "7586d225c3e79291afdd35140eb2f4ae"
  }, {
    "url": "exercises/26",
    "revision": "c64ae24f4971c2102fe96b1d857c6068"
  }, {
    "url": "exercises/27",
    "revision": "69738cf831397e759881c8c739dd699c"
  }, {
    "url": "exercises/28",
    "revision": "545fbe28ad6a6d1e6a0385204a4008ac"
  }, {
    "url": "exercises/29",
    "revision": "b79703d0f115615d010c35ad4dc0dd8d"
  }, {
    "url": "exercises/3",
    "revision": "19e80aa0befb6dca332a009dca5655cf"
  }, {
    "url": "exercises/30",
    "revision": "95d1834219bec50b04dc01846fad4d31"
  }, {
    "url": "exercises/31",
    "revision": "6b5bbb99768b8fcfd5955e2e255605a0"
  }, {
    "url": "exercises/32",
    "revision": "01099247c9f5fe9ef6c62b7eaef7fefe"
  }, {
    "url": "exercises/33",
    "revision": "ce0b411bc0283aed5f5f0f76c2bbabe9"
  }, {
    "url": "exercises/34",
    "revision": "c697bc5dd886794ad9df9248d8c324d2"
  }, {
    "url": "exercises/35",
    "revision": "abdb69c4552ce1fe7c59882fd5698a40"
  }, {
    "url": "exercises/36",
    "revision": "581a95a4b6b55994408a4491104f15e2"
  }, {
    "url": "exercises/37",
    "revision": "ceda30410a1548e89a5874b07e64c434"
  }, {
    "url": "exercises/38",
    "revision": "1646d2854e40e0a5ec3628f92d30a287"
  }, {
    "url": "exercises/39",
    "revision": "c850bff558e38aa885e730fd0759b296"
  }, {
    "url": "exercises/4",
    "revision": "fc94ef2bedbfb0c6552905c998ba8b9c"
  }, {
    "url": "exercises/40",
    "revision": "19d22e882f61191ea30b2cfab6ccb924"
  }, {
    "url": "exercises/41",
    "revision": "f7b00d99a9927b349d2dac843892be84"
  }, {
    "url": "exercises/42",
    "revision": "0075d64294a4364d1996a1d75e54f7e9"
  }, {
    "url": "exercises/43",
    "revision": "9d3c23f9d6aeb0595ca2f5a3af77bbea"
  }, {
    "url": "exercises/44",
    "revision": "ef0f201fe72448bfeb348b253888e6a6"
  }, {
    "url": "exercises/45",
    "revision": "dfc392d6eb8690ce5f7dbc3a9427cd99"
  }, {
    "url": "exercises/46",
    "revision": "0503ae8b82fa8315ed6a35b28962044c"
  }, {
    "url": "exercises/47",
    "revision": "465a88cef1e164ed433e46eb83b9a398"
  }, {
    "url": "exercises/48",
    "revision": "4185199f6cfb72d54d7299039eaff04d"
  }, {
    "url": "exercises/49",
    "revision": "82454fb6d75f58053514c155e414370d"
  }, {
    "url": "exercises/5",
    "revision": "ffe236095b0c3a4bcdb10e602f42e62c"
  }, {
    "url": "exercises/50",
    "revision": "b457bb604689ef6ea27a43a384fd7f2c"
  }, {
    "url": "exercises/51",
    "revision": "c5f8d8c6597d89b087d74d479dab11c2"
  }, {
    "url": "exercises/52",
    "revision": "af47d5d8aeb0ed594aa9613506712e56"
  }, {
    "url": "exercises/53",
    "revision": "dc770dd2d33f9c076ff8378feaa16677"
  }, {
    "url": "exercises/54",
    "revision": "b3a7ccfa00c17cc132ef803e8347bfa7"
  }, {
    "url": "exercises/55",
    "revision": "99a70a3136920578852c1362ad477c7d"
  }, {
    "url": "exercises/56",
    "revision": "243c221e40105c1822629d21182619e6"
  }, {
    "url": "exercises/57",
    "revision": "ed420f9ec879a962990aedc01290f671"
  }, {
    "url": "exercises/58",
    "revision": "3c257c8e01d644ed5cbc536068a57a28"
  }, {
    "url": "exercises/59",
    "revision": "028d4091fe5e785db7317899d51b4854"
  }, {
    "url": "exercises/6",
    "revision": "2595b5d04283db59bb30a96ec2ad8940"
  }, {
    "url": "exercises/60",
    "revision": "7ce6507c4ecd2b40140104159eb99587"
  }, {
    "url": "exercises/61",
    "revision": "fdb732f383c619102b13d6d3b5e46b1d"
  }, {
    "url": "exercises/62",
    "revision": "61e9bc80626eb75458f46c3b9e3d3d25"
  }, {
    "url": "exercises/63",
    "revision": "25ffb78a1eff35d613a3ed4828b893f8"
  }, {
    "url": "exercises/64",
    "revision": "0d8e838116a889f8a41f06fcc5fa6412"
  }, {
    "url": "exercises/65",
    "revision": "91c11413409cdba3f13ad35f304571d7"
  }, {
    "url": "exercises/66",
    "revision": "d9ee67b9bc6e713b6279485a68897530"
  }, {
    "url": "exercises/67",
    "revision": "236ca29d8d55b79253c6cb44c446b60d"
  }, {
    "url": "exercises/68",
    "revision": "bc8ad7ffa98ff7cff8747adc790329cb"
  }, {
    "url": "exercises/69",
    "revision": "8b675783ba0fa2bc328b57c21a8d896f"
  }, {
    "url": "exercises/7",
    "revision": "d057bdef86c345e037bca857bc711b4b"
  }, {
    "url": "exercises/70",
    "revision": "cc226f9a734efbef75c6d827097fb31d"
  }, {
    "url": "exercises/71",
    "revision": "355bfe55efdfeeda08673914a355ca36"
  }, {
    "url": "exercises/72",
    "revision": "728182eece7b4317c497f5a1c0d0295b"
  }, {
    "url": "exercises/73",
    "revision": "8ff1aa43cd0c6505e5fb575b5e6c9563"
  }, {
    "url": "exercises/74",
    "revision": "2e01dda16d3d7b5bd04cda5ddcc7b9c6"
  }, {
    "url": "exercises/75",
    "revision": "d35f0479e2a092250efb1cc676a4d345"
  }, {
    "url": "exercises/76",
    "revision": "b10bb1cddc0fb1cdc2b531028008ba8d"
  }, {
    "url": "exercises/77",
    "revision": "b37d0f79a82d6e1197c5426d697901c4"
  }, {
    "url": "exercises/78",
    "revision": "827138710ec7e7f33eb9c7ee51cc7cae"
  }, {
    "url": "exercises/79",
    "revision": "aedd9840c9d004b3677ff7df46fca6ab"
  }, {
    "url": "exercises/8",
    "revision": "28fb81fb32b049ef2bf1e19b0a239e34"
  }, {
    "url": "exercises/80",
    "revision": "8f4d71fcc206fa2b8638c47d74037021"
  }, {
    "url": "exercises/81",
    "revision": "7ed7b2616facf7c4c6363e17d20ffbf0"
  }, {
    "url": "exercises/82",
    "revision": "bc84fc71b1cfb44f63346deb4d997ffb"
  }, {
    "url": "exercises/83",
    "revision": "201b19ad6fa12e161743002aebd52cfd"
  }, {
    "url": "exercises/84",
    "revision": "4b43f8c0a9761144e983e2aed6f98810"
  }, {
    "url": "exercises/85",
    "revision": "89259434cc7ec7920ad7e1537e04d8ff"
  }, {
    "url": "exercises/86",
    "revision": "81f0dfd7f9370228acae0e21739e576c"
  }, {
    "url": "exercises/87",
    "revision": "787a3f98ab06ee70c76ca3fc36e1ece6"
  }, {
    "url": "exercises/88",
    "revision": "f704f9fd7c9e6f66d0d2b3d19e6ab6b9"
  }, {
    "url": "exercises/89",
    "revision": "a3617bfe31694348aee3b13d49f0ab71"
  }, {
    "url": "exercises/9",
    "revision": "8cdf5597fc9ebabacdb62791f4b755dc"
  }, {
    "url": "exercises/90",
    "revision": "23d523b8204079ee0cdf6fd157292160"
  }, {
    "url": "exercises/91",
    "revision": "c7cafbe5d8047f34ca8a63c909f5dd15"
  }, {
    "url": "exercises/92",
    "revision": "7684ac119561e46bcd76f8791f6f9833"
  }, {
    "url": "exercises/93",
    "revision": "b2b064e534ed4ff00f819044d0505a83"
  }, {
    "url": "exercises/94",
    "revision": "617e3187d0d53ca8deece9d85476e923"
  }, {
    "url": "exercises/95",
    "revision": "584982639d5c41ac9ad90e701248a646"
  }, {
    "url": "exercises/96",
    "revision": "4cc00138e8bdb3344572613b2efe5d68"
  }, {
    "url": "exercises/97",
    "revision": "7d3f63a955ea2017900c7a98846fd659"
  }, {
    "url": "exercises/98",
    "revision": "9a9c0f4c819800d4e89c3021c22af36f"
  }, {
    "url": "exercises/99",
    "revision": "422138c2fd98c2e2b8474b3c6bbf3d66"
  }, {
    "url": "/exercises/",
    "revision": "002cb2145aefbd6d3ac4c0c46ef93e5e"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
