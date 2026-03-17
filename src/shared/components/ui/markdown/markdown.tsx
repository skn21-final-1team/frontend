import React from 'react'
import ReactMarkdown from 'react-markdown'
import * as S from './markdown.style'

type Props = {
  text: string
}
function Markdown({ text }: Props) {
  return (
    <div className={S.content()}>
      <ReactMarkdown
        skipHtml
        components={{
          a: (props) => <a {...props} target="_blank" rel="noreferrer" />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown
