import { Crown, Flame, Sparkles, Zap } from "lucide-react";
import Button from "../core/Button";
import styles from "./GameCard.module.css";
import type { Game } from "../../api/games";
import { formatCurrency } from "@/utils/formatCurrency";

type GameCardProps = {
  game: Game;
  index: number;
};

function GameCard({ game, index }: GameCardProps) {
  const imageUrl = game.content?.thumbnailSquare?.url;
  const badges: { type: "new" | "hot" | "jackpot"; label: string }[] = [];

  if (game.isNew) badges.push({ type: "new", label: "NEW" });
  if (game.isHot) badges.push({ type: "hot", label: "HOT" });
  if (game.shouldShowJackpot)
    badges.push({ type: "jackpot", label: "JACKPOT" });

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${(index % 6) * 0.05}s` }}
      role="button"
      tabIndex={0}
    >
      <div className={styles.imageWrapper}>
        <img
          className={`${styles.image}`}
          src={imageUrl}
          alt={game.content?.thumbnailSquare?.altText || game.name}
          loading="lazy"
        />
        {badges.length > 0 && (
          <div className={styles.badges}>
            {badges.map((badge) => (
              <div
                key={badge.type}
                className={`${styles.badge} ${styles[`badge-${badge.type}`]}`}
              >
                {badge.type === "new" && <Sparkles size={12} />}
                {badge.type === "hot" && <Flame size={12} />}
                {badge.type === "jackpot" && <Crown size={12} />}
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        )}

        {game.shouldShowJackpot && game.jackpotValue && (
          <div className={styles.jackpot}>
            <Crown size={14} />
            <span>
              {formatCurrency(
                game.jackpotValue.value,
                game.jackpotValue.currencySymbol
              )}
            </span>
          </div>
        )}

        <div className={styles.overlay}>
          <Button className={styles.playButton}>
            <Zap size={20} />
            <span>PLAY NOW</span>
          </Button>
          {game.isAvailableForFun && (
            <Button className={styles.demoButton}>TRY DEMO</Button>
          )}
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{game.name}</h3>
        <p className={styles.provider}>{game.gameStudio || game.provider}</p>
      </div>
    </article>
  );
}

export default GameCard;
