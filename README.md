# Higher Ground

Higher-or-lower kaartspel met vastgoed, kop of munt, capture the flag en drie helden. De 3D-weergave
is gebouwd met Three.js (`three@0.170.0` via jsDelivr, gepind in de importmap). Zelfstandig spel,
los van Zystam/Backpack Survival.

## Starten

**Met telefoons (aanbevolen):** de pc is het bord, iedere speler gebruikt de eigen telefoon.

```sh
node server.mjs          # of: npm start; andere poort: PORT=9000 node server.mjs
```

1. Open `http://localhost:8080` op de pc → **Spelen met telefoons**.
2. Beide telefoons op hetzelfde wifi-netwerk: scan de QR-code of open het getoonde adres (`http://<pc-ip>:8080/play`).
3. Kies op de telefoon je kleur en held. Start daarna op de pc. Een stoel zonder telefoon speelt de AI.

**Zonder server:** open `index.html` en speel tegen de AI of met 2 spelers op hetzelfde scherm.
Internet is nodig voor Three.js (en voor de QR-code in de lobby).

## Regels

1. Om de beurt raad je of de volgende kaart **hoger of lager** is (aas hoog, gelijk = fout).
   Elke goede gok geeft een **claim**.
2. Raad verder om claims op te stapelen, of **verzilver** ze. Eén foute gok: alle openstaande claims weg, beurt voorbij.
3. Per claim kies je een vakje naast jouw gebied en werp je **kop of munt**. Kop = het vastgoed is van jou,
   ook als het van je tegenstander was.
4. **Dominance**: huis 1, winkel 2, toren 3, hoofdkwartier 3. Heb je bij de start van je beurt 60% van alle waarde, dan win je.
5. **Capture the flag**: de vijandelijke vlag is alleen aanvalbaar zolang jij meer vastgoedwaarde hebt;
   dan is 2× kop achter elkaar nodig. Verovering = directe winst.
6. **Actiekaarten**: 15 stuks in de stapel van 67. Getrokken actiekaarten gaan naar je hand (max 5) en speel je
   tijdens je beurt: Gouden munt, Verrekijker, Dubbel of niks, Tweede kans, Schild, Gelijkspel, Sabotage,
   Aardbeving, Ruil en Overname.
7. **Helden** (eigen personages, geïnspireerd op Yu-Gi-Oh en Dragon Ball Z), elk met een passieve kracht en één super per ronde:
   - 🃏 **Kaito, de Duellist**: start met 2 actiekaarten, handlimiet 6. Super *Kaartenregen*: trek de volgende 2 actiekaarten.
   - 🔥 **Raiden, de Ki-krijger**: vanaf de 3e goede gok in één beurt +1 extra claim per gok. Super *Ki-golf*: volgende muntworp gegarandeerd kop.
   - 👁️ **Mira, de Zienster**: gelijke kaart telt als goed. Super *Derde oog*: zie de volgende 2 speelkaarten.
8. Een ronde duurt **maximaal 10 minuten**; daarna wint de hoogste vastgoedwaarde (gelijk: meeste vakjes).

Toetsen op de pc (zonder telefoons): ↑/↓ raden, Enter claimen, S super, Esc annuleren. 🔊 zet geluid en muziek aan of uit.

## Techniek

- `index.html`: bord, spelregels, AI en geluid (WebAudio, alles gesynthetiseerd, geen audiobestanden).
- `controller.html`: telefooncontroller (`/play`).
- `server.mjs`: Node ≥ 18 zonder afhankelijkheden. Serveert de pagina's, stuurt status naar telefoons via
  Server-Sent Events en commando's naar het bord via kleine POSTs. Alleen bedoeld voor je thuisnetwerk.
- Testhooks: `?speed=N` speelt N× sneller, `?autoplay` laat de AI beide kanten spelen; `window.__hg` voor debugging.
