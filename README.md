# TFS InvestSandbox

Курсовой проект, Tinkoff Fintech School, Spring 2021. Веб-приложение, позволяющее создавать виртуальные инвестиционные портфели и анализировать различные стратегии инвестирования.

## Инструкция по запуску
1. Должен быть установлен Docker. Перейти в папку docker проекта и запустить команду:
`docker-compose up --build`. Если линукс, запускать через `sudo`. Сборка проекта займет около 5-6 минут.
2. Запустить браузер с отключенным CORS. Для Google Chrome создать ярлык приложения и в месте, где ярлык находится, запустить команду:
`./<название ярлыка>.lnk --disable-web-security --disable-gpu --user-data-dir=<абсолютный путь к любой папке, в которой будет создано окружение браузера, этой папки на момент команды может и не быть, она будет создана>`
3. После окончания сборки проекта, перейти по адресу localhost:4201
