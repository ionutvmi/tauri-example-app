import React from "react";
import { appWindow } from "@tauri-apps/api/window";

import "./TitleBar.css";

export default function TitleBar() {
  return (
    <div data-tauri-drag-region className="titlebar">
      <div className="titlebar-text">This is a custom title bar</div>
      <div
        className="titlebar-button"
        title="Minimize"
        onClick={() => appWindow.minimize()}
        id="titlebar-minimize"
      >
        <img
          src="https://api.iconify.design/mdi:window-minimize.svg"
          alt="minimize"
        />
      </div>
      <div
        className="titlebar-button"
        title="Maximize"
        onClick={() => appWindow.toggleMaximize()}
        id="titlebar-maximize"
      >
        <img
          src="https://api.iconify.design/mdi:window-maximize.svg"
          alt="maximize"
        />
      </div>
      <div
        className="titlebar-button titlebar-button--close"
        title="Close"
        onClick={() => appWindow.close()}
        id="titlebar-close"
      >
        <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
      </div>
    </div>
  );
}
