import { executeScripts, getActiveTab } from '../core';

const ZOOM_LEVEL = [
  0.25,
  0.33,
  0.5,
  0.67,
  0.75,
  0.8,
  0.9,
  1,
  1.1,
  1.25,
  1.5,
  1.75,
  2,
  2.5,
  3,
  4,
  5
];

const commands = [
  {
    commands: [
      "zoom in",
      "zoom",
      "enlarge",
      "make (it) larger",
      "make (it) bigger"
    ],
    callback: async () => {
      const activeTab = await getActiveTab();
      chrome.tabs.getZoom(activeTab.id, zoomFactor => {
        for (let zoomLevel of ZOOM_LEVEL) {
          if (zoomFactor + 0.01 < zoomLevel) {
            chrome.tabs.setZoom(activeTab.id, zoomLevel);
            break;
          }
        }
      });
    }
  },

  {
    commands: ["zoom out", "make (it) smaller"],
    callback: async () => {
      const activeTab = await getActiveTab();
      chrome.tabs.getZoom(activeTab.id, zoomFactor => {
        for (let i = ZOOM_LEVEL.length - 1; i >= 0; i--) {
          const zoomLevel = ZOOM_LEVEL[i];
          if (zoomFactor - 0.01 > zoomLevel) {
            chrome.tabs.setZoom(activeTab.id, zoomLevel);
            break;
          }
        }
      });
    }
  },
  {
    commands: ["reset zoom", "make (it) normal size"],
    callback: async () => {
      const activeTab = await getActiveTab();
      chrome.tabs.setZoom(activeTab.id, 1);
    }
  },

  {
    commands: ["find *query", "look for *query"],
    callback: query => {
      executeScripts(`window.find('${query}');`);
    }
  },

  {
    commands: ["scroll down", "(go) down"],
    callback: () => {
      executeScripts("window.scrollBy(0, 250);");
    }
  },

  {
    commands: ["page down"],
    callback: () => {
      executeScripts("window.scrollBy(0, 1000);");
    }
  },

  {
    commands: ["scroll up", "(go) up"],
    callback: () => {
      executeScripts("window.scrollBy(0, -250);");
    }
  },

  {
    commands: ["page up"],
    callback: () => {
      executeScripts("window.scrollBy(0, -1000);");
    }
  },

  {
    commands: ["go to (the) top", "scroll to (the) top"],
    callback: () => {
      executeScripts("window.scrollTo(0, 0);");
    }
  },

  {
    commands: ["go to (the) bottom", "scroll to (the) bottom"],
    callback: () => {
      executeScripts(
        "window.scrollTo(0, document.body.scrollHeight);"
      );
    }
  }
];

export default commands;
