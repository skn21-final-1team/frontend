import BookmarkFolder from './components/bookmark-folder'
import AddUrlButton from './components/add-url-button'
import * as S from './source.style'

import type { BookmarkFolderList } from './types/bookmarks'

interface SourceProps {
  folders: BookmarkFolderList
  onToggleExpand: (folderId: string) => void
  onToggleUrl: (folderId: string, urlId: string) => void
  onToggleFolder: (folderId: string) => void
  onDeleteUrl: (folderId: string, urlId: string) => void
  onDeleteFolder: (folderId: string) => void
}

function Source({
  folders,
  onToggleExpand,
  onToggleUrl,
  onToggleFolder,
  onDeleteUrl,
  onDeleteFolder,
}: SourceProps) {
  const handleAddUrl = () => {
    alert('URL 추가 기능은 추후 구현!')
  }

  return (
    <section className={S.section()}>
      <div className={S.inner()}>
        <div className={S.header()}>
          <span className={S.headerTitle()}>BOOKMARKS</span>
        </div>

        {folders.map((folder) => (
          <BookmarkFolder
            key={folder.id}
            folder={folder}
            onToggleExpand={onToggleExpand}
            onToggleUrl={onToggleUrl}
            onToggleFolder={onToggleFolder}
            onDeleteUrl={onDeleteUrl}
            onDeleteFolder={onDeleteFolder}
          />
        ))}

        <AddUrlButton onClick={handleAddUrl} />
      </div>
    </section>
  )
}

export default Source
