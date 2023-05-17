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
    "url": "_app/immutable/chunks/paths.2df6e9d6.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.86db7212.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.4311118a.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.4ca4f115.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.3fccb806.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.52498d96.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.593e55a8.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.e2e1c84a.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.daeab146.js",
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
    "revision": "19265739bfcbce66432c4bf8357c390b"
  }, {
    "url": "exercises/10",
    "revision": "9998995bfc2f2dad2c88c229bf1a49df"
  }, {
    "url": "exercises/100",
    "revision": "297cf002168ecfad4b558cd0328716e8"
  }, {
    "url": "exercises/101",
    "revision": "411399c3fca417b8dd2c201e1bbda90f"
  }, {
    "url": "exercises/102",
    "revision": "cd838c6a6bc3a21ba4973064cb0150b4"
  }, {
    "url": "exercises/103",
    "revision": "589212eaa62097fff145770f78855b4e"
  }, {
    "url": "exercises/104",
    "revision": "d845d8c18a11845719126da1aa07a4e0"
  }, {
    "url": "exercises/105",
    "revision": "af179a410d0a9f88b3c10c5c936a20ba"
  }, {
    "url": "exercises/106",
    "revision": "73b7b93de8071f4009cec4cbae49434a"
  }, {
    "url": "exercises/107",
    "revision": "adf8d864494cce3f15c41703c2817fd3"
  }, {
    "url": "exercises/108",
    "revision": "f96dfb3be5f762f23c3c5970d6ca8cfe"
  }, {
    "url": "exercises/109",
    "revision": "203afbadf7a4b4f04be58b07c1977279"
  }, {
    "url": "exercises/11",
    "revision": "add313affb85c6a93144329933d30861"
  }, {
    "url": "exercises/110",
    "revision": "2e5ddbafc6ea22d913932aa2a11a5e9a"
  }, {
    "url": "exercises/111",
    "revision": "d3ee2f05693fa32e3cf1d2c176d90263"
  }, {
    "url": "exercises/112",
    "revision": "c1c12a4a1962a72b2d09b0bb3f1b3cd4"
  }, {
    "url": "exercises/113",
    "revision": "01c741c21149ad90f6e3922060c5aa93"
  }, {
    "url": "exercises/114",
    "revision": "9e44d6af835021ba77791547c496053f"
  }, {
    "url": "exercises/115",
    "revision": "4f0ea4012d9ec3a27bd92cd3da71d566"
  }, {
    "url": "exercises/116",
    "revision": "2df4460ffcb7696cd0e22aeda984131a"
  }, {
    "url": "exercises/117",
    "revision": "37087a008d71b5ed42590e3486af0c10"
  }, {
    "url": "exercises/118",
    "revision": "96b30a0c6fcef89d9a5f27f86d97d1e4"
  }, {
    "url": "exercises/119",
    "revision": "f36b944db14e869411d7719f2ae09583"
  }, {
    "url": "exercises/12",
    "revision": "f55470eaf0abd5e42211b0a8ebca2546"
  }, {
    "url": "exercises/120",
    "revision": "eb953f0f20c05c596291f7084e065665"
  }, {
    "url": "exercises/121",
    "revision": "9c723c2531148ea463dd5d6794beed3f"
  }, {
    "url": "exercises/122",
    "revision": "f6644127a364e90627ff6240467bfa1d"
  }, {
    "url": "exercises/123",
    "revision": "16c895d83b4a6335bba85c10f45bf1c9"
  }, {
    "url": "exercises/124",
    "revision": "e7034deb02abdf0f199a75ce8f29f0af"
  }, {
    "url": "exercises/125",
    "revision": "85217ad427496f65718f47a84154413a"
  }, {
    "url": "exercises/13",
    "revision": "7fcb97a47c8099d8ac76cdb55ca8488c"
  }, {
    "url": "exercises/14",
    "revision": "19c6c8513ced6247a6bc1e9ff220d42a"
  }, {
    "url": "exercises/15",
    "revision": "4c0da4a4d03ff46e94be03ab0bb12b08"
  }, {
    "url": "exercises/16",
    "revision": "e64df5067f07069b4e0ad811e22ebf75"
  }, {
    "url": "exercises/17",
    "revision": "708d2b42a2544e4dfd3e8ab2c966a969"
  }, {
    "url": "exercises/18",
    "revision": "f50904d0cd6024d8841597f1ce6cbfac"
  }, {
    "url": "exercises/19",
    "revision": "28a933368661b2e646da7b700fe9242b"
  }, {
    "url": "exercises/2",
    "revision": "436ada58f95d54e84ae5ac441a141551"
  }, {
    "url": "exercises/20",
    "revision": "681162ac9382e3a79e5929b9c93001bc"
  }, {
    "url": "exercises/21",
    "revision": "a2a81d66a6115eb42081e09b514675e9"
  }, {
    "url": "exercises/22",
    "revision": "8230e387e8fc97c15474df3ea9f16e90"
  }, {
    "url": "exercises/23",
    "revision": "e3af8aaa8f476cb3ceead2a1f2556e9d"
  }, {
    "url": "exercises/24",
    "revision": "4c95440bb791bc6ff748ccea4ca611ad"
  }, {
    "url": "exercises/25",
    "revision": "a362af6cc3ddb2f7e075898a072bd4ee"
  }, {
    "url": "exercises/26",
    "revision": "a7b3e9f9f0942805be9e0c397e76a871"
  }, {
    "url": "exercises/27",
    "revision": "a45d5b2d5e439f861e7b678a7aabb9f9"
  }, {
    "url": "exercises/28",
    "revision": "9227363d32273c1ca13b4a74acc119c8"
  }, {
    "url": "exercises/29",
    "revision": "cf30267856d6a1d3749851bb480add47"
  }, {
    "url": "exercises/3",
    "revision": "f691752eb9d0771c57c58d4843c33fe4"
  }, {
    "url": "exercises/30",
    "revision": "00d7c5f3da1801327116c1c8647b06a9"
  }, {
    "url": "exercises/31",
    "revision": "b79b7fdf532b500530e26331db1042ca"
  }, {
    "url": "exercises/32",
    "revision": "0e97bfaaee7cf4c40f4ef6094a262d0c"
  }, {
    "url": "exercises/33",
    "revision": "b07ed5367285bbe4748be1b4c722a684"
  }, {
    "url": "exercises/34",
    "revision": "2401b1ed65fbf82d70f01e0fd0156752"
  }, {
    "url": "exercises/35",
    "revision": "66884fceb04f2c96cc3bf0248bd3ed5c"
  }, {
    "url": "exercises/36",
    "revision": "34205d6e2cd6a0c43b28be3b61252481"
  }, {
    "url": "exercises/37",
    "revision": "3e321dd980d0ebe80fea0e3fa85308da"
  }, {
    "url": "exercises/38",
    "revision": "04d7450736a6964baebb11c0df045461"
  }, {
    "url": "exercises/39",
    "revision": "46775b3249d81fef12fdb2720a88563b"
  }, {
    "url": "exercises/4",
    "revision": "f747ff37e706e99ec62f36b1332ea1f2"
  }, {
    "url": "exercises/40",
    "revision": "a327bdf61bdb8b258fc0328b6c0ea5d1"
  }, {
    "url": "exercises/41",
    "revision": "d5c32b55f66ab8c26ef7580b9ac89eb1"
  }, {
    "url": "exercises/42",
    "revision": "c7101794cc7c433cac4702af5bf49a87"
  }, {
    "url": "exercises/43",
    "revision": "01b7ea8caa3db8ebcfd1f8d9426f04fc"
  }, {
    "url": "exercises/44",
    "revision": "2d5fd185f9fd5d37b85ba172d2b44a15"
  }, {
    "url": "exercises/45",
    "revision": "61a14453d82d56e35adac0cb9e4f1c6f"
  }, {
    "url": "exercises/46",
    "revision": "ac8890714b597f52e38e943d93c4182c"
  }, {
    "url": "exercises/47",
    "revision": "fb8f6cbb6ce6c488f4024f74e1fc7c7f"
  }, {
    "url": "exercises/48",
    "revision": "60f57e47e73e9752993cbab2d0da8350"
  }, {
    "url": "exercises/49",
    "revision": "df6f49da0addd2b61971fb2ed8bcfd4d"
  }, {
    "url": "exercises/5",
    "revision": "e6377ce644916fdf2ca9f3f5d848337f"
  }, {
    "url": "exercises/50",
    "revision": "a5b77bad2140a69d48d1de4b2eee0108"
  }, {
    "url": "exercises/51",
    "revision": "5589ff61168255ab829710a34c5b1d68"
  }, {
    "url": "exercises/52",
    "revision": "290df9f6748569ce4321b5bce96a03ef"
  }, {
    "url": "exercises/53",
    "revision": "b13362598ea54895f3e1e5b403766b02"
  }, {
    "url": "exercises/54",
    "revision": "dcb8177b6fa2ff746ffb34c52fcdc71d"
  }, {
    "url": "exercises/55",
    "revision": "595d041cf88a30cd22394b19d02bdaab"
  }, {
    "url": "exercises/56",
    "revision": "e1ea37430ce6625465227118add9c3bf"
  }, {
    "url": "exercises/57",
    "revision": "03b12e4b47c9893aa8abba02afdfca38"
  }, {
    "url": "exercises/58",
    "revision": "07579323a192d6c7c778a8c94f60e71c"
  }, {
    "url": "exercises/59",
    "revision": "ad439e2a246d09f59a3a91b8b017af48"
  }, {
    "url": "exercises/6",
    "revision": "07b801edb4661f259e6a22ea9a08bfe0"
  }, {
    "url": "exercises/60",
    "revision": "ae881a43876d32a7e43b1e729ad782c2"
  }, {
    "url": "exercises/61",
    "revision": "06b258772df8f62da0b614f639583f51"
  }, {
    "url": "exercises/62",
    "revision": "958fc846dfe4ac874b0346cbe2423e26"
  }, {
    "url": "exercises/63",
    "revision": "1bd7e4502d61f16a11be314116a7c299"
  }, {
    "url": "exercises/64",
    "revision": "06e0a6f4c27ead00c126254526455e18"
  }, {
    "url": "exercises/65",
    "revision": "86d9a2c7e38e373a8c0252265c0145fd"
  }, {
    "url": "exercises/66",
    "revision": "6fd6d8275e49f9ff98a8f2874e7af0ec"
  }, {
    "url": "exercises/67",
    "revision": "e96ae646f6ed8bb6154c7e4362e1c45c"
  }, {
    "url": "exercises/68",
    "revision": "814294b40483dacf876f72529b1f8a01"
  }, {
    "url": "exercises/69",
    "revision": "35701c2da0af0581839754b82b88f577"
  }, {
    "url": "exercises/7",
    "revision": "2c75ef31f39cb8d6decc4e77a2624031"
  }, {
    "url": "exercises/70",
    "revision": "ecb973c448c5c0ac3d7a6eadf56ff5e2"
  }, {
    "url": "exercises/71",
    "revision": "32ed54fc82c219f3a1d8ac99eb07df60"
  }, {
    "url": "exercises/72",
    "revision": "e09e0e01661123fb0d1b46f4c95beaec"
  }, {
    "url": "exercises/73",
    "revision": "950c51bafa763a17cb2d5becd5e0635e"
  }, {
    "url": "exercises/74",
    "revision": "ab9c42b0108a7525995a19449f41216e"
  }, {
    "url": "exercises/75",
    "revision": "a0d4dae975099485dd11fc06bbfe025f"
  }, {
    "url": "exercises/76",
    "revision": "9e0caa4fb6e7d7793968a07c3382bfec"
  }, {
    "url": "exercises/77",
    "revision": "c7a4bac9d7ba3664f5e4645877f19c3e"
  }, {
    "url": "exercises/78",
    "revision": "41717e78bfa0e8c4da388627f2cd93ac"
  }, {
    "url": "exercises/79",
    "revision": "6bf5fa616f674eff224520606eeef72f"
  }, {
    "url": "exercises/8",
    "revision": "1b4cac25e50dc7b4b74949dfe33baf94"
  }, {
    "url": "exercises/80",
    "revision": "867fbfa562115adf1daa59eaeedc46eb"
  }, {
    "url": "exercises/81",
    "revision": "75312ada56e7f3bf91f59b75f8751f64"
  }, {
    "url": "exercises/82",
    "revision": "22e5bb5b341ce16fda661f2e1bd349c5"
  }, {
    "url": "exercises/83",
    "revision": "e555e1fcb8f0860bd5ebcd0ac036e613"
  }, {
    "url": "exercises/84",
    "revision": "9d161461ff6e128f4a33961c908ae283"
  }, {
    "url": "exercises/85",
    "revision": "c4e2094099071dc28d670700c6c63c06"
  }, {
    "url": "exercises/86",
    "revision": "a6b95b8760ecbee0312e4803524fd898"
  }, {
    "url": "exercises/87",
    "revision": "67d65f0792bc534261c14b39373aa302"
  }, {
    "url": "exercises/88",
    "revision": "73ea6dd7d541f09ba8e178094c25e7f3"
  }, {
    "url": "exercises/89",
    "revision": "18287d3f1029f42e35ac271f9adb83d0"
  }, {
    "url": "exercises/9",
    "revision": "6ee9abf106a4db2ee24e8450a18dab46"
  }, {
    "url": "exercises/90",
    "revision": "5ca692a907711ebe9f9af0ea07b02ea7"
  }, {
    "url": "exercises/91",
    "revision": "7cd252604ae07d2320d6b7e564c5b67c"
  }, {
    "url": "exercises/92",
    "revision": "1ea24e5afcb933e76e4a0e73a1460657"
  }, {
    "url": "exercises/93",
    "revision": "2b248c49f90a133bd89dc5e75d678714"
  }, {
    "url": "exercises/94",
    "revision": "dc0d866541aa75f6f90e50e067103ab3"
  }, {
    "url": "exercises/95",
    "revision": "192e44d862e59d3a57d0bf882e960389"
  }, {
    "url": "exercises/96",
    "revision": "a7cfb5989777de247647085fb8ab7d84"
  }, {
    "url": "exercises/97",
    "revision": "42d9bcb5ebbab908c72c708e62f04be3"
  }, {
    "url": "exercises/98",
    "revision": "88c5014d6a2cfdc21f9abfb798cad567"
  }, {
    "url": "exercises/99",
    "revision": "b95ee2e502e2faa61650323eb49f1d0c"
  }, {
    "url": "/exercises/",
    "revision": "562cc84a2b6773a742e597ec8efadec4"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
