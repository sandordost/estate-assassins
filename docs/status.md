# Status

Updated 3 October 2026 (version 1.4.1).

## Verified

- Headless Chromium (Playwright-core 1.58, SwiftShader WebGL): menu, hero select, AI, hot-seat and phone modes; no page errors.
- Six AI-only rounds with 2, 3 and 4 players without a time limit (`?speed=20&autoplay`): all ended on their own after
  5:33 to 9:41 of game time, by HQ capture or dominance; Boons and supers were used; no page errors.
- Phone mode with three headless phones: seat and hero choice, 3-player game, picture-in-picture mirror following the
  active player, board rotated so each player's HQ is bottom-left.
- Layouts checked at 1600×900 and 390×844.

## Not verified

- Fun, balance of Beacons, heroes, Boons and the 30 action cards: needs real play tests. Human rounds will run longer than AI rounds.
- Real phones (iOS Safari, Android Chrome) and GPU performance of bloom/shadows on low-end hardware (`?lowgfx` exists).
- Sound has only been checked for errors, not listened to.
