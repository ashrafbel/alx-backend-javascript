export default function updateUniqueItems(map) {
  if (!(map instanceof Map)) {
    throw new Error('Cannot process');
  }
  for (const [key, quantity] of map) {
    if (quantity === 1) {
      map.set(key, 100);
    }
  }
}
