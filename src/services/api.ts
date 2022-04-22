export const fetchApiGet = async (url: string) => {
  try {
    console.log(url);
    const res = await fetch(url);
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    return { err };
  }
};

export const fetchApiMethod = async (
  url: string,
  method: string,
  body: any
) => {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { err };
  }
};
