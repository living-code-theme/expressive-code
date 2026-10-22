<!-- living-code-readme:1 -->
# 📜 Living Code for Expressive Code

**Calm slate. Living color.** Living Code for Expressive Code. Repository-owned theme files, installation instructions and four color flavors.

[Installation](#installation) · [Flavors](#flavors) · [Configuration](#configuration) · [All ports](https://github.com/living-code-theme)

## Installation

Use the dedicated themes for syntax highlighting, editor and terminal frames, copy buttons, line numbers, and highlighted or diff lines.

For Astro:

```sh
pnpm add @living-code/expressive-code astro-expressive-code
```

Add the integration to `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import night from "@living-code/expressive-code/living-code-night.json" with { type: "json" };
import paper from "@living-code/expressive-code/living-code-paper.json" with { type: "json" };

export default defineConfig({
  integrations: [expressiveCode({ themes: [night, paper] })],
});
```

Night and Paper follow the visitor’s dark/light preference by default. Replace Night with `living-code-frost.json` or `living-code-signal.json` for another dark flavor, or pass a single theme for a fixed appearance.

**Starlight:** pass the same `themes` array to `starlight({ expressiveCode: { themes: [night, paper] } })` instead of adding a separate integration. For other integrations, pass these JSON objects to their Expressive Code `themes` option. When using the `ExpressiveCode` JavaScript API directly, wrap each JSON object in `new ExpressiveCodeTheme(theme)` (imported from `expressive-code`).

## Flavors

Expand a flavor for its activation instructions.

<details data-lc-flavor="night">
<summary><strong>Night</strong> · Dark · full palette</summary>

Import `@living-code/expressive-code/living-code-night.json` and pass it to the integration's `themes` option. With the JavaScript API, wrap it in `new ExpressiveCodeTheme(theme)`.

</details>

<details data-lc-flavor="frost">
<summary><strong>Frost</strong> · Dark · softer chroma</summary>

Import `@living-code/expressive-code/living-code-frost.json` and pass it to the integration's `themes` option. With the JavaScript API, wrap it in `new ExpressiveCodeTheme(theme)`.

</details>

<details data-lc-flavor="paper">
<summary><strong>Paper</strong> · Light · near-white slate</summary>

Import `@living-code/expressive-code/living-code-paper.json` and pass it to the integration's `themes` option. With the JavaScript API, wrap it in `new ExpressiveCodeTheme(theme)`.

</details>

<details data-lc-flavor="signal">
<summary><strong>Signal</strong> · Dark · teal accent</summary>

Import `@living-code/expressive-code/living-code-signal.json` and pass it to the integration's `themes` option. With the JavaScript API, wrap it in `new ExpressiveCodeTheme(theme)`.

</details>

## Configuration

See [Expressive Code's documentation](https://expressive-code.com) for application settings and reload behavior. The activation instructions above identify each supported flavor; keep your other application configuration.

## Compatibility

Preserves the npm package name `@living-code/expressive-code` and its existing import paths. Package publication and registry credentials are separate from creating this repository.

## Contributing

Found a problem? [Open an issue](https://github.com/living-code-theme/expressive-code/issues/new/choose) with the app version, the flavor and a screenshot. Want Living Code somewhere else? [Request a port](https://github.com/living-code-theme/core/issues/new?template=port-request.yml).

Pull requests are welcome. Keep this README, `port.json` and `images/` in sync, and use real screenshots of the app, never mockups.

🦎 **One chameleon, many habitats.** Part of [Living Code](https://github.com/living-code-theme).

## License

[MIT](LICENSE) © Elliot Luque
