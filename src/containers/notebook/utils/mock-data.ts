import type { BookmarkFolderList } from '../left/types/bookmarks'

export const MOCK_FOLDERS: BookmarkFolderList = [
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
            isChecked: false,
          },
        ],
      },
    ],
    urls: [
      { id: '1-1', title: '구글 드라이브', url: 'https://drive.google.com', isChecked: false },
      { id: '1-2', title: '노션 페이지', url: 'https://notion.so', isChecked: false },
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
