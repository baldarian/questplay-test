"use client";

import { useState, useCallback, useEffect } from "react";
import styles from "./index.module.css";
import Header from "./Header";
import GameCard from "./GameCard";
import Button from "../core/Button";
import type { Game } from "../../api/games";
import { fetchGames } from "../../api/games";
import { useDebounce } from "../../hooks/useDebounce";

function CasinoLobby() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPage = useCallback(
    async (pageToLoad: number, append: boolean, currentSearch: string) => {
      try {
        if (pageToLoad === 1 && !append) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }
        setError(null);

        const result = await fetchGames(pageToLoad, undefined, currentSearch);

        setGames((prev) =>
          append ? [...prev, ...result.items] : result.items
        );
        setTotal(result.total);
        setPage(result.page);
      } catch {
        setError("Unable to load games.");
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    []
  );

  useEffect(() => {
    loadPage(1, false, debouncedSearchQuery);
  }, [loadPage, debouncedSearchQuery]);

  const hasMore = games.length < total;

  const handleLoadMore = () => {
    if (!hasMore || isLoadingMore) {
      return;
    }

    loadPage(page + 1, true, debouncedSearchQuery);
  };

  return (
    <div className={styles.app}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className={styles.main}>
        <div className={styles.gamesContainer}>
          {isLoading && games.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>Loading games...</h2>
            </div>
          ) : games.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>No games found</h2>
              <p>Try adjusting your search</p>
            </div>
          ) : (
            <>
              <div className={styles.resultsHeader}>
                <h2>
                  {games.length} of {total || games.length}{" "}
                  {games.length === 1 ? "Game" : "Games"}
                </h2>
                {error && <p className={styles.errorText}>{error}</p>}
              </div>

              <div className={styles.gamesGrid}>
                {games.map((game, index) => (
                  <GameCard key={game.id} game={game} index={index} />
                ))}
              </div>

              {hasMore && (
                <div className={styles.loadMoreContainer}>
                  <Button
                    className={styles.loadMoreButton}
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                  >
                    Load More Games
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default CasinoLobby;
