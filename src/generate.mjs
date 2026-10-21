// This port owns its application mappings. Inputs come only from the pinned local palette.
import { ANSI_ORDER } from '../scripts/palette.mjs';

const SCOPES = [
  { role: "comment", scope: ["comment", "punctuation.definition.comment", "string.quoted.docstring"] },
  { role: "keyword", scope: ["keyword", "storage.type", "storage.modifier", "keyword.control", "keyword.operator.new", "keyword.operator.expression", "keyword.operator.logical.python", "keyword.operator.logical.lua", "keyword.operator.wordlike", "keyword.operator.word", "keyword.other", "punctuation.definition.template-expression", "punctuation.section.embedded", "punctuation.definition.keyword", "punctuation.section.interpolation"] },
  { role: "operator", scope: ["keyword.operator", "storage.type.function.arrow"] },
  { role: "punctuation", scope: ["punctuation", "meta.brace", "punctuation.definition.tag", "punctuation.separator", "punctuation.terminator", "punctuation.accessor"] },
  { role: "string", scope: ["string", "punctuation.definition.string", "string.template"] },
  { role: "escape", scope: ["constant.character.escape", "constant.other.placeholder", "constant.character.format", "constant.character.entity"] },
  { role: "regex", scope: ["string.regexp"] },
  { role: "number", scope: ["constant.numeric", "keyword.other.unit"] },
  // Constant values only (true, null, built-in constants, colors). The names that hold constants are names: RADIUS
  // (variable.other.constant, constant.other.caps, Sublime's entity.name.constant) takes the variable color and enum
  // members the property color, as JetBrains draws them; see the variable and property entries below.
  { role: "constant", scope: ["constant.language", "constant.other", "support.constant", "constant.other.color"] },
  { role: "function", scope: ["entity.name.function", "support.function", "meta.function-call.generic", "variable.function", "entity.name.function.member"] },
  { role: "type", scope: ["entity.name.type", "entity.name.class", "support.type", "support.class", "entity.other.inherited-class", "storage.type.primitive", "storage.type.built-in", "storage.type.numeric.go", "storage.type.boolean.go", "storage.type.string.go", "storage.type.byte.go", "storage.type.rune.go", "storage.type.error.go", "storage.type.uintptr.go", "support.class.component", "entity.other.attribute-name.class.css", "entity.other.attribute-name.id.css", "entity.name.struct", "entity.name.enum", "entity.name.union", "entity.name.trait", "entity.name.interface", "entity.name.impl"] },
  { role: "namespace", scope: ["entity.name.namespace", "entity.name.type.module", "entity.name.scope-resolution", "support.module"] },
  { role: "decorator", scope: ["meta.decorator", "entity.name.function.decorator", "punctuation.decorator", "punctuation.definition.decorator", "meta.decorator variable", "meta.decorator variable.other", "meta.decorator variable.other.readwrite", "meta.decorator entity.name.function", "storage.type.annotation", "meta.attribute.rust", "entity.name.function.macro", "entity.name.function.preprocessor", "meta.preprocessor", "keyword.control.directive", "entity.name.type.lifetime", "punctuation.definition.lifetime", "meta.annotation", "variable.annotation", "punctuation.definition.annotation", "entity.name.label", "entity.other.attribute-name.pseudo-class", "entity.other.attribute-name.pseudo-element"] },
  // Includes are imports (Neovim's @keyword.import), unlike the other preprocessor directives.
  { role: "keyword", scope: ["keyword.control.directive.include", "keyword.control.directive.import", "keyword.control.import"] },
  { role: "tag", scope: ["entity.name.tag"] },
  { role: "attribute", scope: ["entity.other.attribute-name"] },
  { role: "property", scope: ["variable.other.enummember", "variable.other.constant.property", "variable.other.property", "variable.other.object.property", "variable.object.property", "support.variable.property", "meta.object-literal.key", "support.type.property-name", "punctuation.support.type.property-name", "entity.name.tag.yaml", "entity.name.tag.toml", "variable.other.key.toml", "support.type.property-name.json", "meta.attribute.python"] },
  { role: "parameter", scope: ["variable.parameter", "meta.parameter variable"] },
  { role: "builtin", scope: ["variable.language", "support.variable", "variable.language.this", "variable.language.self", "variable.language.super", "variable.parameter.function.language.special"] },
  { role: "variable", scope: ["variable", "meta.definition.variable", "variable.other.readwrite", "variable.other.constant", "constant.other.caps", "entity.name.constant"] },
  { role: "heading", scope: ["markup.heading", "entity.name.section", "markup.heading punctuation.definition.heading"] },
  { role: null, scope: ["markup.bold"], fontStyle: "bold" },
  { role: null, scope: ["markup.italic"], fontStyle: "italic" },
  { role: null, scope: ["markup.strikethrough"], fontStyle: "strikethrough" },
  { role: null, scope: ["markup.underline"], fontStyle: "underline" },
  { role: "link", scope: ["markup.underline.link", "string.other.link", "markup.link"] },
  { role: "code", scope: ["markup.inline.raw", "markup.fenced_code", "markup.raw"] },
  { role: "quote", scope: ["markup.quote"] },
  { role: "accent", scope: ["punctuation.definition.list", "markup.list punctuation.definition"] },
  { role: "added", scope: ["markup.inserted", "meta.diff.header.to-file", "punctuation.definition.inserted"] },
  { role: "removed", scope: ["markup.deleted", "meta.diff.header.from-file", "punctuation.definition.deleted"] },
  { role: "modified", scope: ["markup.changed", "punctuation.definition.changed"] },
  { role: "fgSubtle", scope: ["meta.diff.range", "meta.diff.index", "meta.separator"] },
  { role: "error", scope: ["invalid", "invalid.illegal"] },
  { role: "warning", scope: ["invalid.deprecated"] },
];

