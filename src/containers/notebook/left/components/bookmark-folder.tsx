import { ChevronRight, Folder } from 'lucide-react'
import { ItemMenu } from '@/shared/components'

import BookmarkUrlItem from './bookmark-url-item'
import * as S from './bookmark-folder.style'

import type { BookmarkFolder as BookmarkFolderType } from '../types/bookmarks'

interface BookmarkFolderProps {
  folder: BookmarkFolderType
  onToggleExpand: (folderId: string) => void
  onToggleUrl: (folderId: string, urlId: string) => void
  onToggleFolder: (folderId: string) => void
  onDeleteUrl: (folderId: string, urlId: string) => void
  onDeleteFolder: (folderId: string) => void
}

function BookmarkFolder({
  folder,
  onToggleExpand,
  onToggleUrl,
  onToggleFolder,
  onDeleteUrl,
  onDeleteFolder,
}: BookmarkFolderProps) {
  const isAllCheckedRecursive = (f: BookmarkFolderType): boolean => {
    const urlsChecked = f.urls.length === 0 || f.urls.every((url) => url.isChecked)
    const foldersChecked = !f.folders || f.folders.every((sub) => isAllCheckedRecursive(sub))
    return urlsChecked && foldersChecked
  }
  const hasAnyUrls = (f: BookmarkFolderType): boolean => {
    if (f.urls.length > 0) return true
    return f.folders?.some((sub) => hasAnyUrls(sub)) ?? false
  }
  const allChecked = hasAnyUrls(folder) && isAllCheckedRecursive(folder)

  return (
    <div className={S.wrapper()}>
      <div className={S.header()}>
        <ItemMenu align="start" onDelete={() => onDeleteFolder(folder.id)} />

        <ChevronRight
          size={16}
          className={`${S.chevron()} ${folder.isExpanded ? S.chevronOpen() : ''}`}
          onClick={() => onToggleExpand(folder.id)}
        />

        <div className={S.folderInfo()} onClick={() => onToggleExpand(folder.id)}>
          <Folder size={16} className={S.folderIcon()} />
          <span className={S.folderName()}>{folder.name}</span>
        </div>

        <input
          type="checkbox"
          checked={allChecked}
          onChange={(e) => {
            e.stopPropagation()
            onToggleFolder(folder.id)
          }}
          className={S.checkbox()}
        />
      </div>

      {folder.isExpanded && (
        <div className={S.urlList()}>
          {folder.folders?.map((subFolder) => (
            <BookmarkFolder
              key={subFolder.id}
              folder={subFolder}
              onToggleExpand={onToggleExpand}
              onToggleUrl={onToggleUrl}
              onToggleFolder={onToggleFolder}
              onDeleteUrl={onDeleteUrl}
              onDeleteFolder={onDeleteFolder}
            />
          ))}

          {folder.urls.map((url) => (
            <BookmarkUrlItem
              key={url.id}
              url={url}
              onToggle={() => onToggleUrl(folder.id, url.id)}
              onDelete={() => onDeleteUrl(folder.id, url.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BookmarkFolder
