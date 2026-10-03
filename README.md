# Estate Assassins

A turn-based **higher-or-lower** card game about seizing property: guess the next card, spend your claims on
**heads-or-tails** coin flips, grab the Beacons and storm the enemy HQ. Two to four players, on one screen or with
**phones as controllers** while the PC shows the 3D board. A round usually takes about ten minutes.

Built with plain HTML/JavaScript and [Three.js](https://threejs.org) (r170, loaded from jsDelivr, pinned in the import map).
No build step, no dependencies besides Node.js for the optional LAN server.

## Play

**With phones (recommended)**

```sh
node server.mjs            # or: npm start  ·  other port: PORT=9000 node server.mjs
```

1. Open `http://localhost:8080` on the PC and choose **Play with phones**.
2. Put every phone on the same Wi-Fi, scan the QR code (or open `http://<pc-ip>:8080/play`).
3. Each player picks a colour and a hero on their phone; start on the PC. Empty seats are played by the AI.
4. During the game the PC shows a live picture-in-picture mirror of the active player's phone, with tap
   animations. Action cards and secret peeks stay hidden in the mirror.

**Without a server:** open `index.html` and play against the AI or hot-seat on one screen.
An internet connection is needed for Three.js (and for the QR code in the lobby).

## Rules

1. **Higher or lower.** Take turns guessing whether the next card is higher or lower than the open card
   (aces high, equal = wrong). Every correct guess earns a **claim**.
2. **Push your luck.** Keep guessing to stack claims, or cash them in. One wrong guess loses every open claim.
3. **Heads or tails.** Each claim targets a tile next to your territory. Heads: the property is yours, even if a
   rival owned it.
4. **Random map.** 36 tiles (6×6), generated every round with four-fold rotational symmetry so every corner is
   equally fair. **Mountains, lakes, crystal fields and barricades** are impassable.
5. **Beacons and shields: why you can't rush the enemy base.** Every HQ sits under an energy shield that only drops
   for you once you control **2 Beacons 💎**. The Beacons sit on the edges of the map, away from the straight line
   between the bases, so you have to expand sideways and fight over the flanks before you can strike.
6. **Capture the HQ.** An open HQ needs 2× heads in a row. A captured player is eliminated (their land turns
   neutral); the last player standing wins.
7. **Dominance.** House 1, shop 2, tower/HQ/Beacon 3. Hold 60% (2 players), 50% (3) or 45% (4) of all property
   value at the start of your turn to win.
8. **No hard time limit.** A round ends by assassination or dominance and usually takes about ten minutes. To keep
   long rounds from dragging, **every HQ shield falls after 12 minutes**, Beacons or not.

### Action cards

The double deck holds 104 playing cards and **30 action cards** of 20 kinds. Drawn action cards go to your hand
(max 5) and are played on your turn.

| Card | Effect |
| --- | --- |
| 🪙 Golden Coin ×2 | Next coin flip is heads. |
| 🔭 Spyglass ×2 | See the next playing card. |
| ⚡ Double or Nothing ×2 | Next correct guess gives 2 claims. |
| 🍀 Second Chance ×2 | Next wrong guess this turn doesn't count. |
| 🛡️ Shield ×2 | Protect one of your tiles for 2 rounds. |
| ⚖️ Stalemate | Equal cards count as correct this turn. |
| 💣 Sabotage | The strongest rival's next coin flip fails. |
| 💢 Earthquake | A random rival tile turns neutral. |
| 🔄 Swap | Replace the open card. |
| 🏗️ Hostile Takeover | Claim an adjacent tile without a flip. |
| 🌉 Bridge ×2 | Claim a tile across an obstacle without a flip. |
| 🧨 Demolition ×2 | Blow up an obstacle next to your land; it becomes neutral land. |
| 🧱 Barricade ×2 | Build an impassable wall on a neutral tile (the map always stays connected). |
| 🌀 Portal | Claim a neutral tile next to any obstacle anywhere. |
| 🏔️ Avalanche | Up to 2 rival tiles next to obstacles turn neutral. |
| 💰 Greed ×2 | +1 claim right away. |
| 🎲 Reroll ×2 | Re-flip your next failed coin flip. |
| 🦝 Pickpocket | Steal a card from the rival with the most cards. |
| 🏰 Fortress | One of your tiles needs 2× heads to be taken. |
| 🕸️ Ambush | A hidden trap: the next attack on that tile fails. |

### Heroes

Original characters inspired by card duels (Yu-Gi-Oh) and ki battles (Dragon Ball Z). Each has a passive and one
super per round.

| Hero | Passive | Super (once) |
| --- | --- | --- |
| 🃏 Kaito, the Duelist | Starts with 2 action cards, hand limit 6 | **Card Storm**: draw the next 2 action cards |
| 🔥 Raiden, the Ki Warrior | From the 3rd correct guess in a turn, +1 extra claim per guess | **Ki Blast**: next coin flip is heads, even against sabotage |
| 👁️ Mira, the Seer | Equal cards count as correct | **Third Eye**: see the next 2 playing cards |
| 🐉 Zara, the Dragon Tamer | Tiles across an obstacle count as adjacent | **Dragon Breath**: burn every obstacle next to her land into neutral land |

### Names and drinking mode

Every player enters a name: in the hero screen (vs AI and hot-seat) or on their phone. The active player's name is
always shown at the top of the board.

Flip the **🍺 Drinking mode** switch in the menu or the phone lobby for a party round. The game pauses until the
drinker presses **Done** (on their own phone, or on screen without phones); AI players never drink.

| Event | Sips |
| --- | --- |
| Wrong guess that loses 2–3 claims / 4+ claims | 1 / 2 |
| A rival steals your Beacon | 1 |
| Your HQ attack fails, you walk into an Ambush, or you are sabotaged | 1 |
| You are eliminated | 2 |
| You lose the game | 2 |

### Boons

At the start of every game each hero receives **two random Boons** on top of their signature power. Boons are
deliberately weaker than the signature power, but they make every game play a little differently.

| Boon | Effect |
| --- | --- |
| 🍀 Lucky Start | First coin flip of the game is heads. |
| 👝 Deep Pockets | Hold one extra action card. |
| 🎴 Card Sharp | Start with one extra action card. |
| 🧭 Pathfinder | Start with a free tile next to your HQ. |
| 🏯 Bulwark | Your HQ needs 3× heads to fall instead of 2. |
| 💨 Second Wind | Once per game, your first wrong guess is forgiven. |
| ⛏️ Prospector | Capturing a Beacon gives +1 claim. |
| 💼 Looter | Stealing a rival tile draws an action card (once per turn). |
| 🧿 Lucky Charm | A failed coin flip has a 25% chance to be flipped again. |
| 📈 Momentum | Your 4th correct guess in a turn gives +1 extra claim. |

### Look and feel

One theme throughout: an assassins' guild in obsidian and antique gold with a single blood-red accent. Panels use
gilded frames, buttons are engraved gold or obsidian plaques, action cards are framed like trading cards, and every
icon is cast in the same gold. Player houses are gems: Sapphire, Ruby, Emerald and Topaz. Fonts: Cinzel, Cinzel
Decorative and Spectral (Google Fonts).

### Controls on the PC

↑/↓ guess · Enter claim · S super · Esc cancel · 🔊 toggles sound and music.

## Tech

- `index.html`: board, rules, AI, sound (all WebAudio-synthesised) and graphics: nebula sky, energy-dome,
  beacon-beam, water and tile-glow shaders, fireflies, bloom post-processing and a floating island.
- `controller.html`: phone controller (`/play`) and the read-only picture-in-picture mirror (`/play?mirror=1`).
- `server.mjs`: dependency-free Node ≥ 18 server for your home network. Serves the pages, pushes state to phones
  with Server-Sent Events and forwards phone input to the board with small POST requests. Not meant for the public
  internet.
- Test hooks: `?speed=N` runs N× faster, `?autoplay` lets the AI play every seat, `?lowgfx` disables shadows and
  bloom, `?noremote` hides phone mode; `window.__hg` exposes the state for debugging.
