import Markdown from '@/shared/components/ui/markdown/markdown'
import * as S from './preview-section.style'

interface PreviewSectionProps {
  content: string
}

function PreviewSection({ content }: PreviewSectionProps) {

  if (!content.trim()) {
    return (
      <section className={S.section()}>
        <div className={S.inner()}>
          <div className={S.empty()}>
            미리볼 문서가 아직 없습니다. 채팅 또는 에이전트 작업을 진행해 주세요.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={S.section()}>
      <div className={S.inner()}>
        <Markdown text={content} />
      </div>
    </section>
  )
}
export default PreviewSection
