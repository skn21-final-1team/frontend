import type { StudioContent } from '../right/types/studio'

export const MOCK_STUDIO_CONTENTS: StudioContent[] = [
  {
    content_id: 1,
    type: 'quiz',
    contents: [
      {
        id: 1,
        question: "내 이름은 무엇인가요?",
        answer: [
          {
            id: 1,
            text: '테라',
            hint: '내 이름은 테라가 맞아요',
            is_correct: true,
          },
          {
            id: 2,
            text: '홍길동',
            hint: '내 이름은 2글자 입니다',
            is_correct: false,
          },
          {
            id: 3,
            text: '김철수',
            hint: '내 이름은 2글자 입니다',
            is_correct: false,
          },
          {
            id: 4,
            text: '이영희',
            hint: '내 이름은 2글자 입니다',
            is_correct: false,
          },
        ],
      },
      {
        id: 2,
        question: '가장 좋아하는 색깔은 무엇인가요?',
        answer: [
          {
            id: 1,
            text: '빨강',
            hint: '정답입니다! 빨강은 열정을 상징하는 색입니다.',
            is_correct: true,
          },
          {
            id: 2,
            text: '파랑',
            hint: '틀렸습니다. 파랑은 차분함을 상징합니다.',
            is_correct: false,
          },
          {
            id: 3,
            text: '초록',
            hint: '틀렸습니다. 초록은 자연을 상징합니다.',
            is_correct: false,
          },
          {
            id: 4,
            text: '노랑',
            hint: '틀렸습니다. 노랑은 밝음을 상징합니다.',
            is_correct: false,
          },
        ],
      },
    ],
  },
  {
    content_id: 2,
    type: 'flashcard',
    contents: [
      {
        id: 1,
        question: '내 이름은 무엇인가요?',
        answer: '테라',
      },
      {
        id: 2,
        question: '가장 좋아하는 색깔은 무엇인가요?',
        answer: '빨강',
      },
    ],
  },
]