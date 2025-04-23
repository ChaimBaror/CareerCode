export type Scores = {
    R: number;
    I: number;
    A: number;
    S: number;
    E: number;
    C: number;
  };

  export function getHollandCode(scores: Scores): string {
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([type]) => type)
      .join('');
  }
  