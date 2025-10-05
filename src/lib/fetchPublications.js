export async function fetchPublications({ limit = 20, search = '' }) {
  try {
    const params = new URLSearchParams({ limit });
    if (search) params.append('search', search);

    const res = await fetch(`/api/publications?${params}`);
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.warn('Invalid publications JSON:', text);
      data = { publications: [] };
    }
    return data;
  } catch (err) {
    console.error(err);
    return { publications: [] };
  }
}
