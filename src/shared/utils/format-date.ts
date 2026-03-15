export const formatExpiryDate = (isoString: string): string => {
  if (!isoString) return '날짜 정보 없음'

  const date = new Date(isoString)
  if (isNaN(date.getTime())) return '잘못된 날짜'

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

export const getTimeRemaining = (isoString: string): string => {
  if (!isoString) return '정보 없음'

  const date = new Date(isoString)
  if (isNaN(date.getTime())) return '잘못된 시간'

  const now = new Date().getTime()
  const expiry = date.getTime()
  const diff = expiry - now

  if (diff <= 0) return '만료됨'

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) {
    return minutes > 0 ? `${hours}시간 ${minutes}분 남음` : `${hours}시간 남음`
  }

  if (minutes > 0) return `${minutes}분 남음`
  return '곧 만료'
}
