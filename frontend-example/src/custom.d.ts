declare global {
  interface Window {
    injectedWeb3: any; // You can replace 'any' with the expected type if known
  }
}

export {};