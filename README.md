# 🔒 Opencode Context Binding Plugin

Deterministic, message-count based context limiting for Opencode.

## Features
- Fixed-size conversation window
- Automatic trimming of old messages
- Persistent, platform-agnostic state
- Simple control commands

## Installation
```bash
cp index.js ~/.config/opencode/plugin/context-binding.js
cp package.json ~/.config/opencode/plugin/context-binding.json
opencode
```

## Usage
- Enable: `/bindContext`
- Custom limit: `/bindContext maxMessages:50`
- Disable: `/bindContext enabled:false`
- Status: `/contextStatus`

## State Storage
State is stored in:
- `$XDG_STATE_HOME/context-binding-state.json`
- `~/.local/share/opencode/context-binding-state.json`
- OS temp directory (fallback)

## License
MIT
