import Crypto from "../pages/Crypto";
import Forensic from "../pages/Forensic";
import Webexploitation from "../pages/Webexploitation";
import Generalskill from "../pages/Generalskill";
import Reverseengineering from "../pages/Reverseengineering";
import Binaryexploitation from "../pages/Binaryexploitation";

export const colors = {
  backgroundPrimary: "#2d5986",
  backgroundSecondary: "#61d3ed",
  purple: "#27234b",
};

export const sectionData = [
  {
    id: 1,
    pagename: Generalskill,
    title: "General Skills",
    image: "general-skills.jpg",
    link: "/generalskill",
    details:
      "Generate Lorem Ipsum placeholder text. Select the number of characters, words, sentences or paragraphs, and hit generate!",
  },
  {
    id: 2,

    pagename: Crypto,
    title: "Cryptography",
    image: "crypto-logo.jpg",
    link: "/crypto",

    details:
      "Generate Lorem Ipsum placeholder text. Select the number of characters, words, sentences or paragraphs, and hit generate!",
  },
  {
    id: 3,

    pagename: Webexploitation,
    title: "Web Exploitation",
    image: "web-exploitation.jpg",
    link: "/webexploitation",
    details:
      "Generate Lorem Ipsum placeholder text. Select the number of characters, words, sentences or paragraphs, and hit generate!",
  },
  {
    id: 4,
    pagename: Binaryexploitation,
    title: "Binary Exploitation",
    image: "binary-exploitation.jpg",
    link: "/binaryexploitation",
    details:
      "Generate Lorem Ipsum placeholder text. Select the number of characters, words, sentences or paragraphs, and hit generate!",
  },
  {
    id: 5,
    pagename: Forensic,
    title: "Forensics",
    image: "forensics.jpg",
    link: "/forensic",
    details:
      "Generate Lorem Ipsum placeholder text. Select the number of characters, words, sentences or paragraphs, and hit generate!",
  },
  {
    id: 6,
    pagename: Reverseengineering,
    title: "Reverse Engineering",
    image: "reverse-engineering.jpg",
    link: "/reverseengineering",
    details:
      "Generate Lorem Ipsum placeholder text. Select the number of characters, words, sentences or paragraphs, and hit generate!",
  },
];
