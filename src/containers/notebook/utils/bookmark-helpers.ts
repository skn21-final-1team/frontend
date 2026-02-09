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
