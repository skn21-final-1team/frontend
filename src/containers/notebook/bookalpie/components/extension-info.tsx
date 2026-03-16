import * as S from './extension-info.style'

export function ExtensionInfo() {
  return (
    <div className={S.container()}>
      <h4 className={S.title()}>사용 방법:</h4>
      <ol className={S.list()}>
        <li>Bookalpie 팝업 열고 cloud 클릭</li>
        <li>전송할 북마크 체크하고 키 입력</li>
        <li>전송이 완료되면 새로고침</li>
      </ol>
    </div>
  )
}
