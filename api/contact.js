// Contact form endpoint: sends the enquiry to Gmail over SMTP (smtp.gmail.com:465) with an app password,
// then a short confirmation to the visitor. No dependencies, so the site stays a no-build static deploy.
// Needs GMAIL_USER and GMAIL_APP_PASSWORD in the Vercel project's environment variables.
const tls = require('tls');
const crypto = require('crypto');

const SITE = 'https://mydeen-pitchai.vercel.app/';
const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/;
const hits = new Map(); // best-effort per-instance rate limit: ip -> recent timestamps

function limited(ip) {
  const now = Date.now(), recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

// minimal SMTP client over implicit TLS
function smtpSession(host, port) {
  const sock = tls.connect({ host, port, servername: host });
  sock.setEncoding('utf8');
  sock.setTimeout(12000, () => sock.destroy(new Error('SMTP timeout')));
  let buf = '', lines = [], queue = [], waiters = [], failure = null;
  sock.on('data', d => {
    buf += d;
    let i;
    while ((i = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, i).replace(/\r$/, '');
      buf = buf.slice(i + 1);
      lines.push(line);
      if (/^\d{3}(?!-)/.test(line)) { // last line of a reply
        const reply = { code: +line.slice(0, 3), text: lines.join('\n') };
        lines = [];
        waiters.length ? waiters.shift().resolve(reply) : queue.push(reply);
      }
    }
  });
  const fail = e => { failure = failure || e; waiters.splice(0).forEach(w => w.reject(failure)); };
  sock.on('error', fail);
  sock.on('close', () => fail(new Error('SMTP connection closed')));
  function next() {
    if (queue.length) return Promise.resolve(queue.shift());
    if (failure) return Promise.reject(failure);
    return new Promise((resolve, reject) => waiters.push({ resolve, reject }));
  }
  async function cmd(line, ok) {
    if (line != null) sock.write(line + '\r\n');
    const r = await next();
    if (!ok.includes(r.code)) throw new Error('SMTP ' + r.code + ' ' + r.text.slice(0, 160));
    return r;
  }
  return { cmd, end: () => { try { sock.write('QUIT\r\n'); sock.end(); } catch (e) {} } };
}

const b64 = s => Buffer.from(s, 'utf8').toString('base64');
const word = s => '=?UTF-8?B?' + b64(s) + '?=';

function message({ fromName, from, to, replyTo, subject, text }) {
  return [
    'From: ' + word(fromName) + ' <' + from + '>',
    'To: <' + to + '>',
    replyTo ? 'Reply-To: <' + replyTo + '>' : null,
    'Subject: ' + word(subject),
    'Date: ' + new Date().toUTCString(),
    'Message-ID: <' + crypto.randomUUID() + '@mydeen-pitchai.vercel.app>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    b64(text).replace(/.{76}/g, '$&\r\n'), // base64 lines never start with ".", so no dot-stuffing needed
  ].filter(l => l !== null).join('\r\n');
}

async function sendAll(user, pass, mails) {
  const s = smtpSession('smtp.gmail.com', 465);
  try {
    await s.cmd(null, [220]);
    await s.cmd('EHLO mydeen-pitchai.vercel.app', [250]);
    await s.cmd('AUTH LOGIN', [334]);
    await s.cmd(b64(user), [334]);
    await s.cmd(b64(pass), [235]);
    const sent = [];
    for (const m of mails) {
      try {
        await s.cmd('MAIL FROM:<' + user + '>', [250]);
        await s.cmd('RCPT TO:<' + m.to + '>', [250, 251]);
        await s.cmd('DATA', [354]);
        await s.cmd(message({ ...m, from: user }) + '\r\n.', [250]);
        sent.push(true);
      } catch (e) {
        if (!sent.length) throw e; // the enquiry itself must go through; the confirmation is best effort
        sent.push(false);
      }
    }
    return sent;
  } finally {
    s.end();
  }
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ success: false, error: 'method' }); }

  const origin = req.headers.origin;
  if (origin) {
    try { if (new URL(origin).host !== req.headers.host) return res.status(403).json({ success: false, error: 'origin' }); }
    catch (e) { return res.status(403).json({ success: false, error: 'origin' }); }
  }

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = null; } }
  if (!b || typeof b !== 'object') return res.status(400).json({ success: false, error: 'body' });

  // bots fill the hidden field: pretend it worked
  if (b._honey) return res.status(200).json({ success: true });

  const clean = (v, max) => String(v == null ? '' : v).replace(/\r\n?/g, '\n').trim().slice(0, max);
  const name = clean(b.name, 100).replace(/\s+/g, ' ');
  const email = clean(b.email, 254);
  const kind = clean(b.project_type, 60).replace(/\s+/g, ' ') || 'Not specified';
  const msg = clean(b.message, 5000);
  if (!name || !EMAIL_RE.test(email) || msg.length < 5) return res.status(422).json({ success: false, error: 'invalid' });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ success: false, error: 'rate' });

  const user = process.env.GMAIL_USER, pass = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
  if (!user || !pass) return res.status(500).json({ success: false, error: 'config' });

  const enquiry = {
    fromName: name + ' via portfolio',
    to: user,
    replyTo: email,
    subject: 'New project: ' + kind + ' — ' + name,
    text: 'New project enquiry from ' + SITE + '\n\n' +
      'Name:    ' + name + '\n' +
      'Email:   ' + email + '\n' +
      'Project: ' + kind + '\n\n' +
      msg + '\n\n' +
      '— Reply to this email to answer ' + name + ' directly.',
  };
  // fixed text only (no visitor content), so the form can't be used to relay messages to third parties
  const confirmation = {
    fromName: 'Mydeen Pitchai',
    to: email,
    replyTo: user,
    subject: 'Got your message — Mydeen Pitchai',
    text: 'Hi,\n\n' +
      'Thanks for reaching out. Your message has landed in my inbox and I’ll reply within one working day.\n\n' +
      'If it’s urgent, WhatsApp me on +91 88073 75255.\n\n' +
      'Mydeen Pitchai\nLaravel & TALL stack developer\n' + SITE,
  };

  try {
    await sendAll(user, pass, [enquiry, confirmation]);
    return res.status(200).json({ success: true });
  } catch (e) {
    console.error('contact: send failed', e && e.message);
    return res.status(502).json({ success: false, error: 'send' });
  }
};
