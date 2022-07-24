Aplikacja do zarzadzania i tworzenia kont bankowych

1.Uruchom w teminalu w folderze glownym komende - [ npm start ]

2.Przejdz pod adres localhost:5000 w wybranej przegladarce.
W przegladarce wyswietli sie wizualne, interaktywne zobrazowanie API, dzieki ktoremu mozesz sprawdzic jakie zapytania wykonac z jaka zawartoscia.

3.Wybierz srodowisko z ktorego dokonasz zapytan (Postman lub autorska witryna)

4.By rozpoczac zarzadzanie aplikacja konieczna jest rejestracja konta - zakladka [ Auth ] - +Register User

5. Nastepnie aplikacja łaczy sie z mikroserwisem, ktory sluzy ze wysylanie maili - w tym przypadku potwierdzajacym rejestracje.

6. Jezeli uda Ci sie zweryfikowac konto przez podany email to mozesz korzystać z dalszych opcji.

7. Aby móc zalożyć nowy rachunek (konto) bankowe konieczne jest uzupełnienie danych o posiadaczu konta.

8. Bank branches - odzzialy bankowe sa z gory zadeklarowane, nie mozna zalozyc konta z blednym oddzialem. Istnieja brancze o identyfikatorach:
   720, 468, 620, 711, 371, 000 - bank centralny, uzywane przy zakladaniu kont online

9. Drogi:
   [Account Holder] +Get All Account Holders With Account's Statistics
   są dostepnę wyładnie dla kont [ admin ] - obecnie pierwsze zalozone konto uzytkownika, lub mozna nadac role administratora manualnie

10. Wszystkie requesty oprocz [register & login], wygeneruja pozytywna odpowiedz tylko jezeli jestes w sesji - jestes zalogowany.
