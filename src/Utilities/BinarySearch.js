const positions = {
  teams: 1,
  play: 2,
  "not-play": 2,
  "play-against": 2,
  "not-play-against": 2,
  locations: 3,
  weeks: 4,
  periods: 5,
  "at-least": 6,
  "at-most": 6,
};

export const findInsertIndex = (arr, target) => {
  let low = 1;
  let high = arr.length;
  console.log("arr", arr);
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    console.log(mid);
    if (positions[arr[mid].type] < positions[target]) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
};

export const sortConstraintBlockTypes = (arr) => {
  return arr.sort((a, b) => positions[a] - positions[b]);
};
