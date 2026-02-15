import * as S from './message-user.style'

interface MessageUserProps {
  message: string
}

function MessageUser({ message }: MessageUserProps) {
  return (
    <div className={S.container()}>
      <div className={S.bubble()}>
        <p className={S.content()}>{message}</p>
      </div>
    </div>
  )
}

export default MessageUser
