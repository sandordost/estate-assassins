# Status

Updated 3 October 2026 (version 1.0.0).

## Verified

- Headless Chromium (Playwright-core 1.58, SwiftShader WebGL): menu, hero select, AI, hot-seat and phone modes; no page errors.
- Six AI-only rounds with 2, 3 and 4 players (`?speed=15&autoplay`): all finished within 10 minutes of game time; flag
  captures, dominance wins, time-ups and eliminations all occurred; obstacle cards changed the map without breaking it.
- Phone mode with three headless phones: seat and hero choice, 3-player game, picture-in-picture mirror following the
  active player, board rotated so each player's HQ is bottom-left.
- Layouts checked at 1600×900 and 390×844.

## Not verified

- Fun, balance of Beacons, heroes and the 30 action cards: needs real play tests.
- Real phones (iOS Safari, Android Chrome) and GPU performance of bloom/shadows on low-end hardware (`?lowgfx` exists).
- Sound has only been checked for errors, not listened to.
