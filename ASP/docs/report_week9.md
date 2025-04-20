
# Project Info:
- Name and Surname: Dmytro Petrenko
- Project Title: Audio Streaming Platform (ASP)
- Repository Link:  https://github.com/petrenko4/tia-project  <!-- Link na Váš GitHub repozitár -->

# Reported Version Info:  
<!-- Upraviť podľa aktuálneho týždňa, reporty začínajú 4. týždeň semestra. Upraviť aj názov reportu. -->
- Tag: week9                      
- Period: 9. week, 14.4. - 20.4.2025 

# Plan:
<!-- Skopírovať z predchádzajúceho reportu časť "Plán na ďalší týždeň" resp. pre prvý report z plánu zo špecifikácie -->
I plan to implement functionality that allows users to create releases and add tracks to them, as well as complete the authentication system

# Work Completed:
<!-- Ku každému bodu je nutné priradiť číslo commitu, ktorý ho implementuje - samostatný commit pre každý bod! -->
- I have completed the work, enabling users to create releases, add content to them, and view them in a library.
{8fca374286b6098001218037a7f021699e48b022, 9e2340ccfa261a5f5437b1086cbfdc89a532dc42}

- I implemented authentication and login functionality, allowing users to securely sign in and access features within the application.
{5fc3b6fabd535dcb799b22e8787244fcb1ce0e96,
a4f0d1c676436cc77bd9cd61032f62279865a284,
8e0d8f58360ac776b8427ee92571ea5c04ee96aa,
7ee154416820086a15556fa2c6d05101f5c32c3d,
c81907dff366795be8f514a12f167f4547440519,
7429a7bc04a6753ea69e980824670e65b1f5d1f8,
57790313843d7627cff3e33225cfba6d6c154270}

# Explanation of Differences Between the Plan and Completed Work:
<!-- Zdôvodniť nedokončenie všetkých bodov z plánu (napr. choroba, iné nečakané povinnosti, ...), ale aj predbehnutie plánu -->
- I successfully completed all the planned tasks

# Plan for Next Week:
<!-- Skombinovať plán zo špecifikácie spolu s potenciálnym oneskorením / predbehnutím plánu v minulých týždňoch -->
- Start implementing playlists

# Issues:
<!-- Popísať akékoľvek problémy, s ktorými ste sa stretli. Ak neboli žiadne, explicitne to uveďte. -->
- All issues encountered during development were resolved through thorough debugging

# Changes in Specification:
<!-- Popísať akékoľvek zmeny v špecifikácii, spolu s ich odôvodnením (netreba uvádzať iba zmeny v časovom pláne, nakoľko tie popisujete v predchádzajúcich bodoch). Cvičiaci má právo posúdiť vhodnosť týchto zmien a zaslať k nim spätnú väzbu na zapracovanie. Ak neboli žiadne zmeny, explicitne to uveďte. -->
- Removed the tracks and length columns from the releases table and created a new playlists_tracks junction table for the playlists↔tracks many‑to‑many relationship; the former track column on releases was also dropped, since each track now references its release via a foreign key.