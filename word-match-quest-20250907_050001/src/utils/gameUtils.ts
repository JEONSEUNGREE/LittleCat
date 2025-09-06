import { Letter, Monster } from '../types/game';

const VOWELS = ['A', 'E', 'I', 'O', 'U'];
const CONSONANTS = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

export const VALID_WORDS = new Set([
  // 3글자 단어
  'CAT', 'DOG', 'BAT', 'RAT', 'HAT', 'MAT', 'SAT', 'PAT', 'FAT', 'VAT',
  'PEN', 'TEN', 'HEN', 'DEN', 'MEN', 'BED', 'RED', 'FED', 'LED', 'WED',
  'PIG', 'FIG', 'DIG', 'BIG', 'WIG', 'JIG', 'RIG', 'SIT', 'HIT', 'BIT',
  'FIT', 'KIT', 'LIT', 'PIT', 'WIT', 'HOT', 'NOT', 'GOT', 'LOT', 'POT',
  'ROT', 'DOT', 'COT', 'JOT', 'CUP', 'PUP', 'SUP', 'RUN', 'SUN', 'FUN',
  'GUN', 'BUN', 'NUN', 'PUN', 'BAG', 'TAG', 'RAG', 'SAG', 'NAG', 'LAG',
  'HAG', 'WAG', 'JAG', 'GAG', 'FOG', 'LOG', 'HOG', 'DOG', 'BOG', 'COG',
  'JOG', 'TOP', 'POP', 'HOP', 'MOP', 'COP', 'SOP', 'LOP', 'BOX', 'FOX',
  'SOX', 'TAX', 'WAX', 'MAX', 'FAX', 'LAX', 'PAX', 'HEX', 'SEX', 'VEX',
  'FLY', 'TRY', 'CRY', 'DRY', 'FRY', 'PRY', 'SHY', 'SPY', 'STY', 'WHY',
  'SKY', 'BUY', 'GUY', 'LAY', 'PAY', 'SAY', 'DAY', 'HAY', 'MAY', 'RAY',
  'WAY', 'BAY', 'GAY', 'JAY', 'KEY', 'HEY', 'FLU', 'TOO', 'TWO', 'WHO',
  'CAR', 'BAR', 'FAR', 'JAR', 'TAR', 'WAR', 'PAR', 'MAR', 'GAR',
  
  // 4글자 단어
  'WORD', 'GAME', 'PLAY', 'LOVE', 'HATE', 'LIFE', 'DEAD', 'LIVE', 'GIVE',
  'TAKE', 'MAKE', 'WAKE', 'BAKE', 'CAKE', 'FAKE', 'LAKE', 'RAKE', 'SAKE',
  'BIKE', 'HIKE', 'LIKE', 'MIKE', 'PIKE', 'DUKE', 'LUKE', 'PUKE', 'NUKE',
  'BOOK', 'COOK', 'HOOK', 'LOOK', 'TOOK', 'SHOOK', 'FOOT', 'ROOT', 'BOOT',
  'HOOT', 'LOOT', 'MOOT', 'SOOT', 'TOOT', 'ROOM', 'BOOM', 'DOOM', 'ZOOM',
  'LOOM', 'TOMB', 'WOMB', 'COMB', 'BOMB', 'HOME', 'COME', 'SOME', 'DOME',
  'TONE', 'BONE', 'CONE', 'DONE', 'GONE', 'LONE', 'ZONE', 'NONE', 'PONE',
  'FIRE', 'HIRE', 'WIRE', 'TIRE', 'DIRE', 'MIRE', 'SIRE', 'LIAR', 'FEAR',
  'DEAR', 'HEAR', 'NEAR', 'PEAR', 'REAR', 'SEAR', 'TEAR', 'WEAR', 'YEAR',
  'BEAR', 'GEAR', 'FAST', 'LAST', 'PAST', 'MAST', 'CAST', 'VAST', 'EAST',
  'WEST', 'BEST', 'REST', 'TEST', 'NEST', 'FEST', 'JEST', 'PEST', 'VEST',
  'ZEST', 'HAND', 'LAND', 'BAND', 'SAND', 'WAND', 'RAND', 'MILL', 'HILL',
  'FILL', 'KILL', 'PILL', 'TILL', 'WILL', 'BILL', 'DILL', 'GILL', 'SILL',
  'TALL', 'BALL', 'CALL', 'FALL', 'HALL', 'MALL', 'WALL', 'PULL', 'FULL',
  'BULL', 'DULL', 'GULL', 'HULL', 'LULL', 'MULL', 'NULL', 'TOLL', 'ROLL',
  'POLL', 'DOLL', 'TELL', 'BELL', 'CELL', 'DELL', 'FELL', 'HELL', 'SELL',
  'WELL', 'YELL', 'SPELL', 'SHELL', 'SMELL', 'DWELL', 'SWELL',
  
  // 5글자 단어
  'QUEST', 'SWORD', 'MAGIC', 'SPELL', 'FIGHT', 'POWER', 'LEVEL', 'SKILL',
  'ARMOR', 'SHIELD', 'ATTACK', 'DEFEND', 'POTION', 'HEALTH', 'DAMAGE',
  'ENEMY', 'BEAST', 'DRAGON', 'KNIGHT', 'WIZARD', 'ROGUE', 'CLERIC',
  'ARCHER', 'BATTLE', 'VICTORY', 'DEFEAT', 'TREASURE', 'GOLD', 'SILVER',
  'BRONZE', 'CRYSTAL', 'DIAMOND', 'EMERALD', 'RUBY', 'PEARL', 'STONE',
  'WATER', 'FIRE', 'EARTH', 'WIND', 'LIGHT', 'DARK', 'SHADOW', 'STORM',
  'THUNDER', 'LIGHTNING', 'FROST', 'FLAME', 'BLADE', 'ARROW', 'HAMMER',
  'STAFF', 'WAND', 'RING', 'CROWN', 'THRONE', 'CASTLE', 'TOWER', 'BRIDGE',
  'WORLD', 'REALM', 'KINGDOM', 'EMPIRE', 'VILLAGE', 'FOREST', 'MOUNTAIN',
  'RIVER', 'OCEAN', 'DESERT', 'SWAMP', 'CAVE', 'DUNGEON', 'TEMPLE',
  
  // 추가 일반 단어
  'ABOUT', 'ABOVE', 'AFTER', 'AGAIN', 'AGAINST', 'ALONG', 'AMONG', 'ANSWER',
  'APPEAR', 'AROUND', 'BECOME', 'BEFORE', 'BEHIND', 'BELOW', 'BETWEEN',
  'BEYOND', 'BOARD', 'BRAIN', 'BREAD', 'BREAK', 'BRING', 'BUILD', 'CARRY',
  'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHANGE', 'CHARGE', 'CHECK', 'CHILD',
  'CHOICE', 'CHOOSE', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLIMB', 'CLOSE',
  'CLOUD', 'COAST', 'COLOR', 'COULD', 'COUNT', 'COURSE', 'COVER', 'CRACK',
  'CRAFT', 'CRASH', 'CRAZY', 'CREATE', 'CRIME', 'CROSS', 'CROWD', 'DANCE',
  'DEATH', 'DEPTH', 'DESIGN', 'DEVICE', 'DINNER', 'DIRECT', 'DOCTOR',
  'DOUBLE', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DREAM', 'DRESS', 'DRINK',
  'DRIVE', 'EARLY', 'EIGHT', 'EITHER', 'ELEVEN', 'EMPTY', 'ENERGY', 'ENJOY',
  'ENOUGH', 'ENTER', 'ENTIRE', 'EQUAL', 'ERROR', 'EVENT', 'EVERY', 'EXACT',
  'EXIST', 'EXPECT', 'EXPERT', 'EXPLAIN', 'EXTRA', 'FABRIC', 'FAITH',
  'FALSE', 'FAMILY', 'FAMOUS', 'FANCY', 'FATHER', 'FAVOR', 'FIELD', 'FIFTY',
  'FINAL', 'FINGER', 'FINISH', 'FIRST', 'FLASH', 'FLESH', 'FLIGHT', 'FLOOR',
  'FLOWER', 'FOCUS', 'FOLLOW', 'FORCE', 'FORGET', 'FORMAL', 'FORMER',
  'FORTY', 'FORWARD', 'FOUND', 'FOURTH', 'FRAME', 'FRESH', 'FRIEND',
  'FRONT', 'FRUIT', 'FUNNY', 'FUTURE', 'GARDEN', 'GATHER', 'GENERAL',
  'GENTLE', 'GHOST', 'GIANT', 'GLASS', 'GLOBAL', 'GOLDEN', 'GRAND', 'GRANT',
  'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GROUND', 'GROUP', 'GROWTH', 'GUARD',
  'GUESS', 'GUEST', 'GUIDE', 'GUILTY', 'HABIT', 'HANDLE', 'HAPPEN', 'HAPPY',
  'HARDLY', 'HEALTH', 'HEART', 'HEAVEN', 'HEAVY', 'HEIGHT', 'HELLO', 'HENCE',
  'HIDDEN', 'HIGHER', 'HIGHLY', 'HISTORY', 'HOBBY', 'HOLDER', 'HOLLOW',
  'HONEST', 'HORROR', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'HUMOR', 'HUNDRED'
]);

