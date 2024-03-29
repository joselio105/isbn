<?php

$filename = 'cutter.js';
$fileContent = file($filename);
array_shift($fileContent);

$contents = array_map(function ($row) {
    $pattern = "/\[\"(\d+)\"\,\s\"(.+)\"\]/";
    preg_match($pattern, $row, $matches);
    if (key_exists(1, $matches) and key_exists(2, $matches)) {
        return ['code' => $matches[1], 'string' => $matches[2]];
    }
}, $fileContent);

$response = [];
foreach ($contents as $content) {
    if (!is_null($content)) {
        $key = substr($content['string'], 0, 2);
        if (!key_exists($key, $response)) {
            $response[$key] = [];
        }
        array_push($response[$key], "{\"code\": \"{$content['code']}\", \"string\": \"{$content['string']}\"},\n");
    }
}

$jsContent = ['export const cutterTable = {'];
foreach ($response as $key => $array) {
    $strings = implode('', $array);
    array_push($jsContent, "\n\"{$key}\": [\n{$strings}],\n");
}

array_push($jsContent, "\n}\n");

$res = file_put_contents('tableCutter.js', implode('', $jsContent));

echo $res ? 'Arquivo criado com sucesso' : 'Falha ao criar arquivos';
