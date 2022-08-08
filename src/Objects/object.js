const tools = [
  {
    id: "1",
    link: "roman",
    description:
      "Convert figure to roman numeral, inputs must a whole or integer number. ",
    reverseDescription:
      "Accepted keys are those of roman numerals, which are MDCLXVI. Any other character results into error. This app can't know a correct roman numeral, if you enter a wrong roman numeral the result might be wrong. Always input a correct roman numeral which is guaranteed to give 100% correct result",
    name: "roman numeral converter",
    reverseName: "convert roman numeral back to integer",
    OBJ: {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    },
    code: function (num, setState, OBJ) {
      let strs = "";
      if (isNaN(Number(num))) {
        setState("invalid input, input must be an integer");
        return "invalid input, input must be an integer";
      }
      for (let key in OBJ)
        while (+num >= OBJ[key]) {
          strs += key;
          num -= OBJ[key];
        }
      setState(strs);
      return strs;
    },
    reverseCode: (strs, setState, OBJ) => {
      const acceptable = "IVXLCDM";
      if ([...strs.toUpperCase()].every((item) => !acceptable.includes(item))) {
        setState("valid inputs are MDCLXVI  letters");
        return "valid inputs are MDCLXVI  letters";
      }
      let num = 0;
      const arr = [];
      for (let str of strs.toUpperCase()) arr.push(OBJ[str]);
      for (let [i, e] of Object.entries(arr)) {
        if (e < arr[+i + 1]) num -= e;
        else num += e;
      }
      setState(num);
      return num;
    },
  },

  {
    id: "2",
    link: "morse",
    name: "morse code converter",
    description:
      "Convert words to morse code. Morse code is archaic way of storing data, it has deprecated since the advent of binary.",
    reverseDescription: `Enter a valid morse code character: whish is a bunch of dots (.) and dash (-).`,
    reverseName: "convert morse code to words ",
    OBJ: [
      ".-",
      "-...",
      "-.-.",
      "-..",
      ".",
      "..-.",
      "--.",
      "....",
      "..",
      ".---",
      "-.-",
      ".-..",
      "--",
      "-.",
      "---",
      ".--.",
      "--.-",
      ".-.",
      "...",
      "-",
      "..-",
      "...-",
      ".--",
      "-..-",
      "-.--",
      "--..",
      ".----",
      "..---",
      "...--",
      "....-",
      ".....",
      "-....",
      "--...",
      "---..",
      "----.",
      "-----",
    ],
    reverseCode: (input, setState, OBJ) => {
      const morseObj = { "...---...": "SOS", "-.-.--": "!", ".-.-.-": "." };
      const ASCII = `ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`;
      if (!input.includes("-") && !input.includes(".")) {
        setState("invalid input, enter correct morse code");
        return;
      }
      for (let [index, morse] of Object.entries(OBJ))
        morseObj[morse] = ASCII[index];
      const morse = input
        .split("   ")
        .map((words) =>
          words
            .split(" ")
            .map((letter) => morseObj[letter])
            .join("")
        )
        .join(" ");
      setState(morse);
      return morse;
    },
    code: (input, setState, OBJ) => {
      const morseObj = { SOS: "...---...", "!": "-.-.--", ".": ".-.-.-" };
      const ASCII = `ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`;
      for (let [index, morse] of Object.entries(OBJ))
        morseObj[ASCII[index]] = morse;
      const str = input
        .toUpperCase()
        .split(" ")
        .map((item) => [...item].map((_item) => morseObj[_item]).join` `)
        .join`   `;
      setState(str);
      console.log(morseObj);
      return str;
    },
  },
  {
    name: "human readable time",
    description:
      "Convert seconds to human readable time. e.g 2 years, 7 days and 1 second",
    link: "readable_time",
    code: (seconds, setState) => {
      if (!seconds) {
        setState("now");
        return;
      }
      if (isNaN(Number(seconds))) {
        setState("invalid inputs, input must be integer");
        return;
      }
      const TIME = { ss: 1, mm: 60, hh: 3600, dd: 86_400, yy: 31_536_000 };
      const { ss, mm, dd, hh, yy } = TIME;
      const { floor } = Math;
      const YY = floor(seconds / yy);
      const DD = floor((seconds % yy) / dd);
      const HH = floor(((seconds % yy) % dd) / hh);
      const MM = floor((((seconds % yy) % dd) % hh) / mm);
      const SS = floor(((((seconds % yy) % dd) % hh) % mm) / ss);
      const dis = (x, t) => `${x} ${x > 1 ? t + "s" : t}`;
      const ARRAY = [];
      const TIME_ARRAY = [
        [YY, "year"],
        [DD, "day"],
        [HH, "hour"],
        [MM, "minute"],
        [SS, "second"],
      ].filter((t) => t[0] !== 0);
      for (let arr of TIME_ARRAY) {
        const { length } = TIME_ARRAY;
        let A = arr[0],
          B = arr[1];
        if (length === 1) ARRAY.push(`${dis(A, B)}`);
        else {
          if (TIME_ARRAY.indexOf(arr) === length - 1)
            ARRAY.push(`and ${dis(A, B)}`);
          else if (TIME_ARRAY.indexOf(arr) === length - 2)
            ARRAY.push(`${dis(A, B)}`);
          else ARRAY.push(`${dis(A, B)},`);
        }
      }
      setState(ARRAY.join(" ").trim());
      return ARRAY.join(" ").trim();
    },
  },
  {
    name: "most frequent words",
    description:
      "Enter bunch of words to return top three most frequent words ",
    link: "frequent_words",
    code: (text, setState) => {
      const newText = text
        .toLowerCase()
        .replace(/[^a-z\s\n0-9']/g, "")
        .split(" ");
      const newArr = [];
      for (let a = 0; a < 3; a++) {
        const countArr = [0];
        let final = "",
          debug = "";
        for (let str of newText) {
          if (str === "'" || newArr.includes(str)) continue;
          let count = 0;
          let lastCount = countArr[countArr.length - 1];
          for (let _str of newText) {
            str === _str && str && count++;
            debug = str && str;
          }
          if (count > lastCount) {
            countArr.push(count);
            final += debug + " ";
          }
        }
        let sFin = final.split(" ");
        newArr.push(sFin[sFin.length - 2]);
      }
      setState(newArr.filter((a) => a !== undefined).join(" "));
      return newArr.filter((a) => a !== undefined);
    },
  },
];
export default tools;
