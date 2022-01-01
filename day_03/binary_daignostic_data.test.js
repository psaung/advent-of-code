const { tests, eq } = require("../jstinytest");
const { compare, flipbit, extractBinary, extract } = require("../utils");

tests({
  "Flip bit": () => {
    eq(flipbit("01001"), "10110");
  },

  Compare: () => {
    const min = ["01101", "00100"];
    const max = ["11110", "10110", "10111"];
    eq(compare(min, max, "min"), min);
  },

  ExtractBinary: () => {
    eq(extractBinary("00010"), "2");
  },

  Extract: () => {
    const numbers = ["11110", "10110", "10111"];
    eq(extract(numbers, 1, "0"), "10110,10111,11110");
  },
});
