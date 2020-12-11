export const marks = [
  {
    value: -10,
    label: "10",
  },
  {
    value: -9,
    label: "9",
  },
  {
    value: -8,
    label: "8",
  },
  {
    value: -7,
    label: "7",
  },
  {
    value: -6,
    label: "6",
  },
  {
    value: -5,
    label: "5",
  },
  {
    value: -4,
    label: "4",
  },
  {
    value: -3,
    label: "3",
  },
  {
    value: -2,
    label: "2",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
];

export const indexToFraction = {
  2: 1 / 2,
  3: 1 / 3,
  4: 1 / 4,
  5: 1 / 5,
  6: 1 / 6,
  7: 1 / 7,
  8: 1 / 8,
  9: 1 / 9,
  10: 1 / 10,
};

export const decimalToIndex = (decimal) => {
  for (let i = 2; i <= 10; i++) {
    if (decimal > indexToFraction[i] - 0.001) {
      return i;
    }
  }
  return -1;
};
