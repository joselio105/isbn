import { capitalize } from "../src/utils/string.js";

export const fillForm = (book) => {
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

export const boxes = [
  {
    title: "Classificação Decimal Dewey(082)",
    fields: [
      {
        id: "082-0",
        label: "Número de Classificação",
        placeholder: "Número de classificação por tema (veriifcar tabela)",
        content: "",
      },
    ],
  },
  {
    title: "Número de chamada - Localização(090)",
    fields: [
      {
        id: "090-0",
        label: "Classificação",
        placeholder: "Número de classificação por tema (veriifcar tabela)",
        content: "",
      },
      {
        id: "090-1",
        label: "Código do autor",
        placeholder: "Código segundo a tabela Cutter(?)",
        content: "",
      },
      {
        id: "090-2",
        label: "Edição - volume",
        placeholder: "Edição e volume...",
        content: "",
      },
    ],
  },
  {
    title: "Autor - Nome pessoal(100)",
    fields: [
      {
        id: "100-0",
        label: "Sobrenome e/ou prenome do autor",
        placeholder: "Sobrenome do autor",
        content: "",
      },
    ],
  },
  {
    title: "Título principal(245)",
    fields: [
      {
        id: "245-0",
        label: "Título principal",
        placeholder: "Título do livro",
        content: "",
      },
      {
        id: "245-1",
        label: "Títulos paralelos/subtítulos",
        placeholder: "Subítulo do livro",
        content: "",
      },
    ],
  },
  {
    title: "Publicação, edição. Etc.(260)",
    fields: [
      {
        id: "260-0",
        label: "Local de publicação, distribuição, etc.",
        placeholder: "Local...",
        content: "",
      },
      {
        id: "260-1",
        label: "Nome do editor, publicador, etc.",
        placeholder: "Editora...",
        content: "",
      },
      {
        id: "260-2",
        label: "Data de publicação, distribuição, etc.",
        placeholder: "Ano...",
        content: "",
      },
    ],
  },
  {
    title: "Descrição física(300)",
    fields: [
      {
        id: "300-0",
        label: "Número de volumes e/ou paginação",
        placeholder: "Número de páginas...",
        content: "",
      },
    ],
  },
  {
    title: "Assunto - Tópico(650)",
    fields: [
      {
        id: "650-0",
        label: "Assunto tópico",
        placeholder: "Assuntos...",
        content: "",
      },
    ],
  },
  {
    title: "Exemplares Automáticos",
    fields: [
      {
        id: "999-0",
        label: "Número de Exemplares",
        placeholder: "Número de exemplares...",
        content: "",
      },
    ],
  },
];
