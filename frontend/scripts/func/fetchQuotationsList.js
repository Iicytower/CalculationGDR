export default async () => {
  const adress = "http://localhost:3000";
  try {
    const resQuotationsList = await fetch(
      `${adress}/authrequire/dowAllUserQuotations`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );

    const quotationsList = await resQuotationsList.json();
    return quotationsList.data;
  } catch (err) {
    console.error(err);
  }
};