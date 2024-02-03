import {
  clearLoading,
  renderForm,
  renderLoading,
  renderMenu,
} from "../render/interfaces.js";
import { getBookInfo } from "./api.js";
import { storage } from "./storage.js";
import { capitalize } from "./string.js";

const input = document.getElementById("isbn");

export const handleSubmit = async (event) => {
  event.preventDefault();
  await storage.clean();
  const isbnList = input.value.split(" ");
  renderLoading();

  await isbnList.forEach(async (isbn, key) => {
    getBookInfo(isbn).then(async (book) => {
      const bookInfo = formatBookInfo(book, key, isbn.replaceAll("-", ""));
      await storage.save(bookInfo);
      renderMenu(bookInfo);
    });
  });
  clearLoading();
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
  const bookInfo = {
    id: key + 1,
    isbn,
    message,
    "082": [""],
    "090": ["", "", ""],
    100: [formatLastName(authors[0])],
    245: [title, subtitle ?? ""],
    260: [location ?? "", publisher ?? "", year ?? ""],
    300: [pageCount ?? ""],
    650: [subjects.join(", ")],
    999: [""],
  };

  return bookInfo;
};

const getCutterCode = (lastname, title) => {
  console.log(
    cutterTable.filter(([code, start]) => {
      //   console.log(start, lastname);
      //   return lastname.startsWith(start);
      return lastname[0] === start[0];
    })
  );
};

const formatLastName = (name) => {
  const nameArray = name.split(" ");
  return capitalize(nameArray[nameArray.length - 1]);
};

export const showForm = (event, form) => {
  const button = event.currentTarget;
  const id = button.id;

  renderForm(id);
};
