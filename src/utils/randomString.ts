export default function(): string {
  return Math.random()
    .toString(36)
    .substring(7)
}
