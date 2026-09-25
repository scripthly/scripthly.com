// ? en-GB abbreviates millions as a lowercase "m"; en-US keeps the familiar "M" and "K".
const compactFormatter = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const fullFormatter = new Intl.NumberFormat("en-GB");

/**
 * Formats large counts for display (e.g. 2.1M, 33.9K).
 * @param value Raw count.
 * @returns Compact human-readable string.
 */
export function formatCompact(value: number): string {
	return compactFormatter.format(value);
}

/**
 * Formats a count with thousands separators (e.g. 1,204).
 * @param value Raw count.
 * @returns Grouped number string.
 */
export function formatCount(value: number): string {
	return fullFormatter.format(value);
}
