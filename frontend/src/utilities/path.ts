
/**
 * Joins two paths together, ensuring there is one and only one slash between them
 * @param first the path that second will be added to
 * @param second the path to append to first
 * @returns the path first/second
 */
export function joinPaths(first: string, second: string): string {
    return [first.replace(/\/$/, ''), second.replace(/^\//, '')].join("/");
}