export function generateLetters(): Letter[] {
  const letters: Letter[] = [];
  const gridSize = 7;
  
  const vowelCount = Math.floor(Math.random() * 3) + 3;
  const consonantCount = gridSize * gridSize - vowelCount;
  
  for (let i = 0; i < vowelCount; i++) {
    const letter = VOWELS[Math.floor(Math.random() * VOWELS.length)];
    letters.push({
      id: `letter-${i}`,
      letter,
      isSelected: false,
      position: { x: 0, y: 0 },
    });
  }
  
  for (let i = vowelCount; i < gridSize * gridSize; i++) {
    const letter = CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
    letters.push({
      id: `letter-${i}`,
      letter,
      isSelected: false,
      position: { x: 0, y: 0 },
    });
  }
  
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  
  letters.forEach((letter, index) => {
    letter.position = {
      x: index % gridSize,
      y: Math.floor(index / gridSize),
    };
  });
  
  return letters;
}

const MONSTER_TYPES = [
  { name: '슬라임', emoji: '🟢', hpMod: 0.8, atkMod: 0.7 },
  { name: '고블린', emoji: '👺', hpMod: 1.0, atkMod: 0.9 },
  { name: '오크', emoji: '👹', hpMod: 1.2, atkMod: 1.0 },
  { name: '트롤', emoji: '🗿', hpMod: 1.5, atkMod: 0.8 },
  { name: '뱀파이어', emoji: '🧛', hpMod: 1.1, atkMod: 1.2 },
  { name: '유령', emoji: '👻', hpMod: 0.9, atkMod: 1.1 },
  { name: '드래곤', emoji: '🐲', hpMod: 2.0, atkMod: 1.5 },
  { name: '데몬', emoji: '😈', hpMod: 1.3, atkMod: 1.3 },
  { name: '골렘', emoji: '🗿', hpMod: 1.8, atkMod: 0.9 },
  { name: '리치', emoji: '💀', hpMod: 1.4, atkMod: 1.4 },
];

export function generateMonster(stage: number): Monster {
  const monsterType = MONSTER_TYPES[Math.min(stage - 1, MONSTER_TYPES.length - 1)];
  const baseHp = 50 + stage * 30;
  const baseAtk = 5 + stage * 3;
  
  return {
    id: `monster-${Date.now()}`,
    name: monsterType.name,
    emoji: monsterType.emoji,
    hp: Math.floor(baseHp * monsterType.hpMod),
    maxHp: Math.floor(baseHp * monsterType.hpMod),
    attack: Math.floor(baseAtk * monsterType.atkMod),
    defense: stage * 2,
    wordLength: Math.min(3 + Math.floor(stage / 2), 7),
    reward: 10 + stage * 5,
  };
}

export function checkWord(word: string): boolean {
  if (word.length < 3) return false;
  return VALID_WORDS.has(word.toUpperCase());
}

export function calculateDamage(wordLength: number, playerAttack: number, combo: number): number {
  return wordLength * playerAttack * (1 + combo * 0.1);
}