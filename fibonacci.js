function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}

console.log(fibonacci(0)); // 0
console.log(fibonacci(1)); // 1
console.log(fibonacci(5)); // 5
console.log(fibonacci(6)); // 8
