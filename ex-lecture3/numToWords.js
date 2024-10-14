const numbers = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
  70: "seventy",
  80: "eighty",
  90: "ninety",
};

function numberToWords(number) {
  if (typeof number === "number") {
    if (number in numbers) return numbers[number];

    let words = "";

    if (number >= 1000000) {
      words += numberToWords(Math.floor(number / 1000000)) + " million";
      number %= 1000000;
      if (number > 0) words += " ";
    }

    if (number >= 1000) {
      words += numberToWords(Math.floor(number / 1000)) + " thousand";
      number %= 1000;
      if (number > 0) words += " ";
    }

    if (number >= 100) {
      words += numberToWords(Math.floor(number / 100)) + " hundred";
      number %= 100;
      if (number > 0) words += " and ";
    }

    if (number > 0) {
      if (number < 20) words += numbers[number];
      else {
        words += numbers[Math.floor(number / 10) * 10];
        if (number % 10 > 0) words += " " + numbers[number % 10];
      }
    }

    return words;
  }
  return "Enter a number!"
}

const number = 1234;
// const languages = ["mk", "en"];
const result = numberToWords(1234);
console.log(result);
// {
//     mk: "една илјада двеста триесет и четири.",
//     en: "one thousand two hundred thirty four."
// }
