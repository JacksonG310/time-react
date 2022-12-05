const svgRequire = require.context('@/assets/icons', false, /\.svg$/);
svgRequire.keys().forEach(icon => svgRequire(icon));
