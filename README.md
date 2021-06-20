# Lista zadań

- [X] Tworzenie nowego użytkownika (hashyshowanie hasła) **Marcin**

- [x] Polskie i z małej litery role użytkowników **Błażej**

- [X] Zmiana hasła użytkownika w panelu **Marcin**

- [ ] Sprawdzić raporty (powtarzają się na latach) **Błażej**

- [x] Ujemne wartości w zasobach **Wojtek**

- [ ] Przy dodawaniu usługi parent jest zawsze null **Kamil i Marcin**

- [X] Nie działa przycisk aktualizacji w liście usług **Marcin**

- [ ] Nowy element dodał się jako null w usługach a wyświetla cenę **Kamil**

- [ ] Cena się nie dodaje przy dodawaniu nowej usługi **Kamil**

- [ ] Zmiana pól w usłudze nie powoduje aktualizacji w bazie danych (nazwy zmiennych w jsonie) **Kamil**

- [ ] Sprawdzić czy pracownik może edytować usługę **Marcin**

- [x] RegistryList.js:128 - TypeError: Cannot read property 'selectedIndex' of null **Błażej**

- [x] Po dodanie usługi do realizacji a potem po jej usunięciu obiekt dodaje się do bazy danych, ale nie wyświetla się na stronie bo nie ma go w registry_services

- [ ] Wybieranie usług przy dodawaniu realizacji (dodaje się cała podkategoria)

- [X] Zakończone realizacje muszą mieć disabled button do zamykania **Marcin**

# Rzeczy do sprawka

## Analiza zadania

Zagadnienie przedstawia problem komunikacji aplikacji frontendowej z aplikacją backendową.

## Struktury danych

Na frontendzie używamy klasowych komponentów Reactowych. Na backendzie stosujemy plik główny app.js który posiada routingi adresów API do poszczególnych plików w katalogu routes. Każdy z plików posiada implementację którejś (lub kilku) z metod: get, post, patch, put, itd.

## Algorytmy

Aplikacja frontendowa wymienia dane z backendem każdorazowo przy jakiejkolwiek wprowadzonej zmianie. Nie mamy w sumie za bardzo skomplikowanych algorytmów XD

## Pliki źródłowe

**backend/modules/database.js** - definiuje połączenie z bazą danych

**backend/modules/role-check.js** - algorytm sprawdzający czy użytkownik posiada wymaganą rolę

**backend/routes/x** - każdy z tych plików odpowiada za obsługę endpointów o tej samej nazwie, nie ma sensu za bardzo żeby opisywać z osobna XD

**backend/app.js** - główny plik startowy aplikacji serwera w którym definiujemy parametry, podpinamy routingi, itp.

**frontend/public/x** - wszystkie te pliki są dostępne na stronie, np. **index.html** w którym podpinamy się do reactowego skryptu

**frontend/src/components/x** - każdy z plików odpowiada za opis kolejnego panelu albo komponentu, nie ma sensu się rozpisywać

**frontend/src/panels/ReportPanel.js** - opisuje widok panelu z raportami, pobiera dane o istniejących raportach i umożliwia ich sprawdzenie

**frontend/src/App.js** - komponent aplikacji który służy jako root wszystkich komponentów

**frontend/src/index.js** - plik z którego startuje React
