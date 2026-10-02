# Status Higher Ground

Bijgewerkt: 2 oktober 2026 (versie 0.3.0).

## Bewezen

- Headless Chromium (Playwright-core 1.58): menu, heldkeuze, AI-modus, 2-spelermodus, telefoonmodus; geen pagina-fouten.
- Zes AI-tegen-AI-rondes met helden (`?speed=15&autoplay`): alle binnen 10 minuten speltijd, supers van alle drie helden gebruikt.
- End-to-end telefoonmodus (bord + 2 telefoonpagina's via `server.mjs`): stoel kiezen, held kiezen, raden, claimen,
  actiekaarten, supers, einde en "Nog een ronde" vanaf de telefoon; een derde telefoon kan geen bezette stoel overnemen;
  een stoel waarvan de telefoon is verdwenen kan door een andere telefoon worden overgenomen.
- Layout gecontroleerd op 1280×800 en 390×844.

## Onbewezen

- Speelplezier, balans van helden en actiekaarten: wacht op speeltest.
- Geluid is alleen technisch gecontroleerd (geen fouten); klank en volume vragen een luistertest.
- Echte telefoons (iOS Safari/Android Chrome) op het thuisnetwerk nog niet getest.

## Volgende actie

Eén ronde spelen met twee telefoons en feedback geven op tempo, helden, geluid en de bediening op de telefoon.
