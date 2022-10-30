/*
*   This is the script I used to convert the icons from https://github.com/PKief/vscode-material-icon-theme/blob/main/src/icons/fileIcons.ts
*   and https://github.com/PKief/vscode-material-icon-theme/blob/main/src/icons/folderIcons.ts into a nice compatible JSON file. See values.json
*   to see the result of that. ()
*/

const obj1 = {}
for (let i = 0; i < fileIcons.icons.length; i++) {
  const icon = fileIcons.icons[i]

  if ("fileExtensions" in icon) {
    // @ts-ignore
    const ext: string[] = icon.fileExtensions
    for (let i = 0; i < ext.length; i++) {
      obj1[`fi-${ext[i]}`] = icon.name
    }
  }

  if ("fileNames" in icon) {
    // @ts-ignore
    const name: string[] = icon.fileNames
    for (let i = 0; i < name.length; i++) {
      obj1[`fi2-${name[i]}`] = icon.name
    }
  }
}

const obj2 = {}
// @ts-ignore
for (let i = 0; i < folderIcons[0].icons.length; i++) {
  // @ts-ignore
  const icon = folderIcons[0].icons[i]
  
  if ("folderNames" in icon) {
    // @ts-ignore
    const ext: string[] = icon.folderNames
    for (let i = 0; i < ext.length; i++) {
      obj2[`fo-${ext[i]}`] = icon.name.replace("folder-", "")
    }
  }
}

// @ts-ignore
fs.writeFile("values.json", JSON.stringify(Object.assign(obj1, obj2)), (err) => {
  if (err) throw err
})
