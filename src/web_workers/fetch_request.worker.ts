self.onmessage = async (event: MessageEvent) => {
  const fetchURL = event.data;

  try {
    const response: Response = await fetch(fetchURL);
    if (!response.ok) {
      throw new Error("Response wasn't ok!");
    }
    const data: any = await response.json();
    self.postMessage(data);
  } catch (err) {
    self.postMessage({ error: err.message });
  }
}
