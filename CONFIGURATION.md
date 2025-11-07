# sketch-cli Configuration Guide

## Model Configuration

sketch-cli now includes automatic model selection to avoid Gemini CLI routing bugs that cause "Requested entity was not found" errors.

### Default Behavior

By default, sketch-cli uses `gemini-2.5-flash` which:
- Avoids the ClassifierStrategy routing bug in Gemini CLI
- Provides good quality/speed balance
- Works reliably across all subscription tiers

### Customizing the Model

You have two options to customize which Gemini model is used:

#### Option 1: Environment Variable (Temporary)

Set the `SKETCH_GEMINI_MODEL` environment variable before running commands:

```bash
export SKETCH_GEMINI_MODEL=gemini-2.5-pro
bun run sketch "shoe marketplace" home
```

#### Option 2: Configuration File (Persistent)

1. Copy the example configuration:
   ```bash
   cp .sketch-config.example .sketch-config
   ```

2. Edit `.sketch-config` and set your preferred model:
   ```
   SKETCH_GEMINI_MODEL=gemini-2.5-flash
   ```

3. Source the config file or add it to your shell profile:
   ```bash
   source .sketch-config
   ```

### Available Models

- **`gemini-2.5-flash`** (default, recommended)
  - Fast generation
  - Good quality
  - Cost effective
  - Best for prototyping and iteration

- **`gemini-2.5-pro`**
  - Higher quality output
  - Slower generation
  - More expensive
  - Best for production-ready designs

- **`gemini-2.0-flash-exp`**
  - Experimental features
  - Latest capabilities
  - May be less stable

### Why Explicit Model Selection?

The Gemini CLI has known issues where auto-detection fails:

- **Issue #12660**: Background API errors during chat sessions
- **Issue #12697**: ClassifierStrategy routing failures
- **Root Cause**: The CLI tries to use `gemini-2.5-flash-lite` for routing, but this model isn't available to all users

By explicitly specifying a model with the `-m` flag, we bypass the auto-detection system entirely, ensuring reliable operation.

### Troubleshooting

**Error: "Requested entity was not found"**

This error means:
1. The specified model isn't available to your account
2. Try using `gemini-2.5-flash` (most widely available)
3. Check your API key has the necessary permissions

**Error: "Error executing tool generate_diagram"**

This error means:
1. The nanobanana extension syntax was incorrect
2. sketch-cli now uses the correct `/generate "prompt"` syntax
3. This should be fixed in the latest version

**Checking Available Models**

List models available to your account:
```bash
gemini models list
```

### Examples

```bash
# Use default model (gemini-2.5-flash)
bun run sketch "shoe marketplace" home

# Use Pro model for higher quality
SKETCH_GEMINI_MODEL=gemini-2.5-pro bun run sketch "jewelry store" product

# Use experimental model
SKETCH_GEMINI_MODEL=gemini-2.0-flash-exp bun run component ./button.png
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SKETCH_GEMINI_MODEL` | `gemini-2.5-flash` | Gemini model to use for generation |

## Configuration Files

- `.sketch-config.example` - Example configuration with all options
- `.sketch-config` - Your local config (git-ignored)
- `.env` - Alternative location for environment variables

All configuration files are git-ignored to keep your settings private.
