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
    "url": "_app/immutable/chunks/paths.8b69d95f.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.b2dc85db.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.d61e32ff.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.39680ca0.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.1a44aa4f.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.62d6392b.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.27edaba5.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.3f14cf10.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.f220473e.js",
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
    "revision": "34e5650669e60ddca8f9e873e656c289"
  }, {
    "url": "exercises/10",
    "revision": "077604957b64a445082d0e7c0fb04c20"
  }, {
    "url": "exercises/100",
    "revision": "f03c5ded26bac4cfed8ee9e48ba53a87"
  }, {
    "url": "exercises/101",
    "revision": "e9f2a890eee376c34f214f2789c1c5d9"
  }, {
    "url": "exercises/102",
    "revision": "0aaff72b4422fb605777b63bd0abfa1d"
  }, {
    "url": "exercises/103",
    "revision": "c241a8bf10370aceca6493565ca2692e"
  }, {
    "url": "exercises/104",
    "revision": "1972b24e27d97e5f2fa52235ff578fc0"
  }, {
    "url": "exercises/105",
    "revision": "1b84b9319a6f94a4b091837c6ecf98b2"
  }, {
    "url": "exercises/106",
    "revision": "e8f2973644d0081dc4e9dbfbcb47d84c"
  }, {
    "url": "exercises/107",
    "revision": "80a6ec33d08aa9090f0c819f88f83e72"
  }, {
    "url": "exercises/108",
    "revision": "8eb2ecdabb6699c863df06149260f73c"
  }, {
    "url": "exercises/109",
    "revision": "9e2dc71fa5ba3f4bdb6c64bb5c34eff1"
  }, {
    "url": "exercises/11",
    "revision": "e44e373c77d4881a2b81a8b6b9ac123e"
  }, {
    "url": "exercises/110",
    "revision": "14e6a82cb38708519b5a9a291c5875eb"
  }, {
    "url": "exercises/111",
    "revision": "1ec43ade80259ce72bddc56596c039bd"
  }, {
    "url": "exercises/112",
    "revision": "9cc9e1363ebdff2e32b92fec83c31aa0"
  }, {
    "url": "exercises/113",
    "revision": "841e6c71803891ef71b9c7d0d19e8bfd"
  }, {
    "url": "exercises/114",
    "revision": "52e6e6757b4753c7df4b5cffaeb99553"
  }, {
    "url": "exercises/115",
    "revision": "be1dfd211e83eb24d0ec3c478ae18c16"
  }, {
    "url": "exercises/116",
    "revision": "cc75f9f350aa136937fb875b0f900317"
  }, {
    "url": "exercises/117",
    "revision": "9ce17f28e874e8e72bfafcab84fdb0fb"
  }, {
    "url": "exercises/118",
    "revision": "b701548436de5ca28d710c7e2de404e6"
  }, {
    "url": "exercises/119",
    "revision": "d50bf51023e2c96e0c5f3522868f535c"
  }, {
    "url": "exercises/12",
    "revision": "81c460eedf56bde8f441338417cdfbbd"
  }, {
    "url": "exercises/120",
    "revision": "4b019e3f00ec2c960b02bdbec307326c"
  }, {
    "url": "exercises/121",
    "revision": "80821a4ada3eb9f75f2d009b11e2878f"
  }, {
    "url": "exercises/122",
    "revision": "c10c850e69de6791b108c03affb01ec9"
  }, {
    "url": "exercises/123",
    "revision": "3d4666302aa53eecfc46885d0a4137dc"
  }, {
    "url": "exercises/124",
    "revision": "8ac2445ce060843a57a8c8a38d8ce0bc"
  }, {
    "url": "exercises/125",
    "revision": "95464669f1ae42ca8ffbd8f53850e872"
  }, {
    "url": "exercises/13",
    "revision": "43ee368b141709e9ae2bb0287485615b"
  }, {
    "url": "exercises/14",
    "revision": "10766b775bfb423fbb2d0815e1fffba5"
  }, {
    "url": "exercises/15",
    "revision": "5a222133ed48fb85be2496b46f78a3fc"
  }, {
    "url": "exercises/16",
    "revision": "10fce074852c71cd67f99c98c9077ac1"
  }, {
    "url": "exercises/17",
    "revision": "0e3a66df927d58460855a8d66574cbda"
  }, {
    "url": "exercises/18",
    "revision": "d0b4980ae8deae557ef312c670f4683a"
  }, {
    "url": "exercises/19",
    "revision": "31d58559d838c66bcbc57279299671ad"
  }, {
    "url": "exercises/2",
    "revision": "b1736fbe05e4c3968934cef646c34975"
  }, {
    "url": "exercises/20",
    "revision": "eac739bbb91a9fb63ec9fbd2f1e30557"
  }, {
    "url": "exercises/21",
    "revision": "2fc1e45274fbd8d70674b889fc1d6411"
  }, {
    "url": "exercises/22",
    "revision": "173ab2533144b86d7b9cd51ce59a49a7"
  }, {
    "url": "exercises/23",
    "revision": "a911c01cbbd75309d47ddecb66415da3"
  }, {
    "url": "exercises/24",
    "revision": "95027e42c047afbe6d7efb5fc345cab2"
  }, {
    "url": "exercises/25",
    "revision": "7f09cbd29996e5f29c1ed687c1fe613e"
  }, {
    "url": "exercises/26",
    "revision": "5234f9f28bddd1bc1a1a26a50666bdc4"
  }, {
    "url": "exercises/27",
    "revision": "c071068275c41f203bffb4a56db2216a"
  }, {
    "url": "exercises/28",
    "revision": "c6484d9b72d4de99790daba4d92d2105"
  }, {
    "url": "exercises/29",
    "revision": "33ce8e796e6839cc3a572f9835fa6564"
  }, {
    "url": "exercises/3",
    "revision": "790fccc24fff2299683f9368fff7a2c5"
  }, {
    "url": "exercises/30",
    "revision": "8020cae461a5e9ecd8992c77db20ceab"
  }, {
    "url": "exercises/31",
    "revision": "d5796bdb9e1d46c810acd834118fe37f"
  }, {
    "url": "exercises/32",
    "revision": "824db1f0892d1e60bec7ad1a0681177c"
  }, {
    "url": "exercises/33",
    "revision": "30204add391977a62ec6eaafdffa0508"
  }, {
    "url": "exercises/34",
    "revision": "9d0f7fa7ebe2c544c8ff8c3830bff157"
  }, {
    "url": "exercises/35",
    "revision": "adc00e8afe0e05fe12183c8413d83e66"
  }, {
    "url": "exercises/36",
    "revision": "b9133941ff6e398f4f3f5abe584fbaa9"
  }, {
    "url": "exercises/37",
    "revision": "35ff1ad7af44fd3b6605ce9a7c4b9e8e"
  }, {
    "url": "exercises/38",
    "revision": "610f247286b247048c4941671fc777ed"
  }, {
    "url": "exercises/39",
    "revision": "fad537cbbbab742e4fb420bb1d6e130d"
  }, {
    "url": "exercises/4",
    "revision": "54ef1e8ebb23f214ffdabe254c89d3ff"
  }, {
    "url": "exercises/40",
    "revision": "86c0716043cd1f88a68e6f6d0ee70d92"
  }, {
    "url": "exercises/41",
    "revision": "2defbc54768cea8a9e65b62f496175f0"
  }, {
    "url": "exercises/42",
    "revision": "53072bdfd8bc14d4371232866c23b52c"
  }, {
    "url": "exercises/43",
    "revision": "12ce17fe178d7f825bf1f7fbe4f84607"
  }, {
    "url": "exercises/44",
    "revision": "ab2a66fe0598ff6264c97926a14cce06"
  }, {
    "url": "exercises/45",
    "revision": "0440684e189b2622952d1a49d1c1d205"
  }, {
    "url": "exercises/46",
    "revision": "0b1dc462cb68d281741fcb8569d90177"
  }, {
    "url": "exercises/47",
    "revision": "44a04569f76bb627d9ac6572cc37526f"
  }, {
    "url": "exercises/48",
    "revision": "a678d6f656a018553ba25f93fbef7b79"
  }, {
    "url": "exercises/49",
    "revision": "385312a63573f9e6f6869f291a69b103"
  }, {
    "url": "exercises/5",
    "revision": "59501d4906c85febb22f71e2b666f257"
  }, {
    "url": "exercises/50",
    "revision": "87059e48df1ed5ab129d851c64051128"
  }, {
    "url": "exercises/51",
    "revision": "3667cd287270bc54135daf4396563e4f"
  }, {
    "url": "exercises/52",
    "revision": "07fc8d59da242be925129d6f425a35ae"
  }, {
    "url": "exercises/53",
    "revision": "476dbf8588370ffdac81998bea37701e"
  }, {
    "url": "exercises/54",
    "revision": "e0115e0babc07c2fa331c5a2775b2b70"
  }, {
    "url": "exercises/55",
    "revision": "f8314b80ece7d08f124d38c8711c77f2"
  }, {
    "url": "exercises/56",
    "revision": "8ac794b1aaf08928627ecb831eee45ee"
  }, {
    "url": "exercises/57",
    "revision": "21cae7339b58cec7a0e7da070b97a113"
  }, {
    "url": "exercises/58",
    "revision": "79ab5f01d754cc399db327580323b41c"
  }, {
    "url": "exercises/59",
    "revision": "735f6d14a30733a90acf3f1208406049"
  }, {
    "url": "exercises/6",
    "revision": "1e94e66a2aa26118fc8c8dbd3c9188ee"
  }, {
    "url": "exercises/60",
    "revision": "2bdef78121ec6aab64d239d6f5f01bcf"
  }, {
    "url": "exercises/61",
    "revision": "6e877f62b01897248b865637527a02a4"
  }, {
    "url": "exercises/62",
    "revision": "3c9a75d2c28eb1cca09ace08ca5d2a7d"
  }, {
    "url": "exercises/63",
    "revision": "693f3f21e5c47f9a297a5a8bc278fb10"
  }, {
    "url": "exercises/64",
    "revision": "65fa04b09ab707580b3ddfc0b6724283"
  }, {
    "url": "exercises/65",
    "revision": "d5310136933d44bce668b63a1dcb3ba1"
  }, {
    "url": "exercises/66",
    "revision": "c3666459883edf5b7dc0499cd81ec573"
  }, {
    "url": "exercises/67",
    "revision": "61a9ab316c5f59e5964f74f72d2b52e8"
  }, {
    "url": "exercises/68",
    "revision": "93920819555070a42e9bf6dc0f098345"
  }, {
    "url": "exercises/69",
    "revision": "1eb7f36ee6a1334f9ce9c7612439e4f6"
  }, {
    "url": "exercises/7",
    "revision": "ba64032c5fe2a6e4ecfbfc0198020984"
  }, {
    "url": "exercises/70",
    "revision": "44458f19b3c49747c5bb6918d67f8620"
  }, {
    "url": "exercises/71",
    "revision": "1158630ffdf3bfe52c93e756015eeeb1"
  }, {
    "url": "exercises/72",
    "revision": "dc79f13b57745121f8e1d0241f1abdcc"
  }, {
    "url": "exercises/73",
    "revision": "dc662437d3cc5c477e095836220fe272"
  }, {
    "url": "exercises/74",
    "revision": "5745ada613978a49b41eb0281499af5e"
  }, {
    "url": "exercises/75",
    "revision": "643cf00067d26da661e68ca62179aae4"
  }, {
    "url": "exercises/76",
    "revision": "adebfc0270ea4e58ca77a5c80d96a422"
  }, {
    "url": "exercises/77",
    "revision": "c0999265ab4c2d2025b2d6e623896fcf"
  }, {
    "url": "exercises/78",
    "revision": "7d667b1deb5578b63e20d747b9800f29"
  }, {
    "url": "exercises/79",
    "revision": "f6beef4078273de9c4a25d2a1648df8e"
  }, {
    "url": "exercises/8",
    "revision": "319cebfca4d0cdf6680196e2878e1598"
  }, {
    "url": "exercises/80",
    "revision": "275ec3bb921462879e03390aa6f64958"
  }, {
    "url": "exercises/81",
    "revision": "bf5b1360be51ac36b860a77acf128f04"
  }, {
    "url": "exercises/82",
    "revision": "a21538bffe5f76fc7e0bc8044faf5d3a"
  }, {
    "url": "exercises/83",
    "revision": "dbe090721b6438abd128c9df113a90ac"
  }, {
    "url": "exercises/84",
    "revision": "e418790fecdddc99e7bc7ff04eb06f81"
  }, {
    "url": "exercises/85",
    "revision": "735d88e7a61c97e0c48c3776206475cd"
  }, {
    "url": "exercises/86",
    "revision": "dab8fdb2eb2b2787a2d98a8c533acfdd"
  }, {
    "url": "exercises/87",
    "revision": "e166018e3692f088fe70d8ba4a452b06"
  }, {
    "url": "exercises/88",
    "revision": "07719029463416dd3ef21898e32b1529"
  }, {
    "url": "exercises/89",
    "revision": "60f4fa7b1457a2725390b152731d605f"
  }, {
    "url": "exercises/9",
    "revision": "ce3f60a97440ea264ee3fd789d1ad202"
  }, {
    "url": "exercises/90",
    "revision": "7fc9949ac85590c3d870b0eb79d9b08d"
  }, {
    "url": "exercises/91",
    "revision": "c329841aaf929480748d6643af5da475"
  }, {
    "url": "exercises/92",
    "revision": "f48264737d7a867769b6e583d69a0867"
  }, {
    "url": "exercises/93",
    "revision": "74068ac5afc61042dafbb7014b48c3aa"
  }, {
    "url": "exercises/94",
    "revision": "63b6330259868215f7b44c9f9dcfff8f"
  }, {
    "url": "exercises/95",
    "revision": "fd665dab17d2a0eca936723b93e76222"
  }, {
    "url": "exercises/96",
    "revision": "934b46a8fcb02b3f0955399e47513e63"
  }, {
    "url": "exercises/97",
    "revision": "637bb301294cf00b7247dbc9c9ec748d"
  }, {
    "url": "exercises/98",
    "revision": "6ac734e8622b11e048b0957d0ec1477f"
  }, {
    "url": "exercises/99",
    "revision": "0cb7fd8a4b6310b9cf66221390f012f9"
  }, {
    "url": "/exercises/",
    "revision": "b49064a10b230d55d9c5241d1d017a03"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
