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
    "url": "_app/immutable/assets/2.6af22f8c.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/ReloadPrompt.8b6f04a5.css",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.acb917aa.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.c28e20b1.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/paths.fd779d26.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.753a1c0d.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.b32d36ee.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.76e3cd1c.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.0041ce51.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.df6d8713.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.b7062e55.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.24d816bf.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.7a10d9e3.js",
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
    "revision": "4149128a4a4f14ac27b9c9a9a70641f5"
  }, {
    "url": "exercises/10",
    "revision": "506e3408ec18ddf56f92336d0c6c57f2"
  }, {
    "url": "exercises/100",
    "revision": "7fdcd448edc4c3a5a6adfb889cf5dd1d"
  }, {
    "url": "exercises/101",
    "revision": "6a2b198b3979b5c6073ec90a1fcf9e55"
  }, {
    "url": "exercises/102",
    "revision": "d60c8290e2c3d47ac990e001ab9e2304"
  }, {
    "url": "exercises/103",
    "revision": "d19fe0d68e7b29e379428f7302acf23c"
  }, {
    "url": "exercises/104",
    "revision": "ae2c4ceb09af9db9cb4705b089767ea4"
  }, {
    "url": "exercises/105",
    "revision": "80e1917cd93a2e083875beffc76cccd9"
  }, {
    "url": "exercises/106",
    "revision": "e999183c208ea030c93bb5557f59a2bf"
  }, {
    "url": "exercises/107",
    "revision": "fd62248a40ccf5b483ee5cab4f2e7555"
  }, {
    "url": "exercises/108",
    "revision": "0f64956ec9b18120cedca029dd6609cb"
  }, {
    "url": "exercises/109",
    "revision": "4a0dc966a7a9f89a30903016c9d02abb"
  }, {
    "url": "exercises/11",
    "revision": "a81b8a89fb5409549a8ce432726a4d99"
  }, {
    "url": "exercises/110",
    "revision": "ecb62c57c43d6c8d212c83091ad25824"
  }, {
    "url": "exercises/111",
    "revision": "28bf555a812cf005e47fd9e9e13ddbcb"
  }, {
    "url": "exercises/112",
    "revision": "5c6c25c2a7f30cf88c7cd5ddeb98bf5c"
  }, {
    "url": "exercises/113",
    "revision": "60ba5144b607d4011b1b05cf09fe2581"
  }, {
    "url": "exercises/114",
    "revision": "2514fa1999cd9782049eb0a04b549bd2"
  }, {
    "url": "exercises/115",
    "revision": "c021ce03030d82bffcdcd375a23a380b"
  }, {
    "url": "exercises/116",
    "revision": "961567c4e0c53692e9ee77bbb3654f75"
  }, {
    "url": "exercises/117",
    "revision": "914e28464c0781b9764b972b3dee179e"
  }, {
    "url": "exercises/118",
    "revision": "905335ac6856e4dd97952cf23403e4e4"
  }, {
    "url": "exercises/119",
    "revision": "e70bd28127609ebde99683e423779a71"
  }, {
    "url": "exercises/12",
    "revision": "b7e5db13b31c6a817cd9ae21decd1832"
  }, {
    "url": "exercises/120",
    "revision": "6765e5619c342a27ec5c844f51105ccf"
  }, {
    "url": "exercises/121",
    "revision": "82cae5ccaf7372516388aa7b8064ba7d"
  }, {
    "url": "exercises/122",
    "revision": "6b080cd1eee2cce0922fcc291634741b"
  }, {
    "url": "exercises/123",
    "revision": "b56fbb7110914c0b0645da7d2fe4a5c1"
  }, {
    "url": "exercises/124",
    "revision": "ce2383c2640d295c73814c17f7d8a3c1"
  }, {
    "url": "exercises/125",
    "revision": "45054fa484e5e1ed3e31b695f02f9f42"
  }, {
    "url": "exercises/13",
    "revision": "8a4ec3ed92d007b7097154ca5d83851f"
  }, {
    "url": "exercises/14",
    "revision": "f82c11441bcf41681d3884bed1df793f"
  }, {
    "url": "exercises/15",
    "revision": "b81f72de1e3e98e8c0c7fdc44314c6fd"
  }, {
    "url": "exercises/16",
    "revision": "8995537e332b7de69e3a10ca0f82fe39"
  }, {
    "url": "exercises/17",
    "revision": "0a9223f4a9e044616bb3846dc77c32ed"
  }, {
    "url": "exercises/18",
    "revision": "c64598f2c219d6bc2726835e12e1f446"
  }, {
    "url": "exercises/19",
    "revision": "3e839cd2556e2eca2f11ff75595f5d06"
  }, {
    "url": "exercises/2",
    "revision": "bb9d7ce771853c69d2a98523c7ce4048"
  }, {
    "url": "exercises/20",
    "revision": "ab1b31a190f64e58a33d69740d96f798"
  }, {
    "url": "exercises/21",
    "revision": "dba840ad40a639a5b88d1db40d91323a"
  }, {
    "url": "exercises/22",
    "revision": "3a71a397aab0af85981556ee28b1e454"
  }, {
    "url": "exercises/23",
    "revision": "16152638a6981b45ccf077a06c626e6e"
  }, {
    "url": "exercises/24",
    "revision": "f7f65bac1926147e8081219228f79292"
  }, {
    "url": "exercises/25",
    "revision": "3b06a3f2e1d7560663e6d4af4d838825"
  }, {
    "url": "exercises/26",
    "revision": "06f3502865e1c27d28c818a0a8f9b89b"
  }, {
    "url": "exercises/27",
    "revision": "0360d407294a1338c7aeccf82b847cc8"
  }, {
    "url": "exercises/28",
    "revision": "c822f45f765b1763e13d4e40bdff611a"
  }, {
    "url": "exercises/29",
    "revision": "c6da88da60e27ef12dd2a04e5faa3093"
  }, {
    "url": "exercises/3",
    "revision": "0ddae4138d387c387e0633fee24991de"
  }, {
    "url": "exercises/30",
    "revision": "85357fe9762bcffd183d0e8c4f9f9c4e"
  }, {
    "url": "exercises/31",
    "revision": "a2e0a5a4c947c541e33dc9ed7b3caad1"
  }, {
    "url": "exercises/32",
    "revision": "0d0e5d41e134672a332d8c52ca0d26c9"
  }, {
    "url": "exercises/33",
    "revision": "fba3ab30f94c1fa5aa4ed004d4f1f392"
  }, {
    "url": "exercises/34",
    "revision": "160abb40ca1a3f54ebec7eaffd9b6e48"
  }, {
    "url": "exercises/35",
    "revision": "e46df262d95f79c03d2db7011ff124a4"
  }, {
    "url": "exercises/36",
    "revision": "a7c79d6761372d3cf980d347e6b4193a"
  }, {
    "url": "exercises/37",
    "revision": "656f3ffb4d54e85481542b03e9ac33a6"
  }, {
    "url": "exercises/38",
    "revision": "b2c6c0c111dc7c37b339e2defe874d54"
  }, {
    "url": "exercises/39",
    "revision": "ab733fd23e838db25b7da67d7f14cc7b"
  }, {
    "url": "exercises/4",
    "revision": "7170faccd1ed70ed19b191d9693f4911"
  }, {
    "url": "exercises/40",
    "revision": "c3b07856cd4b6b4514c0d322e043c187"
  }, {
    "url": "exercises/41",
    "revision": "8f21c8f339dff9fc51c5fe30e33050b8"
  }, {
    "url": "exercises/42",
    "revision": "914f2f93f90d4154374c17b6eb40c61b"
  }, {
    "url": "exercises/43",
    "revision": "ec679e1eab6271f833adfdbc4360056a"
  }, {
    "url": "exercises/44",
    "revision": "735d380175b8fdb7f350f473e662670b"
  }, {
    "url": "exercises/45",
    "revision": "153d1f195af0c038bb050dd95e002669"
  }, {
    "url": "exercises/46",
    "revision": "87dcfc47cec88721dda51339e756f485"
  }, {
    "url": "exercises/47",
    "revision": "6d5285d36a02a1e150bc4b5ce9023936"
  }, {
    "url": "exercises/48",
    "revision": "d8eddee48ab8e230edb2e7f6e8494ebc"
  }, {
    "url": "exercises/49",
    "revision": "4c53cbe4396cdeb5d0eb4598d85c4239"
  }, {
    "url": "exercises/5",
    "revision": "dc474371ed5041c54a46746c9a430d8c"
  }, {
    "url": "exercises/50",
    "revision": "48924cc63bcab40128df168e735e2c79"
  }, {
    "url": "exercises/51",
    "revision": "1fda1868212c92b7d26eedac6c8042f8"
  }, {
    "url": "exercises/52",
    "revision": "9df995e7203f4084f94e71d85b66a5cf"
  }, {
    "url": "exercises/53",
    "revision": "74aab3117e94b99277ae01b105434379"
  }, {
    "url": "exercises/54",
    "revision": "b598fa947d21dd286e5e18829cb2fb80"
  }, {
    "url": "exercises/55",
    "revision": "0fc753a5fda4b2ae0bc3bdff3da371cb"
  }, {
    "url": "exercises/56",
    "revision": "2e39f6a6df3158f9b2d082ea91c3333d"
  }, {
    "url": "exercises/57",
    "revision": "807bb6cda1c8533b7607181b7d8e3a2c"
  }, {
    "url": "exercises/58",
    "revision": "330f8cf14879410837387c0a29b45906"
  }, {
    "url": "exercises/59",
    "revision": "7f3e0aea84e27f7c295d2d4c81f30a61"
  }, {
    "url": "exercises/6",
    "revision": "326ea172e1d102ac82a0e92797c09021"
  }, {
    "url": "exercises/60",
    "revision": "fe7039453a88f762ed0ed76dccfd7908"
  }, {
    "url": "exercises/61",
    "revision": "2d001ecfe51d1b80014a7b04ee86af19"
  }, {
    "url": "exercises/62",
    "revision": "da8f9fad84bdce05db2f3f19ca296ed9"
  }, {
    "url": "exercises/63",
    "revision": "e7c4b6e40427e8086cf756fb5424a4f0"
  }, {
    "url": "exercises/64",
    "revision": "c86ec541dd3e48c484031e3a2c74418a"
  }, {
    "url": "exercises/65",
    "revision": "5792adbf0e93128e5923add65e2dd795"
  }, {
    "url": "exercises/66",
    "revision": "a506e13bae55dcd6c899626c7fee78df"
  }, {
    "url": "exercises/67",
    "revision": "9cf02114140605b8eda64ba4fbdc04ff"
  }, {
    "url": "exercises/68",
    "revision": "6c2d3e2c8fe2a425441fdd30d5624fb5"
  }, {
    "url": "exercises/69",
    "revision": "593982cf9c0dbc809fe9813897eb6b8a"
  }, {
    "url": "exercises/7",
    "revision": "ccc0c26ed0cf749663ec4326abcb69fc"
  }, {
    "url": "exercises/70",
    "revision": "ff4fe94d80fe95d1b9576f4956dab5ec"
  }, {
    "url": "exercises/71",
    "revision": "3163b7ef665ffc5cb4ed7fda1365542c"
  }, {
    "url": "exercises/72",
    "revision": "d36cf78ab1682b53122f97e67635a06f"
  }, {
    "url": "exercises/73",
    "revision": "913e4c410643660a0b3bcaa7df502485"
  }, {
    "url": "exercises/74",
    "revision": "7d65e05c5b7ba8685e0fbdc5a83979c1"
  }, {
    "url": "exercises/75",
    "revision": "be90eeee52a8557e6faf1cf22816baf9"
  }, {
    "url": "exercises/76",
    "revision": "a718627626c38eb3d14d1935ee094bb9"
  }, {
    "url": "exercises/77",
    "revision": "647a71cb0347079427046f5f5a35f460"
  }, {
    "url": "exercises/78",
    "revision": "18e8fd660c9ffc0aaed5eb100c006ab6"
  }, {
    "url": "exercises/79",
    "revision": "a37c12160c6ac84bd89cdf497947777f"
  }, {
    "url": "exercises/8",
    "revision": "b354f5646bbc800d14ebe3c1428ba8a2"
  }, {
    "url": "exercises/80",
    "revision": "17caa9b6a3243661b92cb5222a576496"
  }, {
    "url": "exercises/81",
    "revision": "79938063fd0d59dff5c485bd2f6e02ee"
  }, {
    "url": "exercises/82",
    "revision": "ff0fead0d3fd40decc107a31305e45b1"
  }, {
    "url": "exercises/83",
    "revision": "36263665592a5b80e46bcce91f04eb79"
  }, {
    "url": "exercises/84",
    "revision": "68535e4e69c88adec955836745a28a00"
  }, {
    "url": "exercises/85",
    "revision": "823cb912a2ceef1df4a990c15509fb3a"
  }, {
    "url": "exercises/86",
    "revision": "6b140b7e86e18174869b78f2e23606f9"
  }, {
    "url": "exercises/87",
    "revision": "d78cd2a0228aa934bc41a28c665470fd"
  }, {
    "url": "exercises/88",
    "revision": "2965f0d6653f605de7686567ba25353a"
  }, {
    "url": "exercises/89",
    "revision": "f13e1fa60b741d81d906f6cf769cdd0a"
  }, {
    "url": "exercises/9",
    "revision": "20d4441dfab13b5a13d6f2e864edfa8d"
  }, {
    "url": "exercises/90",
    "revision": "de7b01eca22c5e783ac49d67cf916a8c"
  }, {
    "url": "exercises/91",
    "revision": "a19f83ea757b94fedaa424cdba629692"
  }, {
    "url": "exercises/92",
    "revision": "412891dff13ef62b9a81703055782eae"
  }, {
    "url": "exercises/93",
    "revision": "1a310ca26e3e4dfd161fbc844bacf9da"
  }, {
    "url": "exercises/94",
    "revision": "ad0a562c05355469fc4a74cafad92804"
  }, {
    "url": "exercises/95",
    "revision": "2334edabc256acc248a61c74efa5e2ee"
  }, {
    "url": "exercises/96",
    "revision": "b400e969b5873118aa1c58a41169cc4a"
  }, {
    "url": "exercises/97",
    "revision": "f88e792e3d28a1c67056a41349a125d9"
  }, {
    "url": "exercises/98",
    "revision": "03d5e58139b2d4720adf57df3959bc8f"
  }, {
    "url": "exercises/99",
    "revision": "ab48bd9f5defdf7649f772adc3faf839"
  }, {
    "url": "/exercises/",
    "revision": "cbd221ed29dea93b0225cc2a3b72c925"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
