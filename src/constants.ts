export type FontScalePresets = {
  majorSecond: Array<number>
  minorThird: Array<number>
  majorThird: Array<number>
  perfectFourth: Array<number>
  augmentedFourth: Array<number>
}

export const fontScalePresets: FontScalePresets = {
  majorSecond: [1.802, 1.602, 1.424, 1.266, 1.125, 1],
  minorThird: [2.488, 2.074, 1.728, 1.44, 1.2, 1],
  majorThird: [3.052, 2.441, 1.953, 1.563, 1.25, 1],
  perfectFourth: [4.209, 3.157, 2.369, 1.777, 1.333, 1],
  augmentedFourth: [5.653, 3.998, 2.827, 1.999, 1.414, 1],
}
