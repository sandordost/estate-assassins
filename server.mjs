// Estate Assassins LAN server: this PC shows the board (/) and up to four phones join as controllers (/play).
// No dependencies: static files over HTTP, Server-Sent Events downstream, small JSON POSTs upstream.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 8080;
const FILES = { '/': 'index.html', '/index.html': 'index.html', '/play': 'controller.html', '/controller.html': 'controller.html' };

const displays = new Set();
const SEATS = 4;
const seats = Array.from({ length: SEATS }, () => ({ id: null, res: null }));
const lastState = new Array(SEATS).fill(null);

const send = (res, event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
const seatInfo = () => seats.map((s) => ({ taken: !!s.id, online: !!s.res }));
function broadcastSeats() {
  const info = seatInfo();
  for (const d of displays) send(d, 'seats', info);
  for (const s of seats) if (s.res) send(s.res, 'seats', info);
}
function lanUrls() {
  return Object.values(os.networkInterfaces()).flat()
    .filter((i) => i && i.family === 'IPv4' && !i.internal)
    .sort((a, b) => Number(b.address.startsWith('192.168.')) - Number(a.address.startsWith('192.168.')))
    .map((i) => `http://${i.address}:${PORT}/play`);
}
const json = (res, data, status = 200) => { res.writeHead(status, { 'content-type': 'application/json' }); res.end(JSON.stringify(data)); };
const readBody = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', (chunk) => { body += chunk; if (body.length > 1e6) req.destroy(); });
  req.on('end', () => { try { resolve(JSON.parse(body || '{}')); } catch (e) { reject(e); } });
  req.on('error', reject);
});

function openEvents(req, res, url) {
  res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-store', connection: 'keep-alive' });
  res.write('retry: 1500\n\n');
  if (url.searchParams.get('role') === 'display') {
    displays.add(res); send(res, 'seats', seatInfo());
    req.on('close', () => displays.delete(res));
    return;
  }
  const seat = Number(url.searchParams.get('seat')), id = url.searchParams.get('id');
  if (!(Number.isInteger(seat) && seat >= 0 && seat < SEATS) || !id) { send(res, 'refused', { reason: 'bad request' }); res.end(); return; }
  const s = seats[seat];
  // A seat is only taken while its phone is connected; a closed browser frees it for another phone.
  if (s.id && s.id !== id && s.res) { send(res, 'taken', { seat }); res.end(); return; }
  if (s.res && s.res !== res) s.res.end(); // same phone reconnecting: keep only the newest stream
  s.id = id; s.res = res;
  send(res, 'joined', { seat });
  send(res, 'state', lastState[seat] || { lobby: true });
  broadcastSeats();
  for (const d of displays) send(d, 'joined', { seat });
  req.on('close', () => { if (s.res === res) { s.res = null; broadcastSeats(); } });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (req.method === 'GET' && FILES[url.pathname]) {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
      return res.end(await readFile(path.join(ROOT, FILES[url.pathname])));
    }
    if (req.method === 'GET' && url.pathname === '/info') return json(res, { urls: lanUrls(), seats: seatInfo() });
    if (req.method === 'GET' && url.pathname === '/events') return openEvents(req, res, url);
    if (req.method === 'POST' && url.pathname === '/cmd') {
      const cmd = await readBody(req), s = seats[cmd.seat];
      if (!s || !s.id || s.id !== cmd.id) return json(res, { ok: false }, 403);
      delete cmd.id;
      for (const d of displays) send(d, 'cmd', cmd);
      return json(res, { ok: true, display: displays.size > 0 });
    }
    if (req.method === 'POST' && url.pathname === '/state') {
      const body = await readBody(req);
      (body.seats || []).slice(0, SEATS).forEach((state, i) => { lastState[i] = state; if (seats[i].res) send(seats[i].res, 'state', state); });
      return json(res, { ok: true });
    }
    if (req.method === 'POST' && url.pathname === '/leave') {
      const body = await readBody(req), s = seats[body.seat];
      if (s && s.id === body.id) { s.res?.end(); s.id = null; s.res = null; broadcastSeats(); }
      return json(res, { ok: true });
    }
    if (req.method === 'POST' && url.pathname === '/reset') {
      for (const s of seats) { if (s.res) { send(s.res, 'kicked', {}); s.res.end(); } s.id = null; s.res = null; }
      broadcastSeats();
      return json(res, { ok: true });
    }
    res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found');
  } catch (e) {
    res.writeHead(400, { 'content-type': 'text/plain' }).end(String(e.message || e));
  }
});

setInterval(() => { for (const r of [...displays, ...seats.map((s) => s.res).filter(Boolean)]) r.write(': ping\n\n'); }, 15000);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Estate Assassins is running.\n  Board (this PC): http://localhost:${PORT}`);
  for (const u of lanUrls()) console.log(`  Phones:          ${u}`);
});
