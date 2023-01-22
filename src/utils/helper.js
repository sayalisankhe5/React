export function filterData(searchWord, restoList) {
  return restoList.filter((r) =>
    r.data.name.toLowerCase().includes(searchWord.toLowerCase())
  );
}
