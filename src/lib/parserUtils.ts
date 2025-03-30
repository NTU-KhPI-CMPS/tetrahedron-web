type ParsedLine = string[]

type ParsingError = {
  message: string
}

export type ParsedResult<T> = { data: T; error?: never } | { data?: never; error: ParsingError }

/**
 * Parses the input string into an array of arrays, where each inner array represents a row of numbers.
 * It cleans up redundant spaces and splits the input by lines. Only rows that consist entirely of numbers are included.
 *
 * @param {string} input - The input string containing multiple lines of space-separated values.
 * @returns {ParsedLine[]} An array of arrays of strings, each representing a row that consists only of numbers.
 */
export function parseLinesWithNumbers(input: string): ParsedLine[] {
  return input
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim().split(' '))
    .filter((line) => line.every((field) => !isNaN(parseFloat(field))))
}

/**
 * Filters the input array of parsed lines and returns only those with a specific length.
 *
 * @param {ParsedLine[]} parsedLines - An array of parsed lines to be filtered.
 * @param {number} length - The length that each line must have to be included in the result.
 * @returns {ParsedLine[]} A new array containing only the lines that have the specified length.
 */
export function filterByLength(parsedLines: ParsedLine[], length: number): ParsedLine[] {
  return parsedLines.filter((params) => params.length === length)
}

/**
 * Checks if the input string contains at least one line with a valid number format
 * and the expected number of elements (length).
 *
 * @param {string} input - The input string containing multiple lines to be parsed.
 * @param {number} expectedLength - The expected number of elements in each valid line.
 * @returns {boolean} `true` if there is at least one line with the expected length and valid format; otherwise, `false`.
 */
export function hasValidLineFormat(input: string, expectedLength: number): boolean {
  return filterByLength(parseLinesWithNumbers(input), expectedLength).length > 0
}
