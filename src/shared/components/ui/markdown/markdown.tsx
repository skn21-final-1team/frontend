import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import * as S from './markdown.style'

type MarkdownProps = {
  text: string
  components?: Components
}

function Markdown({ text, components }: MarkdownProps) {
  return (
    <div className={S.content()}>
      <ReactMarkdown components={components}>{text}</ReactMarkdown>
    </div>
  )
}

export default Markdown
