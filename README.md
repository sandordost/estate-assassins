# Higher Ground

Higher-or-lower kaartspel met vastgoed, kop of munt en capture the flag, gebouwd als
één HTML-bestand met Three.js (`three@0.170.0` via jsDelivr, gepind in de importmap). Zelfstandig spel, los van Zystam/Backpack Survival.

- Starten: open `index.html` in een browser (internet nodig voor Three.js), of
  `python3 -m http.server` en ga naar `http://localhost:8000`.
- Modi: tegen de AI of 2 spelers op hetzelfde scherm (actiekaarten verborgen bij doorgeven).
- Testhooks: `?speed=N` speelt N× sneller, `?autoplay` laat de AI beide kanten spelen;
  `window.__hg` geeft de spelstatus voor debugging.

## Regels

1. Om de beurt raad je of de volgende kaart **hoger of lager** is dan de open kaart
   (aas hoog, gelijk = fout). Elke goede gok geeft een **claim**.
2. Raad verder om claims op te stapelen, of **verzilver** ze. Eén foute gok en al je
   openstaande claims zijn weg en je beurt is voorbij.
3. Per claim kies je een vakje dat aan jouw gebied grenst en werp je **kop of munt**:
   kop = het vastgoed is van jou, ook als het van je tegenstander was.
4. **Dominance**: huis 1, winkel 2, toren 3, hoofdkwartier 3. Heb je bij de start van je
   beurt 60% van alle waarde, dan win je.
5. **Capture the flag**: de vijandelijke vlag is alleen aanvalbaar zolang jij meer
   vastgoedwaarde hebt; dan is 2× kop achter elkaar nodig. Verovering = directe winst.
6. **Actiekaarten**: 15 stuks in de stapel van 67. Getrokken actiekaarten gaan naar je
   hand (max 5) en speel je tijdens je beurt: Gouden munt, Verrekijker, Dubbel of niks,
   Tweede kans, Schild, Gelijkspel, Sabotage, Aardbeving, Ruil en Overname.
7. Een ronde duurt **maximaal 10 minuten**; daarna wint de hoogste vastgoedwaarde
   (gelijk: meeste vakjes).
