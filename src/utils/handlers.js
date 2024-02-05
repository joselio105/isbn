import {
  clearLoading,
  renderForm,
  renderLoading,
  renderMenu,
} from "../render/interfaces.js";
import { getBookInfo } from "./api.js";
import { capitalize } from "./string.js";
import { cutterTable } from "../../data/cutter.js";

const input = document.getElementById("isbn");

export const findBooksByIsbn = async (event) => {
  event.preventDefault();
  const isbnList = input.value.split(" ");
  renderLoading();

  await isbnList.forEach(async (isbn, key) => {
    getBookInfo(isbn)
      .then(async (book) => {
        const bookInfo = formatBookInfo(book, key, isbn.replaceAll("-", ""));
        renderMenu(bookInfo);
      })
      .finally(() => {
        clearLoading();
      });
  });
};

const formatBookInfo = (
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

const getCutterCode = (lastname, title) => {
  const matches = cutterTable.filter(([code, start]) => {
    return lastname.substring(0, start.length) === start;
  });
  const code = matches[matches.length - 1][0];
  return `${lastname[0].toUpperCase()}${code}${title[0].toLowerCase()}`;
};

export const updateForm = async (event) => {
  event.preventDefault();
  const form = event.target;
  const fields = form.querySelectorAll("input");

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

  renderForm(values);
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
