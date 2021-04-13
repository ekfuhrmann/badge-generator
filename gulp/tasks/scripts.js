import { src, dest } from 'gulp';
import webpack from 'webpack-stream';
import dotEnv from 'dotenv-webpack';
import yargs from 'yargs';

// Check for --prod or --production flag
const PRODUCTION = yargs.argv.prod;

const scripts = () => {
  return src('src/js/main.js')
    .pipe(
      webpack({
        module: {
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [],
                },
              },
            },
          ],
        },
        mode: PRODUCTION ? 'production' : 'development',
        devtool: !PRODUCTION ? 'inline-source-map' : false,
        output: {
          filename: 'scripts.js',
        },
        // for .env
        plugins: !PRODUCTION ? [new dotEnv()] : [],
      })
    )
    .pipe(dest('dist/assets/js'));
};

export default scripts;
