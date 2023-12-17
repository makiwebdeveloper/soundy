export function getRandomElementFromArray<T>(
  array: T[],
  excludedIndex?: number
): T {
  const filteredArray = array.filter((_, index) => index !== excludedIndex);

  const randomIndex = Math.floor(Math.random() * filteredArray.length);

  return filteredArray[randomIndex];
}
