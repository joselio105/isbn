export const capitalize = (name) => {
  const firstLetter = name[0];
  if (firstLetter) {
    return firstLetter.toUpperCase() + name.substring(1).toLowerCase();
  }
  return name;
};
