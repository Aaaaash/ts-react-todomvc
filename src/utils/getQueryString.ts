function getQueryString(name: string): string {
  const regExp = `(^|&)${name}=([^&]*)(&|$)`;
  const reg = new RegExp(regExp, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return decodeURIComponent(r[2]);
  }
  return '';
}

export default getQueryString;
