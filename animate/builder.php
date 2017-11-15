<?php
// cat config.json | php -f builder.php
// php -f builder.php < config.json

class Builder
{
    private $configDefault = [
        'output' => false,
        'main' => false,
        'root' => false,
        'devline' => 'THIS-LINE-WILL-DELETED',
        'replaces' => [],
        'mark' => "[[['%s']]]",
    ];

    private $config;

    public function __construct(array $config)
    {
        if (empty($config)) {
            return;
        }

        // merge configs
        $this->config = array_merge($this->configDefault, $config);

        // get layout content for parsing
        $context = file_get_contents($this->config['main']);

        // parse and build $context
        $this->recursiveGetContent($this->config['root'], $context);

        // replace
        $context = $this->replaced($context);

        // delete developer line
        $context = $this->deleteDeveloperline($context);

        // build
        $this->build($context);
    }

    public function build($context) {
        $output = $this->config['output'];
        $dirname = substr($output, 0, strrpos($output, '/'));

        if (!is_dir($dirname)) mkdir($dirname);
        if (!is_file($output)) file_put_contents($output, '');

        if (file_put_contents($output, $context))
            $this->console("[Parser] File {$output} is created.");
        else
            $this->console("[Parser] Error File {$output} not created. Content not find.");
    }

    public function replaced($context) {
        if (!empty($this->config['replaces'])) {
            foreach($this->config['replaces'] as $search => $re)
                $context = str_replace($search, $re, $context);
        }
        return $context;
    }

    public function deleteDeveloperline($context) {
        $contextArr = explode("\n", $context);
        foreach ($contextArr as $i => $str) {
            if (strpos($str, $this->config['devline']) !== false)
                unset($contextArr[$i]);
        };
        return join("\n", $contextArr);
    }

    public function console($data) {
        print_r($data);
        print("\n");
    }

    public function input($sendData, $callback) {
        print($sendData);
        $stdin = fopen("php://stdin", "r");
        $response = trim(fgets($stdin));
        fclose($stdin);
        if (is_callable($callback))
            call_user_func($callback, $response);
    }

    public function recursiveGetContent ($path, &$context) {
        $root = $this->config['root'];
        $markPattern = $this->config['mark'];
        if (is_dir($path)) {
            $files = scandir($path);
            foreach($files as $file) {
                if ($file == '.' || $file == '..') {
                    continue;
                }
                else if (is_file($path.$file) && substr($file, -3) === '.js') {
                    $ctx = file_get_contents($path.$file);
                    $label = ($path === $root ? '' : (substr($path, strlen($root)))) . (substr($file, 0, -3));
                    $mark = sprintf($markPattern, $label);
                    $context = str_replace($mark, $ctx, $context);
                }
                else if (is_dir($path.$file)) {
                    $this->recursiveGetContent($path.$file.'/', $context);
                }
            }
        }
    }

}

$configJSON = stream_get_contents(fopen('php://stdin','r'));

if (!empty($configJSON))
    new Builder(json_decode($configJSON, true));
else
    (new Builder([]))->console('Configuration not find');

