export interface WindowStats {
  readonly start: number;
  readonly end: number;
  readonly mean: number;
  readonly variance: number;
}
export function movingWindowStats(values: readonly number[], windowSize: number): WindowStats[] {
  if (
    !Array.isArray(values) ||
    values.length > 1000000 ||
    values.some((v) => typeof v !== 'number' || !Number.isFinite(v))
  )
    throw new TypeError('Expected bounded finite series');
  if (!Number.isSafeInteger(windowSize) || windowSize < 1 || windowSize > values.length)
    throw new RangeError('Window must fit series');
  const sum = [0],
    squares = [0];
  for (const v of values) {
    sum.push(sum[sum.length - 1]! + v);
    squares.push(squares[squares.length - 1]! + v * v);
  }
  const out: WindowStats[] = [];
  for (let start = 0; start + windowSize <= values.length; start++) {
    const end = start + windowSize,
      total = sum[end]! - sum[start]!,
      mean = total / windowSize;
    const raw = squares[end]! - squares[start]!;
    out.push({ start, end, mean, variance: Math.max(0, raw / windowSize - mean * mean) });
  }
  return out;
}
