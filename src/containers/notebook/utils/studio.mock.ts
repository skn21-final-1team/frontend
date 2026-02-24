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
        question: '현행 10·15 규제에 따르면 서울 내 15억 원 이하 주택의 담보대출 한도는 얼마인가요?',
        answer: '6억 원입니다.',
      },
      {
        id: 2,
        question: 'GDP(국내총생산)의 정의는 무엇인가요?',
        answer: '일정 기간 동안 한 나라 안에서 생산된 모든 최종 재화와 서비스의 시장 가치의 합계입니다.',
      },
      {
        id: 3,
        question: '인플레이션이란 무엇인가요?',
        answer: '물가 수준이 지속적으로 상승하여 화폐의 구매력이 하락하는 경제 현상입니다.',
      },
      {
        id: 4,
        question: '기준금리를 인상하면 경제에 어떤 영향을 미치나요?',
        answer: '대출 이자가 올라 소비와 투자가 줄어들고, 물가 상승 압력이 완화됩니다.',
      },
      {
        id: 5,
        question: 'ETF(상장지수펀드)란 무엇인가요?',
        answer: '특정 지수의 움직임을 따라가도록 설계된 펀드로, 주식처럼 거래소에서 매매할 수 있습니다.',
      },
      {
        id: 6,
        question: '복리(compound interest)의 원리를 설명하세요.',
        answer: '원금뿐만 아니라 이전에 발생한 이자에도 이자가 붙는 방식으로, 시간이 지날수록 자산이 기하급수적으로 증가합니다.',
      },
      {
        id: 7,
        question: '재정정책과 통화정책의 차이는 무엇인가요?',
        answer: '재정정책은 정부가 세금과 지출을 조절하는 것이고, 통화정책은 중앙은행이 금리와 통화량을 조절하는 것입니다.',
      },
      {
        id: 8,
        question: 'PER(주가수익비율)은 무엇을 의미하나요?',
        answer: '주가를 주당순이익(EPS)으로 나눈 값으로, 기업의 수익 대비 주가가 얼마나 비싼지를 나타내는 지표입니다.',
      },
      {
        id: 9,
        question: '환율이 상승하면 수출 기업에 어떤 영향을 미치나요?',
        answer: '원화 가치가 하락하여 해외에서 우리 상품이 상대적으로 저렴해지므로, 수출 경쟁력이 높아지고 수출 기업의 매출이 증가합니다.',
      },
      {
        id: 10,
        question: '국채란 무엇이며 왜 안전자산으로 분류되나요?',
        answer: '국가가 발행하는 채권으로, 국가의 신용을 기반으로 하기 때문에 부도 위험이 매우 낮아 안전자산으로 분류됩니다.',
      },
    ],
  },
]