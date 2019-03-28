# Шпаргалка по git

## Установка и настройка
- brew install git
- git --version
- git config --global user.name "Mona Lisa"
- git config --global user.email "mona@Lisa.io

# Инициализация реппозитория
- git init
### необязательно но желательно
- touch README.md
- echo '# HI' >> README.md
### Обязательно
- git add
- git commit -m 'init project'

# Добавление изменений в состояние staged
//интерактивное добавление
- git add -i
//Обновление репо, удалит и добавит все файлы
- git add -u
- git add .
//только конкретный файл
- git add -u [filename]
//Все изменения и удаления и обновления
- git add -A
- git add --all



## Удаление файлов из состояния staged
- git reset path/to/file
# Перевод из modified  в unmodified
- git checkout path/to/file

# Просмотр состояния репо
- git status


## Просмотр содержимого файла
- git cat README.md

# Просмотр истории коммитов
- git log
//выводит непрерывный diff всез изменений по коммитам. + добавленные строки, - удаленные.
f и b перемещение по истории
- git log -p 

# Промотр изменений
- git show 2c082c9   //краткий или полный хэш коммита
//показывает изменения в рабочей копии, но не добавленные для коммита
- git diff

# Получение состояния на момент коммита
- git checkout 2c082c9(индентификатор)

# Удаление данных репо
- git rm

- Забрать изменения одного файла из другой ветки
git  checkout master -- views/partials/header.ejs
- 

# Ветвление
//Показывает где мы находимся
- git branch
//создание и переход на новую ветку
- git checkout -b newName
//Тоже но в две строки
- git brach newName
- git checkout newName

# Слияние
- git checkout master //переход
- git merge new-feature //слияние в новой веткой

# Перемещение коммитов со слиянием
- git rebase //позволяет делать сложные слияния, при этом изменяет другие коммимыт.
***Поэтому не нужно перемещать запушеные коммиты.***


