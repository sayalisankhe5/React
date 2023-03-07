export function filterData(searchWord, restoList) {
  return restoList.filter((r) =>
    r.data.name.toLowerCase().includes(searchWord.toLowerCase())
  );
}

export function filterMenuData(data, categoryName) {
  if (categoryName == "All") {
    return data;
  }
  return data.filter(
    (item) => item.category.toLowerCase() == categoryName.toLowerCase()
  );
}
