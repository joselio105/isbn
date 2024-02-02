import { createErrorMessage, createForm } from "./components.js";
import { boxes } from "../../data/boxesInfo.js";
import { capitalize } from "../utils/string.js";
import { cutterTable } from "../../data/cutter.js";

const container = document.getElementById("response");

export const renderForm = ({ id, isbn, message, ...book }) => {
  if (message) {
    const content = createErrorMessage(isbn, message);
    container.appendChild(content);
  } else {
    const content = createForm(id, isbn, fillForm(book));
    container.appendChild(content);
  }

  container.style.display = "block";
};

const fillForm = (book) => {
  console.log(book);
  const author = book.authors[0].split(" ");
  const authorLastname = capitalize(author[author.length - 1]);
  boxes[2].fields[0].content = authorLastname;
  boxes[3].fields[0].content = book.title;
  boxes[3].fields[1].content = book.subtitle ?? "";
  boxes[4].fields[0].content = book.location ?? "";
  boxes[4].fields[1].content = book.publisher ?? "";
  boxes[4].fields[2].content = book.year ?? "";
  boxes[5].fields[0].content = book.pageCount ?? "";
  boxes[6].fields[0].content = book.subjects ? book.subjects.join(", ") : "";

  //   getCutterCode(authorLastname, book.title);

  return boxes;
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
