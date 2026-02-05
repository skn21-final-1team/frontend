import type { Message } from '../types/message'
import * as S from './message-user.style'

interface MessageUserProps {
  message: Message
}

function MessageUser({ message }: MessageUserProps) {
  return (
    <div className={S.container()}>
      <div className={S.bubble()}>
        <p className={S.content()}>{message.content}</p>
      </div>
    </div>
  )
}

export default MessageUser
