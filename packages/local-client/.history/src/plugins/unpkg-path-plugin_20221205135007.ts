import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});



export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    //find out where the path is
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });

      //load up the file
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React, {useState} from 'react-select'
              console.log(React, useState, ReactDOM);
            `,
          };
          
        // Check to see if we have aldready fetch the file and if it is in cache
        const cachedResult = await fileCache.getItem(args.path)

        // if it is return immediately
        if(cachedResult){
          return cachedResult
        }  

        const { data, request } = await axios.get(args.path);
        

        // console.log(request);
        const result = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        //store response in cache
        await fileCache.setItem(args.path, result )
      });
    },
  };
};
