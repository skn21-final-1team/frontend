import BookmarkFolder from './components/bookmark-folder'
import AddUrlButton from './components/add-url-button'
import * as S from './source.style'
import { filterFoldersByQuery, getFolderCheckedMap } from '../utils/bookmark-helpers'

import type { BookmarkFolderList } from './types/bookmarks'

interface SourceProps {
  folders: BookmarkFolderList
  searchQuery: string
  onSearchChange: (query: string) => void
  onToggleExpand: (folderId: string) => void
  onToggleUrl: (folderId: string, urlId: string) => void
  onToggleFolder: (folderId: string) => void
  onDeleteUrl: (folderId: string, urlId: string) => void
  onDeleteFolder: (folderId: string) => void
}

function Source({
  folders,
  searchQuery,
  onSearchChange,
  onToggleExpand,
  onToggleUrl,
  onToggleFolder,
  onDeleteUrl,
  onDeleteFolder,
}: SourceProps) {
  const handleAddUrl = () => {
    alert('URL 추가 기능은 추후 구현!')
  }

  const filteredFolders = filterFoldersByQuery(folders, searchQuery)
  const folderCheckedMap = getFolderCheckedMap(folders)

  return (
    <section className={S.section()}>
      <div className={S.inner()}>
        <div className={S.header()}>
          <span className={S.headerTitle()}>BOOKMARKS</span>
        </div>

        <div className={S.searchWrapper()}>
          <input
            type="text"
            placeholder="북마크 검색..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={S.searchInput()}
          />
        </div>

        <div className={S.folderList()}>
          {filteredFolders.map((folder) => (
            <BookmarkFolder
              key={folder.id}
              folder={folder}
              folderCheckedMap={folderCheckedMap}
              onToggleExpand={onToggleExpand}
              onToggleUrl={onToggleUrl}
              onToggleFolder={onToggleFolder}
              onDeleteUrl={onDeleteUrl}
              onDeleteFolder={onDeleteFolder}
            />
          ))}
        </div>

        <AddUrlButton onClick={handleAddUrl} />
      </div>
    </section>
  )
}

export default Source
