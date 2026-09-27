export interface Language {
  name: string;
  level: string;
  description: string;
}

export const languages: Language[] = [
  {
    name: "Spanish",
    level: "Native",
    description:
      "First language; full professional and conversational fluency.",
  },
  {
    name: "English",
    level: "Advanced",
    description:
      "Full professional proficiency in technical and business environments.",
  },
  {
    name: "French",
    level: "Intermediate",
    description:
      "Strong reading, technical comprehension, and written interpretation capabilities.",
  },
];