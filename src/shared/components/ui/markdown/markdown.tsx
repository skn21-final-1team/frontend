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
      <ReactMarkdown
        skipHtml
        components={{
          a: (props) => <a {...props} target="_blank" rel="noreferrer" />,
          ...components,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown
