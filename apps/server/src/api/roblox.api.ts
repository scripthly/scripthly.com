const REQUEST_TIMEOUT_MS = 10_000;

export interface RobloxUniverse {
	id: number;
	rootPlaceId: number;
	playing: number;
	visits: number;
	favoritedCount: number;
	created: string;
}

/**
 * GETs a Roblox endpoint and parses the JSON body.
 * @param url Absolute endpoint URL.
 * @returns Parsed response body.
 */
async function getJson<T>(url: string): Promise<T> {
	const response = await fetch(url, {
		headers: { accept: "application/json" },
		signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
	});

	if (!response.ok) {
		throw new Error(`Roblox responded ${response.status} for ${new URL(url).pathname}`);
	}

	return (await response.json()) as T;
}

/**
 * Resolves a place ID (the number in a game URL) to its universe ID.
 * @param placeId Roblox place ID.
 * @returns Universe ID used by the games API.
 */
export async function fetchUniverseId(placeId: number): Promise<number> {
	const { universeId } = await getJson<{ universeId: number }>(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
	return universeId;
}

/**
 * Fetches live details for up to 50 universes in one request.
 * @param universeIds Universe IDs to look up.
 * @returns One row per universe Roblox knows about.
 */
export async function fetchUniverses(universeIds: number[]): Promise<RobloxUniverse[]> {
	const { data } = await getJson<{ data: RobloxUniverse[] }>(`https://games.roblox.com/v1/games?universeIds=${universeIds.join(",")}`);
	return data;
}
