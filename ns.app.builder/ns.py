#!/usr/bin/python3


import os
import sys
import json

argv = sys.argv[1:]
argv = ['ns.json']

conf = {
    "ns": None,
    "init": None,
    "require.libs": None,
    "require.dependence": None
}

# проверка
if len(argv) != 1 or os.path.isfile(argv[0]) is False:
    print("[Ns.Builder]: Ошибка. Не указан файл конфигурации")
    exit()

print("[Ns.Builder]: Обработка файла конфигурации...")

# чтение файла конфигурации
file_json_conf = open(argv[0], 'r')
build_conf = json.loads(file_json_conf.read())
file_json_conf.close()

# назначение данных
for k, v in build_conf.items():
    conf[k] = v

# проверка
if conf['init'] is None or os.path.isfile(conf['init']) is False:
    print("[Ns.Builder]: Ошибка. Не указан основной путь к файлу init.js")
    exit()

# Парсинг файла init.js
file_init = open(conf['init'], 'r')
init = file_init.read()
file_init.close()



"""
require\s?\(['|"]libs




"""
print(init)