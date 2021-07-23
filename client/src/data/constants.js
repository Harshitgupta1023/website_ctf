import crypto from "../media/crypto-logo.jpg";
import forensics from "../media/forensics.jpg";
import reverseEngineering from "../media/reverse-engineering.jpg";
import webExploitation from "../media/web-exploitation.jpg";
import binaryExploitation from "../media/binary-exploitation.jpg";

export const colors = {
  random: "#2d5986",
  backgroundSecondary: "#424242",
  backgroundPrimary: "#424242",
  primaryDark: "#27234b",
  secondaryDark: "#2D2926FF",
  purple: "#7303fc",
  primaryTertiary: "#80b3ff",
  textPrimary: "#fff",
};

export const clients = {
  GOOGLE_CLIENT_ID:
    "1099211349164-8cjb0n7v47e83ftbp1eomrc80nkrri70.apps.googleusercontent.com",
  GITHUB_CLIENT_ID: "ed484ec2e37a4ae61e1b",
};

export const button = {
  buttonBackgroundColor: "#f50057",
  buttonHoverColor: "#dc004e",
  buttonColor: "#fff",
  buttonFontWeight: "bolder",
  buttonTextTransform: "none",
  buttonFontSize: "20px",
};

export const home = {
  backgroundPrimary: "#1A202C",
  backgroundSecondary: "#2D3748",
};

export const tools = {
  backgroundPrimary: "#1A202C",
  backgroundSecondary: "#2D3748",
};

export const sectionData = [
  {
    id: 1,
    category: "general-skills",
    title: "General Skills",
    image: "general-skills.jpg",
    link: "/general-skills",
    details:
      "Challenges to improve your General Problem Solving ability.This Category requires Knowledge about Shell.",
  },
  {
    id: 2,
    category: "cryptography",
    title: "Cryptography",
    image: "crypto-logo.jpg",
    link: "/cryptography",

    details:
      "Cryptography is a method of protecting information and communications through the use of codes.",
  },
  {
    id: 3,
    category: "web-exploitation",
    title: "Web Exploitation",
    image: "web-exploitation.jpg",
    link: "/web-exploitation",
    details:
      "Each programming language has its own set of vulnerabilities that developers should be aware of.",
  },
  {
    id: 4,
    category: "binary-exploitation",
    title: "Binary Exploitation",
    image: "binary-exploitation.jpg",
    link: "/binary-exploitation",
    details:
      "The majority of the binaries you'll see in CTFs are Linux ELF files, with the occasional Windows executable thrown in for good measure.",
  },
  {
    id: 5,
    category: "forensics",
    title: "Forensics",
    image: "forensics.jpg",
    link: "/forensics",
    details:
      "Forensics is the art of recovering the digital trail left on a computer. Any challenge involving the processing of concealed data from static data files.",
  },
  {
    id: 6,
    category: "reverse-engineering",
    title: "Reverse Engineering",
    image: "reverse-engineering.jpg",
    link: "/reverse-engineering",
    details:
      "The purpose of a reverse engineering task is frequently to understand the functionality of a given software so that deeper faults can be identified.",
  },
];

export const homeCategoryDetails = [
  {
    id: 1,
    title: "Cryptography",
    description:
      "We can utilise banking apps, send sensitive information over the internet, and secure our privacy in general thanks to cryptography. However, a substantial portion of CTFs entails decrypting widely used encryption algorithms that have been implemented incorrectly. Although the math may appear intimidating, a basic understanding of the fundamental principles will usually allow you to uncover flaws and crack the code. The term 'cryptography' refers to the practise of writing codes. ",
    image: crypto,
  },
  {
    id: 2,
    title: "Web Exploitation",
    description:
      "Various programming languages are used to create websites all around the world. While each programming language has its own set of vulnerabilities that developers should be aware of, there are some issues that are universal to the internet and can appear independently of the language or framework used. These flaws frequently appear in CTFs as web security challenges, in which the user must exploit a flawto obtain access to a higher degree of privilege.    ",
    image: webExploitation,
  },
  {
    id: 3,
    title: "Binary Exploitation",
    description:
      "Binaries, often known as executables, are computer programmes. The majority of the binaries you'll see in CTFs are Linux ELF files, with the occasional Windows executable thrown in for good measure. Binary Exploitation is a broad issue in Cyber Security that boils down to identifying a program's vulnerability and exploiting it to acquire control of a shell or change the program's functions. ",
    image: binaryExploitation,
  },
  {
    id: 4,
    title: "Forensics",
    description:
      "File format analysis, steganography, memory dump analysis, and network packet capture analysis are examples of 'forensics' challenges in a CTF. Any challenge involving the examination and processing of concealed data from static data files (rather than executable programmes or distant servers) could be classified as a forensics challenge.",
    image: forensics,
  },
  {
    id: 5,
    title: "Reverse Engineering",
    description:
      "In a CTF, reverse engineering is the process of translating a compiled (machine code, bytecode) programme back into a more human readable version. The purpose of a reverse engineering task is frequently to understand the functionality of a given software so that deeper faults can be identified.",
    image: reverseEngineering,
  },
];
