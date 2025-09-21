// Array-related helpers

export const getUnique = (arr: any[], key: string) => Array.from(new Set(arr.map(item => item[key]).filter(Boolean)));
