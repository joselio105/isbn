import { tableCutter } from "../../data/tableCutter.js";

export const getCutterCode = (lastname, title) => {
  const cutterIndex = lastname.substr(0, 2);
  console.log(cutterIndex, tableCutter);
  const matches = tableCutter[cutterIndex].filter(([___, start]) => {
    return lastname.substring(0, start.length) === start;
  });
  const code = matches[matches.length - 1][0];
  return `${lastname[0].toUpperCase()}${code}${title[0].toLowerCase()}`;
};

// TODO - Corrigir table cutter
// TODO - Excluir artigos dos títulos

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
  key,
  isbn
) => {
  const lastname = formatLastName(authors[0]);
  const bookInfo = {
    id: key + 1,
    isbn,
    message,
    "082": ["", key + 1, isbn],
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
  values.id = values["082"][1];
  values.isbn = values["082"][2];
  if (values["082"][0].length > 0) {
    values["090"][0] = values["082"][0];
  }
  if (values["090"][0].length > 0) {
    values["082"][0] = values["090"][0];
  }
};

const formatLastName = (name) => {
  const nameArray = name.split(" ");
  const lastname = capitalize(nameArray.pop());

  if (nameArray.length > 1) {
    const firstLetters = nameArray.map((name) => name[0].toUpperCase());
    return `${lastname}, ${firstLetters.join(". ")}.`;
  }

  return `${lastname}, ${capitalize(nameArray[0])}`;
};

export const capitalize = (name) => {
  const firstLetter = name[0];
  if (firstLetter) {
    return firstLetter.toUpperCase() + name.substring(1).toLowerCase();
  }
  return name;
};
