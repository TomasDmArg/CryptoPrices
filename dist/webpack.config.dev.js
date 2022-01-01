"use strict";

// Webpack uses this to work with directories
var path = require('path'); // This is the main configuration object.
// Here, you write different options and tell Webpack what to do


module.exports = {
  entry: "./js/index.js",
  output: {
     filename: "bundle.js",
     path: path.resolve("dist")
  },
  module: {
     rules: [
        {
           test: /\.(js|jsx)$/,
           exclude: "/node-modules/",
           use: "babel-loader"

        },
        {
           test: /\.html$/,
           use: "html-loader"
        },
        {
           test: /\.(scss|sass)$/,
           use: ["style-loader", "css-loader", "sass-loader"]
        }
     ]
  }

}