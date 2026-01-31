# openclaw-config

Agent skill for managing OpenClaw bot configuration - channels (Signal, Telegram, WhatsApp, iMessage), agent behavior, security policies, and autopilot modes.

## Install

```bash
npx add-skill yourusername/openclaw-config
```

Or for specific agents:

```bash
npx add-skill yourusername/openclaw-config -a claude-code
npx add-skill yourusername/openclaw-config -a cursor
npx add-skill yourusername/openclaw-config -a codex
```

## Usage

After installation:

### Check Status
```
/openclaw-config status
```

### Configure Channels
```
/openclaw-config channel signal --policy allowlist --allow +14155551234
/openclaw-config channel telegram --policy pairing
/openclaw-config channel whatsapp --autopilot --policy open
/openclaw-config channel imessage --disable
```

### Agent Settings
```
/openclaw-config agent --model opus --concurrency 20
```

### Security Review
```
/openclaw-config security
```

### Setup Notifications
```
/openclaw-config notify whatsapp signal
```

## Features

- ✅ Manage all OpenClaw channels (Signal, Telegram, WhatsApp, iMessage)
- ✅ Configure security policies (open, allowlist, pairing)
- ✅ Enable/disable autopilot mode
- ✅ Set up cross-channel notifications
- ✅ Performance tuning (concurrency, models)
- ✅ Automatic config validation and backups
- ✅ Safety warnings for dangerous operations

## Common Workflows

### Lock Down All Channels
```
/openclaw-config security --lock-all
```

### WhatsApp Autopilot + Signal Monitoring
```
/openclaw-config channel whatsapp --autopilot --policy open
/openclaw-config channel signal --policy allowlist --allow +14155551234
/openclaw-config notify whatsapp signal
```

### Multiple Telegram Bots
```
/openclaw-config channel telegram --add-bot coder "Coding Bot" <token>
/openclaw-config channel telegram --add-bot sales "Sales Bot" <token>
```

## Requirements

- OpenClaw CLI installed
- Valid `~/.openclaw/openclaw.json` config
- Appropriate channel credentials configured

## Documentation

See [SKILL.md](skills/openclaw-config/SKILL.md) for detailed documentation, examples, and security best practices.

## License

MIT
