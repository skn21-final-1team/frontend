import type { BookmarkFolder, BookmarkFolderList, BookmarkUrl } from '../left/types/bookmarks'

export const updateFolderRecursive = (
  folders: BookmarkFolderList,
  folderId: string,
  updateFn: (folder: BookmarkFolder) => BookmarkFolder,
): BookmarkFolderList => {
  return folders.map((folder) => {
    if (folder.id === folderId) return updateFn(folder)
    if (folder.folders) {
      return { ...folder, folders: updateFolderRecursive(folder.folders, folderId, updateFn) }
    }
    return folder
  })
}

export const isAllCheckedRecursive = (folder: BookmarkFolder): boolean => {
  const urlsChecked = folder.urls.every((url) => url.isChecked)
  const foldersChecked = folder.folders ? folder.folders.every(isAllCheckedRecursive) : true
  return urlsChecked && foldersChecked
}

export const setAllCheckedRecursive = (
  folder: BookmarkFolder,
  checked: boolean,
): BookmarkFolder => ({
  ...folder,
  urls: folder.urls.map((url) => ({ ...url, isChecked: checked })),
  folders: folder.folders?.map((f) => setAllCheckedRecursive(f, checked)),
})

export const collectCheckedUrls = (folders: BookmarkFolderList): BookmarkUrl[] => {
  return folders.flatMap((f) => [
    ...f.urls.filter((u) => u.isChecked),
    ...(f.folders ? collectCheckedUrls(f.folders) : []),
  ])
}

export const deleteUrlRecursive = (
  folders: BookmarkFolderList,
  folderId: string,
  urlId: string,
): BookmarkFolderList => {
  return folders.map((folder) => {
    if (folder.id === folderId) {
      return { ...folder, urls: folder.urls.filter((url) => url.id !== urlId) }
    }
    if (folder.folders) {
      return { ...folder, folders: deleteUrlRecursive(folder.folders, folderId, urlId) }
    }
    return folder
  })
}

export const deleteFolderRecursive = (
  folders: BookmarkFolderList,
  folderId: string,
): BookmarkFolderList => {
  return folders
    .filter((folder) => folder.id !== folderId)
    .map((folder) => ({
      ...folder,
      folders: folder.folders ? deleteFolderRecursive(folder.folders, folderId) : undefined,
    }))
}

export const filterFoldersByQuery = (
  folders: BookmarkFolderList,
  query: string,
): BookmarkFolderList => {
  if (!query.trim()) return folders

  const terms = query
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0)

  const tagTerms = terms.filter((t) => t.startsWith('#')).map((t) => t.slice(1).toLowerCase())

  const textTerms = terms.filter((t) => !t.startsWith('#')).map((t) => t.toLowerCase())

  const result: BookmarkFolder[] = []

  for (const folder of folders) {
    const filteredUrls = folder.urls.filter((url) => {
      const matchesTags =
        tagTerms.length === 0 ||
        tagTerms.every((searchTag) =>
          url.tags?.some((urlTag) => urlTag.toLowerCase().includes(searchTag)),
        )

      const matchesText =
        textTerms.length === 0 ||
        textTerms.some(
          (term) => url.title.toLowerCase().includes(term) || url.url.toLowerCase().includes(term),
        )

      return matchesTags && matchesText
    })

    const filteredSubFolders = folder.folders
      ? filterFoldersByQuery(folder.folders, query)
      : undefined

    const hasMatch =
      filteredUrls.length > 0 || (filteredSubFolders && filteredSubFolders.length > 0)

    if (hasMatch) {
      result.push({
        ...folder,
        urls: filteredUrls,
        folders: filteredSubFolders,
        isExpanded: true,
      })
    }
  }

  return result
}

export const getFolderCheckedMap = (folders: BookmarkFolderList): Map<string, boolean> => {
  const map = new Map<string, boolean>()

  const processFolder = (folder: BookmarkFolder): boolean => {
    if (folder.folders) {
      folder.folders.forEach((sub) => processFolder(sub))
    }

    const urlsChecked = folder.urls.length === 0 || folder.urls.every((url) => url.isChecked)
    const hasUrls =
      folder.urls.length > 0 || (folder.folders?.some((f) => f.urls.length > 0) ?? false)
    const foldersChecked =
      !folder.folders || folder.folders.every((sub) => map.get(sub.id) ?? false)

    const isChecked = hasUrls && urlsChecked && foldersChecked
    map.set(folder.id, isChecked)
    return isChecked
  }

  folders.forEach((folder) => processFolder(folder))
  return map
}
