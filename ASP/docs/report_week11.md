# Project Info:
- Name and Surname: Dmytro Petrenko
- Project Title: Audio Streaming Platform (ASP)
- Repository Link:  https://github.com/petrenko4/tia-project  <!-- Link na Váš GitHub repozitár -->

# Reported Version Info:  
<!-- Upraviť podľa aktuálneho týždňa, reporty začínajú 4. týždeň semestra. Upraviť aj názov reportu. -->
- Tag: week11                      
- Period: 11. week, 28.4. - 4.5.2025 

# Plan:
<!-- Skopírovať z predchádzajúceho reportu časť "Plán na ďalší týždeň" resp. pre prvý report z plánu zo špecifikácie -->
finish

# Work Completed:
<!-- Ku každému bodu je nutné priradiť číslo commitu, ktorý ho implementuje - samostatný commit pre každý bod! -->
- I implemented admin-specific features 
{625e3dd507c37a80c8698cad0727195932007c48,
e498f7c0e8146ca353d4122f815de1b8daa08cd8}
- some fixes
{7e1040fb6e8280db7940c96ca03389ca07d7ffd4,
fbf81b996541a66cb0726cf60e69ea58fa7ffe84}

- playlists 
{18feaa05eef22a7e769a4acc0d7ce0d9453490e3,
f2b1e1166137bbd6c4437eca22bafe1ecd894242}

# Explanation of Differences Between the Plan and Completed Work:
<!-- Zdôvodniť nedokončenie všetkých bodov z plánu (napr. choroba, iné nečakané povinnosti, ...), ale aj predbehnutie plánu -->
- no diff

# Plan for Next Week:
<!-- Skombinovať plán zo špecifikácie spolu s potenciálnym oneskorením / predbehnutím plánu v minulých týždňoch -->
- presentation

# Issues:
<!-- Popísať akékoľvek problémy, s ktorými ste sa stretli. Ak neboli žiadne, explicitne to uveďte. -->
- I am facing an issue where tracks are not updating after deletion, despite making the necessary API calls to refresh the data.

# Changes in Specification:
<!-- Popísať akékoľvek zmeny v špecifikácii, spolu s ich odôvodnením (netreba uvádzať iba zmeny v časovom pláne, nakoľko tie popisujete v predchádzajúcich bodoch). Cvičiaci má právo posúdiť vhodnosť týchto zmien a zaslať k nim spätnú väzbu na zapracovanie. Ak neboli žiadne zmeny, explicitne to uveďte. -->
- Removed the tracks and length columns from the releases table and created a new playlists_tracks junction table for the playlists↔tracks many‑to‑many relationship; the former track column on releases was also dropped, since each track now references its release via a foreign key. (previous)