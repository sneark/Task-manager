# Task Manager

Aplikacja do zarządzania zadaniami zaimplementowana w **React** i **TypeScript**, służąca jako praktyczna demonstracja paradygmatów **Programowania Funkcyjnego**. Projekt jest w pełni skonteneryzowany za pomocą **Dockera**.

## Uruchomienie

### Wymagania
- Docker
- Docker Compose

### Instrukcja
```bash
docker-compose up --build
```

## Koncepcje Funkcyjne 

### 1. Czyste Funkcje 
Cała logika biznesowa znajduje się w katalogu `src/logic` i składa się wyłącznie z czystych funkcji.
- Funkcje `createTask`, `toggleTask` i `sortTasks` zawsze zwracają ten sam wynik dla tych samych danych wejściowych.
- Funkcje nie modyfikują zewnętrznego stanu ani nie wykonują operacji I/O.

### 2. Niemutowalność 
Stan aplikacji jest traktowany jako niemutowalny.
- Zamiast modyfikować tablice i obiekty w miejscu (`push`, `splice`), tworzone są ich nowe kopie przy użyciu operatora spread (`...`) oraz metod takich jak `.map()` i `.filter()`.

### 3. Kompozycja Funkcji 
Zastosowano technikę **Pipe** do łączenia operacji przetwarzania danych.
- Filtrowanie i sortowanie zadań odbywa się w jednym przepływie (`pipeline`), gdzie wyjście jednej funkcji jest wejściem kolejnej.
- Implementacja własna funkcji `pipe` w `src/logic/utils.ts`.

### 4. Monada Maybe
Zaimplementowano klasę **Maybe** (warianty `Just` i `Nothing`) do bezpiecznej obsługi brakujących wartości, eliminując potrzebę sprawdzania `null` w kodzie klienckim.
- Wykorzystywana np. przy wyszukiwaniu konkretnego zadania po ID (`findTask`).

## Struktura Projektu

```
src/
├── components/      # Komponenty UI 
├── logic/           # Czysta logika biznesowa
│   ├── monads.ts    # Implementacja Monady Maybe
│   ├── todoFunctions.ts  # Operacje na zadaniach
│   └── utils.ts     # Funkcje pomocnicze (pipe)
├── App.tsx          # Główny kontener stanu
└── ...
```
