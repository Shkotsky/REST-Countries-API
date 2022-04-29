const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


// module.exports = {
//   css: {
//     loaderOptions: {
//       scss: {
//         additionalData: `@import "@/assets/_variables.scss";` `@import "@/assets/_main.scss"; `
//       }
//     }
//   }
// }