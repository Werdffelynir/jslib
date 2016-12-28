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
```bash
cd /path/to/builder
php -f parser.php
```



### Run watcher
```bash
cd /path/to/builder
python3 watcher.py 
```

#### Config
```python3

FNAME = "/var/www/test.loc/js_lib_builder/sources"
SYSCOMMAND = 'php -f /var/www/test.loc/js_lib_builder/parser.php'

```


