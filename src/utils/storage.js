const key = "ISBN-KEY-STORAGE";

const read = async () => {
  const stored = await localStorage.getItem(key);

  return stored ? JSON.parse(stored) : [];
};

const save = async (content) => {
  const storedContent = await read();
  storedContent.push(content);

  if (storedContent[0].id) {
    storedContent.sort((a, b) => String(a.id).localeCompare(String(b.id)));
  }

  await localStorage.setItem(key, JSON.stringify(storedContent));
};

const clean = async () => {
  await localStorage.removeItem(key);
};

const update = async (id, content) => {
  console.log("Função não implementada");
};

export const storage = {
  read,
  save,
  clean,
  update,
};
