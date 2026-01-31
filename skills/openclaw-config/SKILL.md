---
name: openclaw-config
description: Manage OpenClaw bot configuration - channels, agents, security, and autopilot settings
version: 1.0.0
---

# OpenClaw Configuration Manager

Expert tool for configuring and managing OpenClaw bot settings - channels (Signal, Telegram, WhatsApp, iMessage), agent behavior, security policies, and autopilot modes.

## Commands

### `/openclaw-config status`
Show current configuration overview and channel status

### `/openclaw-config channel <channel> [options]`
Configure a specific channel (signal, telegram, whatsapp, imessage)

**Options:**
- `--enable` / `--disable` - Enable or disable channel
- `--policy <open|allowlist|pairing|disabled>` - Set DM policy
- `--allow <number>` - Add number to allowlist
- `--remove <number>` - Remove number from allowlist
- `--autopilot` - Enable autopilot mode (bot responds as you)
- `--manual` - Disable autopilot mode

### `/openclaw-config agent [options]`
Configure agent behavior and models

**Options:**
- `--model <opus|sonnet|haiku>` - Set default model
- `--concurrency <number>` - Set max concurrent requests
- `--workspace <path>` - Set workspace directory

### `/openclaw-config security`
Review and configure security settings

### `/openclaw-config notify <channel> <target>`
Set up cross-channel notifications (e.g., WhatsApp → Signal alerts)

## How It Works

1. **Reads** `~/.openclaw/openclaw.json`
2. **Validates** changes against OpenClaw schema
3. **Applies** updates safely
4. **Restarts** gateway to activate changes
5. **Verifies** channels are running

## Key Configuration Patterns

### Channel Security Modes

**Open Mode** (⚠️ High Risk):
```json
{
  "dmPolicy": "open",
  "allowFrom": ["*"]
}
```
Anyone can message, no restrictions.

**Allowlist Mode** (Recommended):
```json
{
  "dmPolicy": "allowlist",
  "allowFrom": ["+14155551234"]
}
```
Only specific numbers can message.

**Pairing Mode** (Secure):
```json
{
  "dmPolicy": "pairing"
}
```
Unknown senders get a code, you approve via `openclaw pairing approve`.

### WhatsApp Autopilot Setup

**Autopilot Mode** - Bot responds as you to everyone:
```json
{
  "whatsapp": {
    "dmPolicy": "open",
    "selfChatMode": false,
    "allowFrom": ["*"]
  }
}
```

**Manual Mode** - You control responses:
```json
{
  "whatsapp": {
    "dmPolicy": "allowlist",
    "selfChatMode": true,
    "allowFrom": ["+14155551234"]
  }
}
```

### Multi-Bot Telegram Setup

```json
{
  "telegram": {
    "enabled": true,
    "accounts": {
      "coder": {
        "name": "Coding Assistant",
        "enabled": true,
        "botToken": "your-bot-token"
      },
      "sales": {
        "name": "Sales Bot",
        "enabled": true,
        "botToken": "another-bot-token"
      }
    },
    "dmPolicy": "pairing"
  }
}
```

### Signal as Mission Control

```json
{
  "signal": {
    "enabled": true,
    "account": "+12345678901",
    "cliPath": "/opt/homebrew/bin/signal-cli",
    "dmPolicy": "allowlist",
    "allowFrom": ["+14155551234"]
  }
}
```

### Agent Performance Tuning

```json
{
  "agents": {
    "defaults": {
      "maxConcurrent": 20,
      "subagents": {
        "maxConcurrent": 20
      }
    }
  }
}
```

## Common Workflows

### Setup: Lock Down All Channels

```bash
/openclaw-config channel signal --policy allowlist --allow +14155551234
/openclaw-config channel telegram --policy pairing
/openclaw-config channel whatsapp --policy allowlist --allow +14155551234
/openclaw-config channel imessage --disable
```

### Setup: WhatsApp Autopilot + Signal Notifications

1. Enable WhatsApp autopilot (bot responds as you)
2. Lock Signal to only you
3. Configure BOOT.md to notify Signal of all WhatsApp activity

```bash
/openclaw-config channel whatsapp --autopilot --policy open
/openclaw-config channel signal --policy allowlist --allow +14155551234
/openclaw-config notify whatsapp signal
```

### Setup: Multiple Telegram Bots for Team

```bash
/openclaw-config channel telegram --add-bot coder "Coding Bot" <token>
/openclaw-config channel telegram --add-bot sales "Sales Bot" <token>
/openclaw-config channel telegram --policy pairing
```

### Performance: Enable Multitasking

```bash
/openclaw-config agent --concurrency 20
```

## Safety Features

### Pre-Flight Checks
- Validates JSON syntax before applying
- Checks for required fields
- Warns about security implications

### Backup Strategy
- Creates timestamped backup before changes
- Stored in `~/.openclaw/backups/`
- Rollback with `/openclaw-config restore <timestamp>`

### Dangerous Action Warnings

Warns before enabling:
- WhatsApp autopilot (bot speaks for you)
- Open mode (anyone can message)
- Disabling security features

## Files Modified

- `~/.openclaw/openclaw.json` - Main config
- `~/.openclaw/workspace/BOOT.md` - Bot instructions (for notifications)
- `~/.openclaw/credentials/<channel>/` - Channel credentials

## Implementation

