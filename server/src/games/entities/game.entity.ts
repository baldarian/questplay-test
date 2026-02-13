import { Entity, Column, PrimaryColumn } from 'typeorm';

interface GameContent {
  thumbnail: {
    url: string;
    altText: string;
    height: number;
    width: number;
  };
  thumbnailSquare: {
    url: string;
    altText: string;
    height: number;
    width: number;
  };
  thumbnailPortrait: {
    url: string;
    altText: string;
    height: number;
    width: number;
  };
  thumbnailLandscape: {
    url: string;
    altText: string;
    height: number;
    width: number;
  };
}

interface JackpotValue {
  value: number;
  currencyCode: string;
  currencySymbol: string;
}

@Entity('games')
export class Game {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'boolean' })
  shouldShowJackpot: boolean;

  @Column({ type: 'boolean' })
  isHot: boolean;

  @Column({ type: 'boolean' })
  hasMobileVersion: boolean;

  @Column({ type: 'boolean' })
  isNew: boolean;

  @Column({ type: 'boolean' })
  isMiniGame: boolean;

  @Column({ type: 'integer' })
  sortOrder: number;

  @Column()
  provider: string;

  @Column()
  primaryType: string;

  @Column({ type: 'simple-json' })
  gameTypes: string[];

  @Column()
  primaryVariantId: string;

  @Column()
  slug: string;

  @Column({ type: 'simple-json' })
  gameVariants: string[];

  @Column({ type: 'simple-json' })
  collections: string[];

  @Column({ type: 'simple-json', nullable: true })
  content: GameContent;

  @Column({ type: 'simple-json', nullable: true })
  metaTags: string[];

  @Column({ type: 'simple-json', nullable: true })
  jackpotValue: JackpotValue;

  @Column()
  contentKey: string;

  @Column()
  gameStudio: string;

  @Column()
  launchType: string;

  @Column({ type: 'boolean' })
  isAvailableForFun: boolean;
}
