import { tableCutter } from "../../data/tableCutter.js";
import { ignoredTitleArticles } from "../../data/ignoredTitleArticles.js";

export const getCutterCode = (lastname, title) => {
  if (lastname) {
    const cutterIndex = lastname.substr(0, 2);
    if (tableCutter[cutterIndex]) {
      const matches = tableCutter[cutterIndex].filter(({ string }) => {
        return lastname.substring(0, string.length) === string;
      });

      const code = matches[matches.length - 1].code;
      if (!title) {
        throw new Error("É necessário cadastrar um título");
      }
      return `${lastname[0].toUpperCase()}${code}${formatTitleCode(title)}`;
    }
  }
  throw new Error("Dados inconsistentes para gerar o código");
};

export const parseBookFromApiToForm = (
  {
    authors,
    title,
    subtitle,
    location,
    publisher,
    year,
    pageCount,
    subjects,
    message,
  },
  isbn
) => {
  if (message) {
    return {
      message,
      isbn,
    };
  }
  const lastname = formatLastName(authors[0]);

  const bookInfo = {
    id: isbn,
    isbn,
    message,
    "082": ["", isbn],
    "090": ["", getCutterCode(lastname, title), ""],
    100: [lastname],
    245: [title, subtitle ?? ""],
    260: [location ?? "", publisher ?? "", year ?? ""],
    300: [pageCount ?? ""],
    650: [subjects.join(", ")],
    999: [""],
  };

  return bookInfo;
};

export const parseBookFieldsToForm = (fields) => {
  const values = {};
  Object.values(fields).forEach((field) => {
    const [boxId, ___] = field.id.split("-");
    values[boxId] = values[boxId] ?? [];

    values[boxId].push(field.value);
  });
  values.isbn = values["082"][1];

  if (values["100"][0].length > 0) {
    values["090"][1] = getCutterCode(values[100][0], values[245][0]);
  }

  return values;
};

const formatLastName = (name) => {
  if (name) {
    const nameArray = name.split(" ");
    const lastname = capitalize(nameArray.pop());

    if (nameArray.length > 1) {
      const firstLetters = nameArray.map((name) => name[0].toUpperCase());
      return `${lastname}, ${firstLetters.join(". ")}.`;
    }

    return `${lastname}, ${capitalize(nameArray[0])}`;
  }

  return "";
};

const formatTitleCode = (title) => {
  const titleArray = title.toLowerCase().split(" ");

  if (ignoredTitleArticles.pt.find((article) => article === titleArray[0])) {
    return titleArray[1][0];
  }

  return titleArray[0][0];
};

export const capitalize = (name) => {
  const firstLetter = name[0];
  if (firstLetter) {
    return firstLetter.toUpperCase() + name.substring(1).toLowerCase();
  }
  return name;
};
