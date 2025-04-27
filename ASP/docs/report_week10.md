# Project Info:
- Name and Surname: Dmytro Petrenko
- Project Title: Audio Streaming Platform (ASP)
- Repository Link:  https://github.com/petrenko4/tia-project  <!-- Link na Váš GitHub repozitár -->

# Reported Version Info:  
<!-- Upraviť podľa aktuálneho týždňa, reporty začínajú 4. týždeň semestra. Upraviť aj názov reportu. -->
- Tag: week10                      
- Period: 10. week, 21.4. - 27.4.2025 

# Plan:
<!-- Skopírovať z predchádzajúceho reportu časť "Plán na ďalší týždeň" resp. pre prvý report z plánu zo špecifikácie -->
Start implementing playlists

# Work Completed:
<!-- Ku každému bodu je nutné priradiť číslo commitu, ktorý ho implementuje - samostatný commit pre každý bod! -->
- I added the browsing feature, enabling users to search and explore both tracks and releases in the application.
368957b2fdf6f232e6378ff162d2444e93edc903

- I added a delete option for tracks, allowing users to remove tracks from their library.
83ef26512a0b53c098032c22df643e11eeb9ceb3

# Explanation of Differences Between the Plan and Completed Work:
<!-- Zdôvodniť nedokončenie všetkých bodov z plánu (napr. choroba, iné nečakané povinnosti, ...), ale aj predbehnutie plánu -->
- I decided to prioritize implementing browsing and track management first, as these features will be essential for managing playlists in the future.

- This week, I wasn't feeling well, which affected my productivity, and as a result, I didn't accomplish as much work as I had planned.

# Plan for Next Week:
<!-- Skombinovať plán zo špecifikácie spolu s potenciálnym oneskorením / predbehnutím plánu v minulých týždňoch -->
- finish

# Issues:
<!-- Popísať akékoľvek problémy, s ktorými ste sa stretli. Ak neboli žiadne, explicitne to uveďte. -->
- All issues encountered during development were resolved through thorough debugging

# Changes in Specification:
<!-- Popísať akékoľvek zmeny v špecifikácii, spolu s ich odôvodnením (netreba uvádzať iba zmeny v časovom pláne, nakoľko tie popisujete v predchádzajúcich bodoch). Cvičiaci má právo posúdiť vhodnosť týchto zmien a zaslať k nim spätnú väzbu na zapracovanie. Ak neboli žiadne zmeny, explicitne to uveďte. -->
- Removed the tracks and length columns from the releases table and created a new playlists_tracks junction table for the playlists↔tracks many‑to‑many relationship; the former track column on releases was also dropped, since each track now references its release via a foreign key. (previous)