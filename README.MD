Aplikacja do zarzadzania i tworzenia kont bankowych

1. Sposob dzialania
   Aplikacja dla klientow bankowych. Pozwala na:

   - tworzenie konta uzytkownika oraz nowego posiadacza konta
   - logowanie i wylogowanie z/do serwisu
   - zakladanie nowych kont bankowych krajowych i walutowych
   - obsluga wplat i wyplat
   - obsluga transferow wewnetrznych wsrod uzytkownikow banku i zewnetrznych
     Aby miec dostep do funkcji serwisu podanych powyzej, zaczynajac od logowania wymagana jest weryfikacja konta, przez odwiedzenie linku zawartego w przychodzacej wiadomosci email.

2. Podzial aplikacji

   - controllers:
     - authController - obsluga rejestracji, logowania i wylogowania,
     - userController - zwraca obecnie zalogowanego uzytkownika,
     - accountHolderController - uzupelnienie wymaganych informacji o wlascicielu kont bankowych i obsluga tworzenia kont bankowych krajowych i walutowych,
     - accountController - obsluga tranzakcji - wplaty, wyplaty, przelewy oraz prezentacja istniejacych kont bankowych
   - db: tworzenie polaczen z bazami danych
   - errors: customowe bledy
   - middleware: obsluga bledow i przekierowan na nieistniejace adresy oraz uwierzytelnianie i autoryzacja uzytkownikow
   - models: modele oparte na schematach mongoose, opisuja dokumenty mongoDB, ktore beda tworzone w kontrolerach
   - routers: laczy funkcjonalnosc zawarta w kontrolerach z adresami url
   - services:
     - accountNoGenerator - generowanie nowego numeru bankowego
     - checkIfBankAccountIsValid - sprawdzenie czy zewnetrzny numer bankowy jest prawdziwy
     - checkIfBankBranchExists - sprawdz czy galaz bankowa istnieje
     - performExternalTransactions - obsluga tranzakcji przelewow miedzy dwoma kontami
   - utils:
     - checkIfItsAccountHolder - sprawdz, czy uzytkownik jest wlascicielem konta bankowego
       - checkPermissions - sprawdz czy uzytkownik ma dostep do danych (czy jest wlascicielem lub kontem administratora)
       - generateDigitString - generowanie losowego napisu o podnej dlugosci
       - jwt - tworzenie tokenu, weryfikacja tokenu i tworzenie cookies zawierajacych tokeny

3. Uruchomienie srodowiska
   I. Aplikacja uruchamiana w kontenerach dockerowych.
   Uruchamiane sa wszystkie serwisy polaczone w aplikacje (zawarte w pliku docker-compose.yml)
   By uruchomic aplikacje wymagana jest instalacja:

   - docker
   - docker compose
   - node

   1. Przejdz do lokalizacji w ktorej znajduje sie plik docker-compose.yml
   2. Wprowadz komende [ docker compose up ]
      Poczekaj az wszystkie kontenery sie wybuduja i aplikacje zaczna dzialac
      (pojawia sie komunikaty 'Server is listening on port ... ').
      Aplikacje domyslnie uruchamiane sa w trybie dewelopera i mozliwe jest przelaczenia na tryb produkcyjny, przez zmiane przypisanej wartosci zmiennej srodowiskowej NODE_ENV na production.

   II. Aplikacja uruchamiana bez dockera (uruchamia wylacznie mikroserwis do obslugi kont bankowych. By podejmowal jakies akcje musisz uruchomic reszte srodowisk oraz stworzyc dockerowy kontener rabbitmq,
   see: https://cloudinfrastructureservices.co.uk/create-rabbitmq-docker-container-image/ )

   Przejdz do folderu account-manager2 i uruchom komende [ npm start ]

Jesli aplikacja uruchamiana jest w trybie dewelopera lub bez uzycia kontenerow docker mozliwe jest wykonywanie zapytan np. w aplikacji postman pod adresem: http://localhost:5000/api/v1.

Dokumentacja serwisu, z potrzebnymi informacjami do wykonywania zapytan dostepna jest pod adresem http://localhost:5000
