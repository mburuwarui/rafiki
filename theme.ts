import { createTheme } from "@mantine/core";

export const theme = createTheme({
  /* Put your mantine theme override here */
  primaryColor: "lime",
  primaryShade: 9,
  fontFamily: "Verdana, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: { fontFamily: "Greycliff CF, sans-serif" },
  colors: {
    lime: [
      "#f7ffe1",
      "#f0ffcb",
      "#e0ff99",
      "#d1ff62",
      "#c3ff36",
      "#baff18",
      "#b5ff00",
      "#9ee300",
      "#8bca00",
      "#76ae00",
    ],
  },
});
