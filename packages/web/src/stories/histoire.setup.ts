import "../styles/index.scss";
import "./story.css";
import { setTheme } from "../utils/tokens";

const HISTOIRE_DARK_CLASS = "dark";

function syncHistoireColorScheme(): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const runtimeWindow = window as Window & {
    __puHistoireThemeObserver?: MutationObserver;
  };
  const applyTheme = () => {
    setTheme(root.classList.contains(HISTOIRE_DARK_CLASS) ? "dark" : "light");
  };

  applyTheme();

  if (typeof MutationObserver === "undefined") return;

  runtimeWindow.__puHistoireThemeObserver?.disconnect();
  runtimeWindow.__puHistoireThemeObserver = new MutationObserver(applyTheme);
  runtimeWindow.__puHistoireThemeObserver.observe(root, {
    attributeFilter: ["class"],
  });
}

syncHistoireColorScheme();

export function setupVue3(): void {}

export function setupVanilla(): void {}
