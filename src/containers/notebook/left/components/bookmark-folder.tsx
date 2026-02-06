import Image from 'next/image'
import type { BookmarkFolder as BookmarkFolderType } from '../types/bookmarks'
import BookmarkUrlItem from './bookmark-url-item'
import * as S from './bookmark-folder.style'

interface BookmarkFolderProps {
  folder: BookmarkFolderType
  onToggleExpand: (folderId: string) => void
  onToggleUrl: (folderId: string, urlId: string) => void
  onToggleFolder: (folderId: string) => void
}

function BookmarkFolder({
  folder,
  onToggleExpand,
  onToggleUrl,
  onToggleFolder,
}: BookmarkFolderProps) {
  const allChecked = folder.urls.length > 0 && folder.urls.every((url) => url.isChecked)

  return (
    <div className={S.wrapper()}>
      <div className={S.header()}>
        <Image
          src="/chevron-right.svg"
          alt="expand"
          width={16}
          height={16}
          className={`${S.chevron()} ${folder.isExpanded ? S.chevronOpen() : ''}`}
          onClick={() => onToggleExpand(folder.id)}
        />

        <div
          className="flex flex-1 items-center gap-2 cursor-pointer"
          onClick={() => onToggleExpand(folder.id)}
        >
          <Image src="/folder.svg" alt="folder" width={16} height={16} className={S.folderIcon()} />
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
            />
          ))}

          {folder.urls.map((url) => (
            <BookmarkUrlItem
              key={url.id}
              url={url}
              onToggle={() => onToggleUrl(folder.id, url.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BookmarkFolder