const scopeRules = (f) =>
  SCOPES.map(({ role, scope, fontStyle }) => {
    const settings = {};
    if (role) settings.foreground = f.r(role);
    const style = fontStyle ?? (role && f.styles[role]);
    if (style) settings.fontStyle = style;
    return { scope, settings };
  });

function expressiveCodeTheme(f) {
  const r = f.r;
  const colors = {
    "editor.background": r("bg"),
    "editor.foreground": r("fg"),
    "editor.selectionBackground": r("selection"),
    "editorLineNumber.foreground": r("lineNumber"),
    "editorLineNumber.activeForeground": r("lineNumberActive"),
    "terminal.background": r("bg"),
    focusBorder: r("accent"),
  };
  for (const [i, name] of ANSI_ORDER.entries()) {
    const key = name[0].toUpperCase() + name.slice(1);
    colors[`terminal.ansi${key}`] = f.ansi.normal[i];
    colors[`terminal.ansiBright${key}`] = f.ansi.bright[i];
  }
  return {
    name: f.name,
    type: f.light ? "light" : "dark",
    colors,
    tokenColors: scopeRules(f),
    styleOverrides: {
      codeBackground: r("bg"),
      codeForeground: r("fg"),
      codeSelectionBackground: r("selection"),
      borderColor: r("border"),
      focusBorder: r("accent"),
      gutterBorderColor: r("border"),
      gutterForeground: r("fgSubtle"),
      gutterHighlightForeground: r("lineNumberActive"),
      uiSelectionBackground: r("selection"),
      uiSelectionForeground: r("fg"),
      scrollbarThumbColor: f.c("surface2"),
      scrollbarThumbHoverColor: r("fgSubtle"),
      frames: {
        frameBoxShadowCssValue: "none",
        editorBackground: r("bg"),
        editorTabBarBackground: r("bgDeep"),
        editorTabBarBorderColor: r("border"),
        editorTabBarBorderBottomColor: r("border"),
        editorActiveTabBackground: r("bg"),
        editorActiveTabForeground: r("fg"),
        editorActiveTabBorderColor: r("border"),
        editorActiveTabIndicatorTopColor: r("accent"),
        editorActiveTabIndicatorBottomColor: "transparent",
        terminalBackground: r("bg"),
        terminalTitlebarBackground: r("bgDeep"),
        terminalTitlebarForeground: r("fgMuted"),
        terminalTitlebarBorderBottomColor: r("border"),
        terminalTitlebarDotsForeground: r("fgMuted"),
        inlineButtonForeground: r("fgMuted"),
        inlineButtonBackground: r("fgMuted"),
        inlineButtonBorder: r("border"),
        tooltipSuccessBackground: r("bgAlt"),
        tooltipSuccessForeground: r("success"),
      },
      textMarkers: {
        markBackground: r("modified") + "26",
        markBorderColor: r("modified"),
        insBackground: r("added") + "26",
        insBorderColor: r("added"),
        insDiffIndicatorColor: r("added"),
        delBackground: r("removed") + "26",
        delBorderColor: r("removed"),
        delDiffIndicatorColor: r("removed"),
        lineMarkerLabelColor: r("bg"),
      },
    },
  };
}

const expressiveCode = {
files: (f) => [{
    path: `${f.slug}.json`,
    content: JSON.stringify(expressiveCodeTheme(f), null, 2) + "\n",
  }]
};

export function generate(flavors) {
  return [...flavors.flatMap(f => expressiveCode.files(f)), ...(expressiveCode.all?.(flavors) ?? [])].filter(f => !["LICENSE", "README.md", "package.json", "extension.toml"].includes(f.path.split("/").at(-1)));
}
