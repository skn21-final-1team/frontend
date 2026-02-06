'use client'

import { useState } from 'react'
import type { BookmarkFolderList, BookmarkFolder as BookmarkFolderType } from './types/bookmarks'
import BookmarkFolder from './components/bookmark-folder'
import AddUrlButton from './components/add-url-button'
import * as S from './source.style'

const MOCK_FOLDERS: BookmarkFolderList = [
  {
    id: '1',
    name: '프로젝트 자료',
    isExpanded: true,
    folders: [
      {
        id: '1-sub',
        name: '회의록',
        isExpanded: true,
        urls: [
          {
            id: '1-sub-1',
            title: '1차 회의록',
            url: 'https://notion.so/meeting1',
            isChecked: false,
          },
          {
            id: '1-sub-2',
            title: '2차 회의록',
            url: 'https://notion.so/meeting2',
            isChecked: false,
          },
          {
            id: '1-sub-3',
            title: '최종 발표자료',
            url: 'https://docs.google.com',
            isChecked: true,
          },
        ],
      },
    ],
    urls: [
      { id: '1-1', title: '구글 드라이브', url: 'https://drive.google.com', isChecked: false },
      { id: '1-2', title: '노션 페이지', url: 'https://notion.so', isChecked: true },
    ],
  },
  {
    id: '2',
    name: '디자인 참고',
    isExpanded: true,
    folders: [
      {
        id: '2-sub',
        name: 'UI 레퍼런스',
        isExpanded: false,
        urls: [{ id: '2-sub-1', title: 'Behance', url: 'https://behance.net', isChecked: false }],
      },
    ],
    urls: [
      { id: '2-1', title: '피그마', url: 'https://figma.com', isChecked: false },
      { id: '2-2', title: 'Dribbble', url: 'https://dribbble.com', isChecked: false },
    ],
  },
]

function Source() {
  const [folders, setFolders] = useState<BookmarkFolderList>(MOCK_FOLDERS)

  const updateFolderRecursive = (
    folders: BookmarkFolderList,
    folderId: string,
    updateFn: (folder: BookmarkFolderType) => BookmarkFolderType,
  ): BookmarkFolderList => {
    return folders.map((folder) => {
      if (folder.id === folderId) {
        return updateFn(folder)
      }
      if (folder.folders) {
        return {
          ...folder,
          folders: updateFolderRecursive(folder.folders, folderId, updateFn),
        }
      }
      return folder
    })
  }
  const handleToggleExpand = (folderId: string) => {
    setFolders((prev) =>
      updateFolderRecursive(prev, folderId, (folder) => ({
        ...folder,
        isExpanded: !folder.isExpanded,
      })),
    )
  }
  const handleToggleUrl = (folderId: string, urlId: string) => {
    setFolders((prev) =>
      updateFolderRecursive(prev, folderId, (folder) => ({
        ...folder,
        urls: folder.urls.map((url) =>
          url.id === urlId ? { ...url, isChecked: !url.isChecked } : url,
        ),
      })),
    )
  }
  const isAllCheckedRecursive = (folder: BookmarkFolderType): boolean => {
    const urlsChecked = folder.urls.every((url) => url.isChecked)
    const foldersChecked = folder.folders
      ? folder.folders.every((f) => isAllCheckedRecursive(f))
      : true
    return urlsChecked && foldersChecked
  }

  const setAllCheckedRecursive = (
    folder: BookmarkFolderType,
    checked: boolean,
  ): BookmarkFolderType => {
    return {
      ...folder,
      urls: folder.urls.map((url) => ({ ...url, isChecked: checked })),
      folders: folder.folders
        ? folder.folders.map((f) => setAllCheckedRecursive(f, checked))
        : undefined,
    }
  }

  const handleToggleFolder = (folderId: string) => {
    setFolders((prev) =>
      updateFolderRecursive(prev, folderId, (folder) => {
        const allChecked = isAllCheckedRecursive(folder)
        return setAllCheckedRecursive(folder, !allChecked)
      }),
    )
  }

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
            onToggleExpand={handleToggleExpand}
            onToggleUrl={handleToggleUrl}
            onToggleFolder={handleToggleFolder}
          />
        ))}

        <AddUrlButton onClick={handleAddUrl} />
      </div>
    </section>
  )
}

export default Source
