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
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.css$/ });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
        //   args.path
        // );

        // if (cachedResult) {
        //   return cachedResult;
        // }
        const { data, request } = await axios.get(args.path);

        // console.log(args.path);
        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';
        // make the whole page to have no new line, make it a single line
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents =
          fileType === 'css'
            ? `
            const style = document.createElement('style');
            style.innerText = '${escaped}'; 
            document.head.appendChild(style);
          `
            : data;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
