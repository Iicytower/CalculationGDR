export const fetchQuotationsList = async () => {
  const adress = process.env.BEHOST ?? 'http://localhost:3000';
  try {
    const resQuotationsList = await fetch(
      `${adress}/authrequire/dowAllUserQuotations`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const quotationsList = await resQuotationsList.json();
    return quotationsList.data;
  } catch (err) {
    console.error(err);
    alert("Something goes wrong. Please try later.");
  }
};