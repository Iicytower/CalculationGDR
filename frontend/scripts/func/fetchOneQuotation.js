export default async (name) => {
  const adress = "http://localhost:3000";
  try {
    const resQuotation = await fetch(
      `${adress}/authrequire/dowOneUserQuotation/${name}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    const quotation = await resQuotation.json();
    return quotation.data;
  } catch (err) {
    console.error(err);
  }
};