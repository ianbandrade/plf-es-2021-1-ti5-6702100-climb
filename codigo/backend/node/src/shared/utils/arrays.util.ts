export function chunkArray<T>(array: T[], chunkSize = 1): T[][] {
  const chunks = [];

  while (array.length) {
    chunks.push(array.splice(0, chunkSize));
  }

  return chunks;
}
