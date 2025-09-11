정적사이트 제작

도메인 = Gospellist.org

백엔드 = 없음(json 데이터 직접 운용)

라이브러리 = {
react,
vite js swc,
Radix UI,
react-router-dom
상태관리 : rtk(redux-toolkit)
json fetch : redux-thunk, axios
}
// 사용안함 = styled-components, zustand

배포 = vercel

사이트 데이터 = {
ko.json //한국어 메뉴, 설명 등,
en.json //영어메뉴, 설명 등,
data.json //후원자수, 후원금액, URLs, 진행상황, 등
}

테마컬러 = [ 48466D, 3D84A8, 46CDCF, ABEDD8]

로고컬러 = 테마컬러[2]

데이터 출력 로직
react-component -> axios(fetch) -> thunk -> redux -> useSelector -> UI업데이트

상태 = {언어, 테마, 후원폼 등}
