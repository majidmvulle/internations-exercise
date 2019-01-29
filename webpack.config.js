// webpack.config.js
const Encore = require('@symfony/webpack-encore');

Encore
// the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    // the public path you will use in Symfony's asset() function - e.g. asset('build/some_file.js')
    //.setManifestKeyPrefix('build/')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // the following line enables hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())
    // Add react preset
    .enableReactPreset()
    // React Pages Javascript
    // uncomment to define the assets of the project
    .addEntry('js/app', './assets/js/app.js')
    .enableSassLoader()
    // Add style entry
    .addStyleEntry('css/app', './assets/scss/app.scss')
    .enableBuildNotifications()
    .enableSingleRuntimeChunk()
    .configureBabel(function (babelConfig) {
        babelConfig.plugins.push('@babel/plugin-proposal-class-properties');
    })
;
// export the final configuration
module.exports = Encore.getWebpackConfig();