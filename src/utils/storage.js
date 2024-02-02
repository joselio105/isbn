const key = "ISBN-KEY-STORAGE";

const read = () => {
  const stored = localStorage.getItem(key);

  return stored ? JSON.parse(stored) : [];
};

const save = (content) => {
  const storedContent = read();
  storedContent.push(content);
  if (storedContent[0].id) {
    storedContent.sort((a, b) => String(a.id).localeCompare(String(b.id)));
  }

  localStorage.setItem(key, JSON.stringify(storedContent));
};

const clean = () => {
  localStorage.removeItem(key);
};

const update = (id, content) => {
  console.log("Função não implementada");
};

export const storage = {
  read,
  save,
  clean,
  update,
};
