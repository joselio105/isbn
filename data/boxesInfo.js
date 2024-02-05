export const boxes = [
  {
    id: "082",
    title: "Classificação Decimal Dewey(082)",
    fields: [
      {
        label: "Número de Classificação",
        placeholder: "Número de classificação por tema (veriifcar tabela)",
        list: "themes-list",
      },
      {
        type: "hidden",
      },
      {
        type: "hidden",
      },
    ],
  },
  {
    id: "090",
    title: "Número de chamada - Localização(090)",
    fields: [
      {
        label: "Classificação",
        placeholder: "Número de classificação por tema (veriifcar tabela)",
        list: "themes-list",
      },
      {
        label: "Código do autor",
        placeholder: "Código segundo a tabela Cutter(?)",
      },
      {
        label: "Edição - volume",
        placeholder: "Edição e volume...",
      },
    ],
  },
  {
    id: "100",
    title: "Autor - Nome pessoal(100)",
    fields: [
      {
        label: "Sobrenome e/ou prenome do autor",
        placeholder: "Sobrenome do autor",
      },
    ],
  },
  {
    id: "245",
    title: "Título principal(245)",
    fields: [
      {
        label: "Título principal",
        placeholder: "Título do livro",
      },
      {
        label: "Títulos paralelos/subtítulos",
        placeholder: "Subítulo do livro",
      },
    ],
  },
  {
    id: "260",
    title: "Publicação, edição. Etc.(260)",
    fields: [
      {
        label: "Local de publicação, distribuição, etc.",
        placeholder: "Local...",
      },
      {
        label: "Nome do editor, publicador, etc.",
        placeholder: "Editora...",
      },
      {
        label: "Data de publicação, distribuição, etc.",
        placeholder: "Ano...",
      },
    ],
  },
  {
    id: "300",
    title: "Descrição física(300)",
    fields: [
      {
        label: "Número de volumes e/ou paginação",
        placeholder: "Número de páginas...",
        type: "number",
        step: 1,
      },
    ],
  },
  {
    id: "650",
    title: "Assunto - Tópico(650)",
    fields: [
      {
        label: "Assunto tópico",
        placeholder: "Assuntos...",
      },
    ],
  },
  {
    id: "999",
    title: "Exemplares Automáticos",
    fields: [
      {
        label: "Número de Exemplares",
        placeholder: "Número de exemplares...",
        type: "number",
        value: 1,
        min: 1,
        step: 1,
      },
    ],
  },
];
