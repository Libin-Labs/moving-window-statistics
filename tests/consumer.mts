import * as api from '@lp-labs/moving-window-statistics';
import { movingWindowStats } from '@lp-labs/moving-window-statistics';
const windows = movingWindowStats([1, 2, 3, 4], 2);
if (windows.length !== 3 || windows[0]?.mean !== 1.5) throw new Error('Window mismatch');
// @ts-expect-error invalid argument must be rejected by declarations
api.movingWindowStats('not an array', 2);
