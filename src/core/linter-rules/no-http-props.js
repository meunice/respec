// @ts-check
/**
 * Linter rule "no-http-props". Makes sure the there are no URLs that
 * start with http:// in the ReSpec config.
 */
import { getIntlData, joinAnd, showWarning } from "../utils.js";

const ruleName = "no-http-props";
export const name = "core/linter-rules/no-http-props";

const localizationStrings = {
  en: {
    msg: "Insecure URLs are not allowed in `respecConfig`.",
    hint: "Please change the following properties to 'https://': ",
  },
  zh: {
    msg: "`respecConfig` 中不允许使用不安全的URL.",
    hint: "请将以下属性更改为 https://：",
  },
};
const l10n = getIntlData(localizationStrings);

export function run(conf) {
  if (!conf.lint?.[ruleName]) {
    return;
  }

  // We can only really perform this check over http/https
  // Using parent's location as tests are loaded in iframe as a srcdoc.
  if (!parent.location.href.startsWith("http")) {
    return;
  }

  const offendingMembers = Object.getOwnPropertyNames(conf)
    // this check is cheap, "prevED" is w3c exception.
    .filter(key => key.endsWith("URI") || key === "prevED")
    // this check is expensive, so separate step
    .filter(key =>
      new URL(conf[key], parent.location.href).href.startsWith("http://")
    );

  if (offendingMembers.length) {
    const keys = joinAnd(offendingMembers, key => `\`${key}\``);
    showWarning(l10n.msg, name, { hint: l10n.hint + keys });
  }
}
