# javascript Lib-Builder


### config.json
```json
{

  "dump":     "build/util.js",

  "layout":   "src/layout.js",

  "root":     "src/",

  "modules": {

    "module_one":    "module_one.js",

    "module_two":    "module_two.js",

    "helper":        "helper.js",

    "static":        "static.js"

  },

  "delete_string_marker" : "// <<< DELETE THIS STRING",

  "replaces" : {
  
    "this string": "to this"
    
  }

}

```


### Run 
```
php -f parser.php
```

