import * as S from './extension-info.style'

export function ExtensionInfo() {
  return (
    <div className={S.container()}>
      <h4 className={S.title()}>사용 방법:</h4>
      <ol className={S.list()}>
        <li>Chrome 스토어에서 Bookalpie 설치</li>
        <li>Bookalpie 팝업 열고 상단에 키 입력</li>
        <li>북마크 자동 동기화</li>
      </ol>
    </div>
  )
}
