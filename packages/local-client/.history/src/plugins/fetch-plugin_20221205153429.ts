import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        }

        // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
        //   args.path
        // );

        // if (cachedResult) {
        //   return cachedResult;
        // }
        const { data, request } = await axios.get(args.path);

        // console.log(args.path);
        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';
        const contents =
          fileType === 'css'
            ? `
        cosnt style = document.createElement('style');
        style.innerText = 'body {background-color: 'red'}'; 
        document.head.appendChild(style);
        `
            : data;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
