const path = require('path'); //Permite acceder al file system
const webpack = require('webpack');

module.exports = {
    entry: './public/js/app.js',
    output: {
        filename : 'bundle.js',
        path: path.join(__dirname, './public/dist')
    },
    module: {
        rules: [
            {
                // js
                test: /\.m?js$/, // Va a buscar todos los archivos que sean js en el entry point
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                // sass
            },
            {
                // images
            }
        ]
    }
}