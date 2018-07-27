##

```
nvm use 10
npm start
tsc -w
tsc --outFile output.js ./src/*.ts --module amd
tsc --outFile output.js ./src/*.ts ./src/*/*.ts



tsc --outFile output.js ./src/*.ts ./src/*/*.ts --module amd
nodemon --exec ./node_modules/.bin/ts-node --outFile output.js ./src/*.ts ./src/*/*.ts


    "./node_modules/requirejs/require.js",
```



