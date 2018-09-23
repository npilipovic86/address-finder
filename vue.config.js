
  module.exports = {
    configureWebpack: {
      devServer: {
        proxy: {
          "/api": {
            target: "https://maps.googleapis.com/maps/",
          }
        }
      }
    }
  }
