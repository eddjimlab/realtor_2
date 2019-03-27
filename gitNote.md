# Шпаргалка по git

## Установка и настройка
- bew install git
- git --version
- git config --global user.name "Mona Lisa"
- git config --global user.email "mona@Lisa.io

## Инициализация реппозитория
- git init
//необязательно но желательно
- touch README.md
//необязательно
- echo '# HI' >> README.md
- git add
- git commit -m 'init project'

# Добавление изменений в состояние staged
//интерактивное добавление
- git add -i

# Удаление файлов из состояния staged
- git reset path/to/file
# Перевод из modified  в unmodified
- git checkout path/to/file

- git status
## Просмотр содержимого файла
- git cat README.md

## Просмотр истории коммитов
- git log
//выводит непрерывный diff всез изменений по коммитам. + добавленные строки, - удаленные.
f и b перемещение по истории
- git log -p 

## Промотр изменений
- git show 2c082c9   //краткий или полный хэш коммита
//показывает изменения в рабочей копии, но не добавленные для коммита
- git diff

# Удаление данных репо
- git rm

- Забрать изменения одного файла из другой ветки
git  checkout master -- views/partials/header.ejs
- 

