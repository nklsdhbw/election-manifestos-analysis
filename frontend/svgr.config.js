// svgr.config.js
module.exports = {
    // Configure the SVGO plugin
    svgoConfig: {
      // Enable/disable SVGO options as needed
      plugins: [
        { removeViewBox: false }, // Keep the viewBox attribute
        { removeXMLNS: true },    // Remove xmlns attributes (removes namespaces)
      ],
    },
  };
  