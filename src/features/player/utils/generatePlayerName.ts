const title = [
  "Captain",
  "Professor",
  "Doctor",
  "Count",
  "King",
  "Sir",
  "Queen",
  "Lord",
  "Duchess",
  "Baron",
];

const playerName = [
  "Bubbles",
  "Pancake",
  "Pickle",
  "Sausage",
  "Waffle",
  "Cheese",
  "Tomato",
  "Muffin",
  "Bacon",
  "Donut",
];

export const generatePlayerName = () =>
  `${title[Math.floor(Math.random() * title.length)]} ${
    playerName[Math.floor(Math.random() * playerName.length)]
  }`;
