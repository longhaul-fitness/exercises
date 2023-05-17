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
    "url": "_app/immutable/assets/2.b2babc85.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/ReloadPrompt.8b6f04a5.css",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.cf130dc5.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.d685bbfc.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/paths.b3902b50.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.d3e61059.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.5f900c86.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.a0d8caa9.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.db84a82a.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.d8b6555d.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.712b31be.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.58c1e428.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.cffdb898.js",
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
    "revision": "9b6283207561999bc00787316dc5c3c0"
  }, {
    "url": "exercises/10",
    "revision": "9e50a7c05f12dfcc812134f5e1f8f25c"
  }, {
    "url": "exercises/100",
    "revision": "a9d39bc9dafbdf4460c82c691d6e5054"
  }, {
    "url": "exercises/101",
    "revision": "7592e0d0699bcd7b280bb8971f65d824"
  }, {
    "url": "exercises/102",
    "revision": "3afb0a9d0df8f312e2e95d242f422f37"
  }, {
    "url": "exercises/103",
    "revision": "199dfb4a566f88664241001e1d73884f"
  }, {
    "url": "exercises/104",
    "revision": "7d0322510cca7ec76b6d31679bcb43ee"
  }, {
    "url": "exercises/105",
    "revision": "46acad80e135c5808c5e1ab842a293c9"
  }, {
    "url": "exercises/106",
    "revision": "fd695a6277b396bc0169835db7f1d9a9"
  }, {
    "url": "exercises/107",
    "revision": "f4ae577d524d8bc94378594c69cbd0d8"
  }, {
    "url": "exercises/108",
    "revision": "e6a5e908d7adb45ba474b4cc5fc25130"
  }, {
    "url": "exercises/109",
    "revision": "245ff81181440203a3bda2d6d27e4633"
  }, {
    "url": "exercises/11",
    "revision": "fba4a8355dc2be2dc3c9f9745a68cadd"
  }, {
    "url": "exercises/110",
    "revision": "5357d5b4aa8ad2427ba48e64d7ac810b"
  }, {
    "url": "exercises/111",
    "revision": "03fce99994b226860a44a107beef8ce8"
  }, {
    "url": "exercises/112",
    "revision": "7ad68918df5a8fbab8481a7e8abd0811"
  }, {
    "url": "exercises/113",
    "revision": "1a4b5e0fe11c80ccf5c06dcdde53a865"
  }, {
    "url": "exercises/114",
    "revision": "e89107ea70e99d77c404e66ebc60a651"
  }, {
    "url": "exercises/115",
    "revision": "aa5d288cc45ab762680855a346978d18"
  }, {
    "url": "exercises/116",
    "revision": "c4ef41eb3c0618aaff5f920bbf8cbc4d"
  }, {
    "url": "exercises/117",
    "revision": "ea3552b27f4fd1cc3b5c7d998625fa12"
  }, {
    "url": "exercises/118",
    "revision": "35c620723ea11ea7c5e489dc9285d50e"
  }, {
    "url": "exercises/119",
    "revision": "ad4050ac83f23c19a628ca8d96f3e012"
  }, {
    "url": "exercises/12",
    "revision": "efd2262b148c20fc6f62eb97767ebe3f"
  }, {
    "url": "exercises/120",
    "revision": "5d80ceaade887d962d55bfab4e7199d1"
  }, {
    "url": "exercises/121",
    "revision": "a6c8972de5f9b41ac83f31b0585fc946"
  }, {
    "url": "exercises/122",
    "revision": "ff42a6e81ddabc132085c20233dda356"
  }, {
    "url": "exercises/123",
    "revision": "df9ddf44d44eb9fc0938f663614a7936"
  }, {
    "url": "exercises/124",
    "revision": "08be771573b3fe953eab28f2bdbc3e94"
  }, {
    "url": "exercises/125",
    "revision": "aa66204fde38f75402abc9db0a307241"
  }, {
    "url": "exercises/13",
    "revision": "d424b2691fb6108b08457d1b0bfa3ece"
  }, {
    "url": "exercises/14",
    "revision": "0583c7dfab29cf55ee9669aba6bda62d"
  }, {
    "url": "exercises/15",
    "revision": "a29520487190a464677ce66d8d18055f"
  }, {
    "url": "exercises/16",
    "revision": "72dbb3566ca78b9075922be6bedd024a"
  }, {
    "url": "exercises/17",
    "revision": "2552c15f5c8eb555308d2cb15dbbf0aa"
  }, {
    "url": "exercises/18",
    "revision": "e65380df9ffb9d8eff2bb21ebefbdce7"
  }, {
    "url": "exercises/19",
    "revision": "d1bbefafe63b4bf4d208b7de2d182f16"
  }, {
    "url": "exercises/2",
    "revision": "91c81950942352d8ac4387edeaf8c976"
  }, {
    "url": "exercises/20",
    "revision": "eb57e97665847c6bb440ab9a1db3e9e2"
  }, {
    "url": "exercises/21",
    "revision": "ae7c7470d8d039d556ccf49fdeace299"
  }, {
    "url": "exercises/22",
    "revision": "c8bfd90de30916e99a3ecc43ebb09822"
  }, {
    "url": "exercises/23",
    "revision": "64da4c6d6d445ce9a9ff4868c6ad4dc2"
  }, {
    "url": "exercises/24",
    "revision": "7171d4f48aa276265be15cc8457d898a"
  }, {
    "url": "exercises/25",
    "revision": "1b65ae0211ba345f28da3bcb5c0b240c"
  }, {
    "url": "exercises/26",
    "revision": "e11e576d10b80730b71d0b9254889f59"
  }, {
    "url": "exercises/27",
    "revision": "a6f6aa87645cc9ab74910fddf96bd466"
  }, {
    "url": "exercises/28",
    "revision": "7e6fb1aaf61c5f6d6628c498d187162f"
  }, {
    "url": "exercises/29",
    "revision": "870e5d475249130ade5c205add405c37"
  }, {
    "url": "exercises/3",
    "revision": "f6d883e376649c4228ca87e0bbb7456f"
  }, {
    "url": "exercises/30",
    "revision": "acfe1ab09a063d8020fdca92d98d977e"
  }, {
    "url": "exercises/31",
    "revision": "9ce465de9aebb41fb21f5c54baa1d7fa"
  }, {
    "url": "exercises/32",
    "revision": "262ddd01a35067d99a0c5ad96c7b3dd4"
  }, {
    "url": "exercises/33",
    "revision": "677aa998195a14ba06af44ea7db49e1f"
  }, {
    "url": "exercises/34",
    "revision": "7c4928c3d28b8ae55f8aa49cf07e99cf"
  }, {
    "url": "exercises/35",
    "revision": "78664c1afa7fbc98e17583690e435b74"
  }, {
    "url": "exercises/36",
    "revision": "1114f7bd88208dbf5123edeece4e6433"
  }, {
    "url": "exercises/37",
    "revision": "b6a0e13f9b5e0dd8b2f96f0b568d08cf"
  }, {
    "url": "exercises/38",
    "revision": "cfbdf9d7956f984d51620693a7192ce6"
  }, {
    "url": "exercises/39",
    "revision": "833351e086a66ecde90be9bfab7ba500"
  }, {
    "url": "exercises/4",
    "revision": "32f9464b6c95ae2517a509b8740c785c"
  }, {
    "url": "exercises/40",
    "revision": "f26ad9f774b11b221ebf966dc4dc9fb3"
  }, {
    "url": "exercises/41",
    "revision": "be2e9c96b92b3aa73f0bd194143e2bc1"
  }, {
    "url": "exercises/42",
    "revision": "11ec48ee64fa4a088b388e882933df29"
  }, {
    "url": "exercises/43",
    "revision": "1f96652ac0ae0d9a809d026d69e95df5"
  }, {
    "url": "exercises/44",
    "revision": "2ff70d13ed79fc7b910535bf77e98a18"
  }, {
    "url": "exercises/45",
    "revision": "f228be027c33d36741c2c625e475a2fa"
  }, {
    "url": "exercises/46",
    "revision": "69ef7bea1e78dc57102035f4c7747f55"
  }, {
    "url": "exercises/47",
    "revision": "ab0a9286f4ba538fcd468ff896b27268"
  }, {
    "url": "exercises/48",
    "revision": "c8e49508dfd6ead0b616c082b8db8a7b"
  }, {
    "url": "exercises/49",
    "revision": "b8e44bcc491f34723ae0105d293dc68a"
  }, {
    "url": "exercises/5",
    "revision": "c32da1e950cf19326a5ad9d951ecfdc5"
  }, {
    "url": "exercises/50",
    "revision": "4fca1e4d6bc96c61f149283b98bf3151"
  }, {
    "url": "exercises/51",
    "revision": "b29b9e57cec153962fec6bf30978c218"
  }, {
    "url": "exercises/52",
    "revision": "772e1490c097ee4e5b71c209ceb73223"
  }, {
    "url": "exercises/53",
    "revision": "d5458a02b5505413a62e067221d86aa4"
  }, {
    "url": "exercises/54",
    "revision": "34b3749ed8cd2d24cf084614a9ed9287"
  }, {
    "url": "exercises/55",
    "revision": "64a5ff444ba6eee0b104b7a5d7f48bae"
  }, {
    "url": "exercises/56",
    "revision": "46740da857c381e8ca1e3bc27425ac63"
  }, {
    "url": "exercises/57",
    "revision": "ee343155695eef372ffaf3e8192c5119"
  }, {
    "url": "exercises/58",
    "revision": "3d90181983ae9629516129446bfbc314"
  }, {
    "url": "exercises/59",
    "revision": "06bde890f621c5734b750fb5772fab77"
  }, {
    "url": "exercises/6",
    "revision": "1758fa3d7d233902e50ff0098a94aa9b"
  }, {
    "url": "exercises/60",
    "revision": "0b80c4e04913c3c43d7c8d712e3f130e"
  }, {
    "url": "exercises/61",
    "revision": "43fb05e8fd33a9b8a86863231b27c3c0"
  }, {
    "url": "exercises/62",
    "revision": "cb0a45d0c4e40947fb54af824780bace"
  }, {
    "url": "exercises/63",
    "revision": "0757af55286cb6be8587e78997dc9d00"
  }, {
    "url": "exercises/64",
    "revision": "9437161340aa7ebedd4bb832f466bb33"
  }, {
    "url": "exercises/65",
    "revision": "b77354d5f4ad04f9287c3056da0d97b2"
  }, {
    "url": "exercises/66",
    "revision": "e0d4f1933fe67293f178c2d4c073e70f"
  }, {
    "url": "exercises/67",
    "revision": "69bc2f5a7d106ff2cef9da38ece4f145"
  }, {
    "url": "exercises/68",
    "revision": "438663ea04e208cdde75b3424a439a60"
  }, {
    "url": "exercises/69",
    "revision": "6baceae01e21132dc316502de31ed4f1"
  }, {
    "url": "exercises/7",
    "revision": "d62c857cdf5814ec9a2f077aae3e8658"
  }, {
    "url": "exercises/70",
    "revision": "2f5f03c19ed221f94e0697ad27d11edd"
  }, {
    "url": "exercises/71",
    "revision": "6e7008cae194cf79e7bad31bddc2b0ce"
  }, {
    "url": "exercises/72",
    "revision": "5e0c345035d7e1eb75ccd0d32be40bf7"
  }, {
    "url": "exercises/73",
    "revision": "a8b211cc1b13ad0c2a10bcef8f02d507"
  }, {
    "url": "exercises/74",
    "revision": "04c338928a64a40bdc6b48a8f3cea3c2"
  }, {
    "url": "exercises/75",
    "revision": "b7f7af287edd2e5792874b94a532b37b"
  }, {
    "url": "exercises/76",
    "revision": "b20752096e1e1c88acef143733c161a9"
  }, {
    "url": "exercises/77",
    "revision": "c71f4bfbf9101337b64c456433cb605f"
  }, {
    "url": "exercises/78",
    "revision": "039529c77062382d878a6f20d44b76a8"
  }, {
    "url": "exercises/79",
    "revision": "9e837f6403f5aff11b786de561136a57"
  }, {
    "url": "exercises/8",
    "revision": "a4caaa5697cb22862ace1c870644f68a"
  }, {
    "url": "exercises/80",
    "revision": "6c375fdc0741af46fa142262699ace6d"
  }, {
    "url": "exercises/81",
    "revision": "67b4cee1c7e56e20264b65117ad06a9b"
  }, {
    "url": "exercises/82",
    "revision": "87722c724b858ca9656cac06d5dce1f9"
  }, {
    "url": "exercises/83",
    "revision": "c8a45735bec5d4f2b9e66ef59ff76fb9"
  }, {
    "url": "exercises/84",
    "revision": "8c6b7a328c9f09ef69a256297f492665"
  }, {
    "url": "exercises/85",
    "revision": "de0e1fb34cd177a85646d1ed3a821f4b"
  }, {
    "url": "exercises/86",
    "revision": "6bd00ac579f1ebe91310521a61fde3c3"
  }, {
    "url": "exercises/87",
    "revision": "c6a7e2925326b938a0247dbe1bcb0a2e"
  }, {
    "url": "exercises/88",
    "revision": "40b7d0e45f5d042ff27598d1ca738c25"
  }, {
    "url": "exercises/89",
    "revision": "c636256492250434444aaac7487694b5"
  }, {
    "url": "exercises/9",
    "revision": "b4e890b3f353295e38e4420296fec213"
  }, {
    "url": "exercises/90",
    "revision": "b5c2775e51138bbf2e2f70ba210c56ac"
  }, {
    "url": "exercises/91",
    "revision": "b75fe030a90552fd4c3191638741e4fa"
  }, {
    "url": "exercises/92",
    "revision": "e80fdb6710f7517a802823b9e42d597b"
  }, {
    "url": "exercises/93",
    "revision": "3a144441228ffdf32a68d33da5e4ed69"
  }, {
    "url": "exercises/94",
    "revision": "e82d7f6fc3fd1ccac1a94ad21d4ff3b5"
  }, {
    "url": "exercises/95",
    "revision": "e10fdffcb8ef1a4ff08852fab938d005"
  }, {
    "url": "exercises/96",
    "revision": "d7ac2db016e387c0bb3a97f9efe6dffb"
  }, {
    "url": "exercises/97",
    "revision": "e1e0adc308f7c650252f5ca982e168bf"
  }, {
    "url": "exercises/98",
    "revision": "77274bfaa87b0867daebadc0c59e672e"
  }, {
    "url": "exercises/99",
    "revision": "901a1acbe300d8d086c268d02e6b6710"
  }, {
    "url": "/exercises/",
    "revision": "5d69e28a70b21a61a7b455c8364db54b"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
