// TypeScript Reproducer Snippet Generator
// This module exports a function to generate a TypeScript snippet for reproducing a failing web test case.
// The snippet includes dependencies and an assertion template.

export interface ReproducerInput {
  testName: string;
  input: any;
  expected: any;
  actual: any;
  dependencies?: string[];
}

export function generateTSReproducer({ testName, input, expected, actual, dependencies = [] }: ReproducerInput): string {
  const deps = dependencies.length
    ? dependencies.map(dep => `import ${dep} from '${dep}';`).join('\n') + '\n\n'
    : '';
  return `// Reproducer for: ${testName}
// Dependencies: ${dependencies.join(', ') || 'none'}
${deps}describe('${testName}', () => {
  it('should reproduce the failure', () => {
    const input = ${JSON.stringify(input, null, 2)};
    // Replace with actual function call
    const result = /* call function with input */;
    // Expected: ${JSON.stringify(expected)}
    // Actual: ${JSON.stringify(actual)}
    expect(result).toEqual(${JSON.stringify(expected, null, 2)});
  });
});
`;
}
