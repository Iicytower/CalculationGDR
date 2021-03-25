export const fetchQuotationsList = async () => {
  const adress = process.env.BEHOST ?? "http://localhost:3000";
  try {
    const resQuotationsList = await fetch(
      `${adress}/authrequire/dowAllUserQuotations`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      }
    );
    const quotationsList = await resQuotationsList.json();
    return quotationsList;
  } catch (err) {
    console.error("err", err);
    alert("Something goes wrong. Please try later. fetch");
  }
};