```python
import json
import subprocess
from pathlib import Path
from datetime import datetime

CONFIG_PATH = Path.home() / '.openclaw' / 'openclaw.json'
BACKUP_DIR = Path.home() / '.openclaw' / 'backups'

def read_config():
    """Read and parse openclaw.json"""
    with open(CONFIG_PATH) as f:
        return json.load(f)

def write_config(config, backup=True):
    """Write config with automatic backup"""
    if backup:
        BACKUP_DIR.mkdir(exist_ok=True)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_path = BACKUP_DIR / f'openclaw.json.{timestamp}'
        subprocess.run(['cp', CONFIG_PATH, backup_path])

    with open(CONFIG_PATH, 'w') as f:
        json.dump(config, f, indent=2)

def restart_gateway():
    """Restart OpenClaw gateway"""
    subprocess.run(['openclaw', 'gateway', 'restart'])

def validate_config(config):
    """Validate config against OpenClaw schema"""
    # Write temp file and test with openclaw doctor
    temp = Path('/tmp/openclaw-test.json')
    with open(temp, 'w') as f:
        json.dump(config, f, indent=2)

    result = subprocess.run(
        ['openclaw', 'doctor', '--config', str(temp)],
        capture_output=True,
        text=True
    )
    return result.returncode == 0, result.stderr

def set_channel_policy(channel, policy, allow_from=None):
    """Set channel DM policy"""
    config = read_config()

    if channel not in config['channels']:
        config['channels'][channel] = {'enabled': True}

    config['channels'][channel]['dmPolicy'] = policy

    if allow_from:
        config['channels'][channel]['allowFrom'] = (
            ['*'] if allow_from == '*' else allow_from
        )

    valid, error = validate_config(config)
    if not valid:
        raise ValueError(f"Invalid config: {error}")

    write_config(config)
    restart_gateway()
    return f"✅ {channel} policy set to {policy}"

def enable_autopilot(channel='whatsapp'):
    """Enable autopilot mode on a channel"""
    config = read_config()

    config['channels'][channel].update({
        'dmPolicy': 'open',
        'selfChatMode': False,
        'allowFrom': ['*'],
        'groupPolicy': 'disabled'
    })

    write_config(config)
    restart_gateway()

    return f"""
⚠️ AUTOPILOT ENABLED on {channel}!
Bot will now respond AS YOU to all messages.
Monitor Signal for notifications of all activity.
"""
```

## Examples

### Check Current Setup
```
/openclaw-config status
```

Output:
```
📱 OpenClaw Status:

Channels:
✅ Signal (+12345678901) - allowlist (only +14155551234)
✅ Telegram coder - pairing mode
✅ Telegram sales - pairing mode
✅ WhatsApp - AUTOPILOT (open to everyone ⚠️)
❌ iMessage - disabled

Agent:
Model: claude-opus-4-5
Concurrency: 20/20
Workspace: ~/.openclaw/workspace

Security:
⚠️ WhatsApp autopilot active - bot speaks for you!
✅ Signal locked to owner only
✅ Telegram requires pairing approval
```

### Add Telegram Bot
```
/openclaw-config channel telegram --add-bot worker "Worker Bot" 123456:ABC-token
```

### Lock Down Everything
```
/openclaw-config security --lock-all
```

Applies:
- All channels → pairing mode
- iMessage → disabled
- Signal → allowlist (owner only)
- Telegram → pairing

## Troubleshooting

**Config invalid after change:**
```bash
# Restore from backup
/openclaw-config restore latest

# Or manually
cp ~/.openclaw/backups/openclaw.json.20260131_120000 ~/.openclaw/openclaw.json
openclaw gateway restart
```

**Channel not starting:**
```bash
# Check logs
openclaw logs --follow | grep <channel>

# Verify credentials
ls ~/.openclaw/credentials/<channel>/

# Run doctor
openclaw doctor
```

**Permission denied (iMessage):**
- Grant Full Disk Access to Ghostty/Terminal
- System Settings → Privacy & Security → Full Disk Access

## Security Warnings

### ⚠️ AUTOPILOT MODE RISKS

When enabling WhatsApp/Telegram autopilot:
- Bot responds AS YOU to everyone
- Family, friends, work contacts
- Can damage relationships if bot misbehaves
- ALWAYS monitor Signal notifications

### ⚠️ OPEN MODE RISKS

`dmPolicy: "open"` means:
- Anyone can message your bot
- No verification required
- Could be spammed or abused
- Bot costs = your API bills

### ✅ RECOMMENDED SETUP

For personal use:
- Signal: allowlist (owner only) - Your control center
- Telegram: pairing mode - Approve each user
- WhatsApp: autopilot + Signal notifications - Monitored automation
- iMessage: disabled - Privacy protection

## Advanced: Cross-Channel Notifications

Set up BOOT.md to automatically notify Signal when WhatsApp gets messages:

```markdown
# BOOT.md

## WhatsApp → Signal Notification Protocol

When you respond to WhatsApp, ALWAYS send notification to Signal:

Format:
📱 WhatsApp Activity:
From: [Name/Number]
Said: "[message]"
I replied: "[response]"

Use message tool:
- Channel: signal
- To: +12345678901
- Message: [formatted notification]
```

This keeps you informed of all autopilot activity in real-time.

## Related Commands

- `openclaw channels status` - View all channel statuses
- `openclaw pairing list <channel>` - See pending pairing requests
- `openclaw pairing approve <channel> <code>` - Approve pairing
- `openclaw gateway restart` - Restart gateway
- `openclaw doctor` - Health check and fixes
- `openclaw logs --follow` - Live logs

## License

MIT
