const vowels = ["a", "e", "i", "o", "u"];

function pigLatin(sentence) {
  if (sentence.length === 0) return "";

  const words = sentence.split(" ");

  const pigLatinWords = words.map((word) => {
    const punctuation = word.match(/[.,!?;]$/) ? word.match(/[.,!?;]$/)[0] : "";
    const cleanWord = word.replace(/[.,!?;]$/, "");
    const firstChar = cleanWord.charAt(0).toLowerCase();
    let result = cleanWord;

    if (vowels.includes(firstChar)) {
      result += "way";
    } else {
      result = cleanWord.slice(1) + firstChar + "ay";
    }
    if (cleanWord.charAt(0) === cleanWord.charAt(0).toUpperCase()) {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }
    return result + punctuation;
  });

  return pigLatinWords.join(" ");
}

console.log(pigLatin("Cats are great pets."));
console.log(pigLatin("Tom got a small piece of pie."));
console.log(pigLatin("He told us a very exciting tale."));
