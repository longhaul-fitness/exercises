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
    "url": "_app/immutable/chunks/paths.75930578.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.51eca629.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.3eb4b883.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.e77eae52.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.5ab9f3d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.b16efeb6.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.c09036f0.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.6dd811e4.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.890766eb.js",
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
    "revision": "138a08c9a7f16f45758bb44b8f6fa70d"
  }, {
    "url": "exercises/10",
    "revision": "6c85b52e03d6f32e35985fff18593e13"
  }, {
    "url": "exercises/100",
    "revision": "d3384226afedbf4d07e99517cda8fca2"
  }, {
    "url": "exercises/101",
    "revision": "13923d7a7425fce9420fab61c8895b32"
  }, {
    "url": "exercises/102",
    "revision": "cc18103c8aeb51b513d98362d134c03e"
  }, {
    "url": "exercises/103",
    "revision": "5e2f0212366aff8435bda9d7fb96dc70"
  }, {
    "url": "exercises/104",
    "revision": "6464331d907f3b2d0637ebe00661a1a7"
  }, {
    "url": "exercises/105",
    "revision": "9cb943b925b5b69822ee981eb006ab22"
  }, {
    "url": "exercises/106",
    "revision": "f4c4934d5eb04cc75013de2ed2fb3f71"
  }, {
    "url": "exercises/107",
    "revision": "5b1025a84cc19a5f355eae150078345a"
  }, {
    "url": "exercises/108",
    "revision": "3a0ab15f975ec8ed72f660db76be7985"
  }, {
    "url": "exercises/109",
    "revision": "5f5ad28eb3ab3d9ae0d6b8c271b3b2b8"
  }, {
    "url": "exercises/11",
    "revision": "d22eb9667de67035024a4cbf6ce23d8a"
  }, {
    "url": "exercises/110",
    "revision": "b7505f3806f741eef6643216163549fd"
  }, {
    "url": "exercises/111",
    "revision": "6e1b2dcb9ac02058d4e02bceb3cad718"
  }, {
    "url": "exercises/112",
    "revision": "ff61c82c6abba2008c91bdd8bf6e907b"
  }, {
    "url": "exercises/113",
    "revision": "4ebe248750dcd6e5b480b5f1f52e8174"
  }, {
    "url": "exercises/114",
    "revision": "2145764cc8dcb7284aa911bb4a7dd9a3"
  }, {
    "url": "exercises/115",
    "revision": "9c30c17ad1b9ff5fc01b0aeae25177f6"
  }, {
    "url": "exercises/116",
    "revision": "c0ee55108dc989b0a296e595719537a8"
  }, {
    "url": "exercises/117",
    "revision": "36e18bb43d3ba26833b66ee213f61d99"
  }, {
    "url": "exercises/118",
    "revision": "aef902bd7cd3202a30570ec42b2573a4"
  }, {
    "url": "exercises/119",
    "revision": "59bcc094454548f5c577e20c64d51eef"
  }, {
    "url": "exercises/12",
    "revision": "479320405d87aea4e34a6b05f576f1d2"
  }, {
    "url": "exercises/120",
    "revision": "9ac46b6f7d4e3c84d82dc1b119bad14e"
  }, {
    "url": "exercises/121",
    "revision": "2c6439aed19b386fd1d63901284b6de1"
  }, {
    "url": "exercises/122",
    "revision": "3d85a024b4dca8d658bfba7e539e5dbd"
  }, {
    "url": "exercises/123",
    "revision": "4d2349f6c6105fa178b2f1881d4a9917"
  }, {
    "url": "exercises/124",
    "revision": "1d4e64a49dc9ede182ab338741cad291"
  }, {
    "url": "exercises/125",
    "revision": "813e7bb83be920160d15f5e8fdb2456b"
  }, {
    "url": "exercises/13",
    "revision": "8b6209014aa531baf9471c6ab5a6a1a3"
  }, {
    "url": "exercises/14",
    "revision": "a87dd7b0ccc3041edf02f0e81a7e94c5"
  }, {
    "url": "exercises/15",
    "revision": "80e69e5499f2d3ec606d115e979b990f"
  }, {
    "url": "exercises/16",
    "revision": "da31ad733097d3cc3f17593567c457e1"
  }, {
    "url": "exercises/17",
    "revision": "78a39785895b4cef9b0bd9f94e7e5175"
  }, {
    "url": "exercises/18",
    "revision": "dcd4bc49bd10f6a8a9e2f8e2cd7d2735"
  }, {
    "url": "exercises/19",
    "revision": "6cacdbd0e6f853f0e5c5d28b210eb493"
  }, {
    "url": "exercises/2",
    "revision": "2e2be5066e61e0d64bb2b063e633e981"
  }, {
    "url": "exercises/20",
    "revision": "bc551080390852134abb84d0d6e4342b"
  }, {
    "url": "exercises/21",
    "revision": "0e2c7180c6eb1b63d62f630054b33e9c"
  }, {
    "url": "exercises/22",
    "revision": "de19ab29029e0d04bb4a1416069f9349"
  }, {
    "url": "exercises/23",
    "revision": "8ad64e79032400c695950d568b42a0b1"
  }, {
    "url": "exercises/24",
    "revision": "74ac9a309b4f565b83a3db3b47dde970"
  }, {
    "url": "exercises/25",
    "revision": "1fb2d212b0671c6a3150c9186d487718"
  }, {
    "url": "exercises/26",
    "revision": "9f898f1e1c96f871101c74c50ae95787"
  }, {
    "url": "exercises/27",
    "revision": "313f14ff5f74c899bed6bb7b22e5cb95"
  }, {
    "url": "exercises/28",
    "revision": "8ad3f1aee75122fb6c2c4f1b7493b6e3"
  }, {
    "url": "exercises/29",
    "revision": "7858af929dc487f1778a5affc98da2f4"
  }, {
    "url": "exercises/3",
    "revision": "5d61cd7015613c5fe1a80504fdee676c"
  }, {
    "url": "exercises/30",
    "revision": "9f5caf075f2e5278893a2141e35c8636"
  }, {
    "url": "exercises/31",
    "revision": "795867fc3d79922fa46cbe130c6abac1"
  }, {
    "url": "exercises/32",
    "revision": "0d38b5b3663579e40bf7446e7fee6ca0"
  }, {
    "url": "exercises/33",
    "revision": "7a83287a142f9284c1baad79a7febe03"
  }, {
    "url": "exercises/34",
    "revision": "8f92e9e2d3d69b3ec9029dc4dcbb1282"
  }, {
    "url": "exercises/35",
    "revision": "a9fd39847b36ebf69622c51d4d3e0372"
  }, {
    "url": "exercises/36",
    "revision": "dd8c325a7a8fe18f7c4d78d98a5b619f"
  }, {
    "url": "exercises/37",
    "revision": "f7a6728a50ad31e1f0bb4c45bafa0441"
  }, {
    "url": "exercises/38",
    "revision": "5446dd3d5f74221af95cd26580ef33a5"
  }, {
    "url": "exercises/39",
    "revision": "4fb15b5b0f5cf6c7a6fd09a024a8e4a4"
  }, {
    "url": "exercises/4",
    "revision": "8300f50d129818a4b831427de8a78d6e"
  }, {
    "url": "exercises/40",
    "revision": "3f73ae4638282a4258f46ea02a43f64c"
  }, {
    "url": "exercises/41",
    "revision": "304af5cfa8fe6a33ac9aad0dbb472a4f"
  }, {
    "url": "exercises/42",
    "revision": "ee57979154b3e32aedcc7c5a47fef3cf"
  }, {
    "url": "exercises/43",
    "revision": "d3eccc83c8fa288cdb24a28e2298f657"
  }, {
    "url": "exercises/44",
    "revision": "5d54468664e00793da873750e3270280"
  }, {
    "url": "exercises/45",
    "revision": "11612f6c37445755388416ebcf47f4d5"
  }, {
    "url": "exercises/46",
    "revision": "92b3eccf24da7fb883b09785b6445b77"
  }, {
    "url": "exercises/47",
    "revision": "f42bd3db61100fee554ad5f01f812316"
  }, {
    "url": "exercises/48",
    "revision": "91482abc772ee70117eb535c28f2358a"
  }, {
    "url": "exercises/49",
    "revision": "732476897c6fcdcf0f417812aa1ed745"
  }, {
    "url": "exercises/5",
    "revision": "912b7b917fdbd9d71e44693a07b77cd7"
  }, {
    "url": "exercises/50",
    "revision": "e1373ca058f4679bb8c6f8b8e126807f"
  }, {
    "url": "exercises/51",
    "revision": "943b76427a182bdc795645dd7f30fdb5"
  }, {
    "url": "exercises/52",
    "revision": "a649f5705ef0e51aae59ad24eaa39a11"
  }, {
    "url": "exercises/53",
    "revision": "9b000f6be8b05c04c6ad46bb798c8863"
  }, {
    "url": "exercises/54",
    "revision": "3521c482dc1cfe86f6514d95b565589f"
  }, {
    "url": "exercises/55",
    "revision": "c539faa7ccc692bcf5d1c34cea19f245"
  }, {
    "url": "exercises/56",
    "revision": "c7a26db16ee2047a0d15831d3e51dd5d"
  }, {
    "url": "exercises/57",
    "revision": "eeb8726eeb47ec64eb921f8ae2926922"
  }, {
    "url": "exercises/58",
    "revision": "a336582fababf56a4835ac31b671de2e"
  }, {
    "url": "exercises/59",
    "revision": "98377821bc9ec5b6f75e61e97aa5e86f"
  }, {
    "url": "exercises/6",
    "revision": "58f37323b4b641499eda2ba438b78488"
  }, {
    "url": "exercises/60",
    "revision": "a8996c1260856a0fd7dae998d27d938e"
  }, {
    "url": "exercises/61",
    "revision": "9a36de4af182ac88cb881e6cae23c494"
  }, {
    "url": "exercises/62",
    "revision": "679d849702fe9e810f9ce5e62027b66c"
  }, {
    "url": "exercises/63",
    "revision": "eda11526fcaf08745eb55c6a0b8f9a68"
  }, {
    "url": "exercises/64",
    "revision": "4032b702aeead4de2cd3a64870ae2726"
  }, {
    "url": "exercises/65",
    "revision": "99c27410ffdadf0a1722ff2a668acf38"
  }, {
    "url": "exercises/66",
    "revision": "1b5604bcf3422be52f47c356cfe1abff"
  }, {
    "url": "exercises/67",
    "revision": "a4a32570cf380d4f667df1b77210cb1a"
  }, {
    "url": "exercises/68",
    "revision": "42125a066922ac3e1396b0ab44c11b1c"
  }, {
    "url": "exercises/69",
    "revision": "a395e7615bd209f349e941fe94ebe509"
  }, {
    "url": "exercises/7",
    "revision": "cccbbde2fd16ccded0255a861ca5ee6b"
  }, {
    "url": "exercises/70",
    "revision": "4d57fec8a01581939ded18f982778952"
  }, {
    "url": "exercises/71",
    "revision": "e330b174181518a65e238890261804ab"
  }, {
    "url": "exercises/72",
    "revision": "5fcdeb1764960ea54f99c0ad6b0ef2cb"
  }, {
    "url": "exercises/73",
    "revision": "14883e59295a0ddee97436f9666633c4"
  }, {
    "url": "exercises/74",
    "revision": "ab3e65636c63936f1181b3b28893a818"
  }, {
    "url": "exercises/75",
    "revision": "7c3843befa1c2a8145d1c8bf53744542"
  }, {
    "url": "exercises/76",
    "revision": "2dcbd79b97de6d295dd6bc2acbabb7af"
  }, {
    "url": "exercises/77",
    "revision": "5928dcc6baedcbedf0b1184347b058e2"
  }, {
    "url": "exercises/78",
    "revision": "4a0b735ed3879aaa7a70638bbf90306f"
  }, {
    "url": "exercises/79",
    "revision": "0fdfc8f6d3eabf7d51c53fec4b87d5c9"
  }, {
    "url": "exercises/8",
    "revision": "f3c3817b977f6b7b8504a4e53cd72f86"
  }, {
    "url": "exercises/80",
    "revision": "ae747c737350dbaa31994e03b02d83ba"
  }, {
    "url": "exercises/81",
    "revision": "4c05eb5d2c4cec26eac96c3435c15667"
  }, {
    "url": "exercises/82",
    "revision": "06829a9ae8f20d25c267cd295524dfd6"
  }, {
    "url": "exercises/83",
    "revision": "d65683f145456fc98f3d9ea94adf450b"
  }, {
    "url": "exercises/84",
    "revision": "c2a5e503f85147ea802719abee32f316"
  }, {
    "url": "exercises/85",
    "revision": "653326d49f4774443e816b8effe322d1"
  }, {
    "url": "exercises/86",
    "revision": "327dbe6e5c94b716b6ac189560698945"
  }, {
    "url": "exercises/87",
    "revision": "3fe78fc56e8cac6c7c9aebff90cbfd7b"
  }, {
    "url": "exercises/88",
    "revision": "e7c3e7395656f65a1dd37409e9759792"
  }, {
    "url": "exercises/89",
    "revision": "f1ef473acd3f085c053f078fee7607ca"
  }, {
    "url": "exercises/9",
    "revision": "3b2f87e0cf9b4da80dd69e2ee9696192"
  }, {
    "url": "exercises/90",
    "revision": "957c02e771e3ffee9073579bf47d3102"
  }, {
    "url": "exercises/91",
    "revision": "9bbf02cbd8e72b608f786459719cae4f"
  }, {
    "url": "exercises/92",
    "revision": "1ff6cf086188ae2ee40a976cb9f3613c"
  }, {
    "url": "exercises/93",
    "revision": "21748e8367833576ca933ca9f0e3104a"
  }, {
    "url": "exercises/94",
    "revision": "f89e48e8ca09e59cf5d98c1463f3bf4b"
  }, {
    "url": "exercises/95",
    "revision": "be27aaaa95f2f20bf878dcbbf488c413"
  }, {
    "url": "exercises/96",
    "revision": "325676d2520f01c8270db92b6e3d0cb1"
  }, {
    "url": "exercises/97",
    "revision": "32f1bf61f3419592232d8fe2d6797f22"
  }, {
    "url": "exercises/98",
    "revision": "03582790e2440a55cbaa062a7b2687b1"
  }, {
    "url": "exercises/99",
    "revision": "658856be035417fa13f6b1313184dc7f"
  }, {
    "url": "/exercises/",
    "revision": "5afc69c81866d31633ab754936f9a2bf"
  }, {
    "url": "manifest.webmanifest",
    "revision": "eed4c1c6b9a0ea833b1e41e7c0642bca"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
