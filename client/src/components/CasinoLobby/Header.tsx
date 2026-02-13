import { Search, X, Crown } from "lucide-react";
import Button from "../core/Button";
import Input from "../core/Input";
import styles from "./Header.module.css";

type HeaderProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  children?: React.ReactNode;
};

function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Crown size={32} />
          <span className={styles.logoText}>
            QUEST<span className={styles.logoAccent}>PLAY</span>
          </span>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={20} />
            <Input
              className={styles.searchInput}
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search games"
            />
            {searchQuery && (
              <Button
                className={styles.clearButton}
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
