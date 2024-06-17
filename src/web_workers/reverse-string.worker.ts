self.onmessage = (event: MessageEvent) => {
  // Simulate a heavy computation
  const result = event.data.split('').reverse().join('');
  console.log("This task was solved in reverse string worker!");

  self.postMessage(result);
};
