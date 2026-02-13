export interface Game {
  id: string;
  name: string;
  shouldShowJackpot: boolean;
  isHot: boolean;
  hasMobileVersion: boolean;
  isNew: boolean;
  provider: string;
  primaryType: string;
  gameTypes?: string[];
  content?: {
    thumbnailSquare?: {
      url?: string;
      altText?: string;
    };
  };
  jackpotValue?: {
    value: number;
    currencyCode: string;
    currencySymbol: string;
  };
  gameStudio?: string;
  isAvailableForFun?: boolean;
  sortOrder?: number;
}

export interface GamesApiResponse {
  items: Game[];
  total: number;
  page: number;
  limit: number;
}

const DEFAULT_PAGE_SIZE = 15;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchGames(
  page = 1,
  limit = DEFAULT_PAGE_SIZE,
  search?: string,
): Promise<GamesApiResponse> {
  const url = new URL("/games", API_BASE_URL);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  if (search && search.trim()) {
    url.searchParams.set("search", search.trim());
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Failed to fetch games`);
  }

  const data = (await res.json()) as GamesApiResponse;

  return {
    items: data.items ?? [],
    total: data.total ?? 0,
    page: data.page ?? page,
    limit: data.limit ?? limit,
  };
}
