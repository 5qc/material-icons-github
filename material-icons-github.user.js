// ==UserScript==
// @name        Material Icons GitHub
// @namespace   Violentmonkey Scripts
// @match       https://github.com/*
// @grant       GM_getValue
// @version     1.0
// @author      5qc
// @description Adds Material Icons to GitHub
// ==/UserScript==

function run() {
  const url = `https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/83375ae073d0e21849cbc4fa583cb71d5d4358d9/icons/`
  const icons = document.querySelectorAll(".Details [role=gridcell].mr-3.flex-shrink-0")
  for (let i = 0; i < icons.length; i++) {
    const icon = icons[i]
    const filename = icon.parentNode.children[1].children[0].children[0].innerText.replace(/(.*?)\/(.*)/g, "$2")
    const isfile = icon.children[0].getAttribute("aria-label") == "Directory" ? false : true

    if (icon.children[0].tagName !== "svg") continue

    if (isfile === true) {
      let ext = filename.split(".")[filename.split(".").length - 1]
      let ext2 = filename.split(".")[filename.split(".").length - 2] + "." + filename.split(".")[filename.split(".").length - 1]
      let icon2 = GM_getValue(`fi-${ext.toLowerCase()}`, false)
      let icon2a = GM_getValue(`fi-${ext2.toLowerCase()}`, false)
      let icon3 = GM_getValue(`fi2-${filename.toLowerCase()}`, false)

      if (icon3 !== false) {
        icon3 = `${url}${icon3}.svg`
        icon.innerHTML = '<img src="'+icon3+'" style="height:100%" />'
        continue
      }
      if (icon2a !== false) {
        icon2a = `${url}${icon2a}.svg`
        icon.innerHTML = '<img src="'+icon2a+'" style="height:100%" />'
        continue
      }
      if (icon2 !== false) {
        icon2 = `${url}${icon2}.svg`
        icon.innerHTML = '<img src="'+icon2+'" style="height:100%" />'
        continue
      }

      icon3 = `${url}file.svg`
      icon.innerHTML = '<img src="'+icon3+'" style="height:100%" />'
    } else if (isfile === false) {
      let icon2 = GM_getValue(`fo-${filename.toLowerCase()}`, false)

      if (icon2 !== false) {
        icon2 = `${url}folder-${icon2}.svg`
        icon.innerHTML = '<img src="'+icon2+'" style="height:100%" />'
        continue
      }
      
      icon2 = `https://raw.githubusercontent.com/5qc/material-icons-github/80bf6483bbba282465c3e8acb55b8c2b273953db/folder.svg`
      icon.innerHTML = '<img src="'+icon2+'" style="height:100%" />'
    }
  }

  setTimeout(run, 100)
}

window.onload = () => {
  run()
}
