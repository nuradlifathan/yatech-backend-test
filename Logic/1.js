const findSubArray = (a, m, k) => {
  let count = 0;
  for (let i = 0; i <= a.length - m; i++) {
    let subarray = a.slice(i, i + m); // Get subarray of length m
    console.log(`Subarray a[${i}..${i + m - 1}] = [${subarray}]`);
    for (let j = 0; j < m; j++) {
      for (let l = j + 1; l < m; l++) {
        if (subarray[j] + subarray[l] === k && j !== l) {
          console.log(
            `Pair found : a[${i + j}] + a[${i + l}] = ${subarray[j]} + ${
              subarray[l]
            } = ${k}`
          );
          count++; //
        }
      }
    }
  }
  return count;
};

const a = [2, 4, 7, 5, 3, 5, 8, 5, 1, 7];
const m = 4;
const k = 10;
console.log(findSubArray(a, m, k));

const a2 = [15, 8, 8, 2, 6, 4, 1, 7];
const m2 = 2;
const k2 = 8;
console.log(findSubArray(a2, m2, k2));
