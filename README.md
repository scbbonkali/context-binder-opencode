# 🔒 OpenCode Context Binding Plugin

Deterministic, message-count–based context limiting for OpenCode conversations.

This plugin bounds the amount of conversation history sent to the model, keeping the AI focused on recent messages while preserving the full chat history in the UI. By limiting the model’s input context, it can also reduce token usage and cost when using paid providers.

## Features
- Fixed-size conversation window for the model
- Automatic trimming of older messages
- Persistent, platform-agnostic state storage
- Simple, command-based control

## Installation
```bash
cp build/index.js ~/.config/opencode/plugin/context-binding.js
cp package.json ~/.config/opencode/plugin/context-binding.json
opencode
```

## Usage
The plugin is controlled through natural language commands. The user does **not** invoke tools directly; instead, the model interprets intent and applies the appropriate context binding behavior.

Examples:
- Enable binding at the current conversation length:  
  `bind the context`
- Set a fixed message limit:  
  `bind the context to 100`
- Disable context binding:  
  `turn off context binding`
- Check current binding status:  
  `check the context status`  
  `what is the context bound to`

The plugin operates silently in the background. All conversation history remains visible in the UI; only the model’s input context is bounded.

## State Storage
Plugin state is stored in the first available location:
- `$XDG_STATE_HOME/context-binding-state.json`
- `~/.local/share/opencode/context-binding-state.json`
- OS temporary directory (fallback)

## License
MIT

