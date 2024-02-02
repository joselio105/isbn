export const getBookInfo = async (isbn) => {
  const response = await fetch(
    `https://brasilapi.com.br/api/isbn/v1/${isbn}`
    // `https://brasilapi.com.br/api/isbn/v1/${isbn}?providers=cbl`
    // `https://brasilapi.com.br/api/isbn/v1/${isbn}?providers=open-library`
  );
  return await response.json();
};
