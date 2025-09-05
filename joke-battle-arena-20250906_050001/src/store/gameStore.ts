import { create } from 'zustand'

export interface Joke {
  id: string
  text: string
  author: string
  timestamp: number
}

export interface Battle {
  id: string
  player1: Player
  player2: Player
  currentTurn: 'player1' | 'player2'
  roundNumber: number
  maxRounds: number
  votes: {
    player1: number
    player2: number
  }
  status: 'waiting' | 'active' | 'voting' | 'finished'
  winner?: string
}

export interface Player {
  id: string
  name: string
  avatar: string
  score: number
  jokes: Joke[]
}

interface GameState {
  currentPlayer: Player | null
  currentBattle: Battle | null
  battleHistory: Battle[]
  leaderboard: Player[]
  isLoading: boolean
  
  // Actions
  setPlayer: (player: Player) => void
  startBattle: (opponent: Player) => void
  submitJoke: (joke: string) => void
  voteForJoke: (playerId: 'player1' | 'player2') => void
  endBattle: () => void
  loadLeaderboard: () => void
}

const mockLeaderboard: Player[] = [
  { id: '1', name: '코미디킹', avatar: '👑', score: 2500, jokes: [] },
  { id: '2', name: '웃음폭탄', avatar: '💣', score: 2100, jokes: [] },
  { id: '3', name: '개그맨', avatar: '🎭', score: 1800, jokes: [] },
  { id: '4', name: '농담전사', avatar: '⚔️', score: 1500, jokes: [] },
  { id: '5', name: '하하호호', avatar: '😂', score: 1200, jokes: [] },
]

export const useGameStore = create<GameState>((set, get) => ({
  currentPlayer: null,
  currentBattle: null,
  battleHistory: [],
  leaderboard: mockLeaderboard,
  isLoading: false,
  
  setPlayer: (player) => set({ currentPlayer: player }),
  
  startBattle: (opponent) => {
    const { currentPlayer } = get()
    if (!currentPlayer) return
    
    const newBattle: Battle = {
      id: Date.now().toString(),
      player1: currentPlayer,
      player2: opponent,
      currentTurn: 'player1',
      roundNumber: 1,
      maxRounds: 3,
      votes: { player1: 0, player2: 0 },
      status: 'active',
    }
    
    set({ currentBattle: newBattle })
  },
  
  submitJoke: (jokeText) => {
    const { currentBattle, currentPlayer } = get()
    if (!currentBattle || !currentPlayer) return
    
    const newJoke: Joke = {
      id: Date.now().toString(),
      text: jokeText,
      author: currentPlayer.name,
      timestamp: Date.now(),
    }
    
    const updatedBattle = { ...currentBattle }
    
    if (currentBattle.currentTurn === 'player1') {
      updatedBattle.player1.jokes.push(newJoke)
      updatedBattle.currentTurn = 'player2'
    } else {
      updatedBattle.player2.jokes.push(newJoke)
      updatedBattle.status = 'voting'
    }
    
    set({ currentBattle: updatedBattle })
  },
  
  voteForJoke: (playerId) => {
    const { currentBattle } = get()
    if (!currentBattle || currentBattle.status !== 'voting') return
    
    const updatedBattle = { ...currentBattle }
    updatedBattle.votes[playerId]++
    
    // Simulate voting period
    setTimeout(() => {
      if (updatedBattle.roundNumber < updatedBattle.maxRounds) {
        updatedBattle.roundNumber++
        updatedBattle.currentTurn = 'player1'
        updatedBattle.status = 'active'
      } else {
        updatedBattle.status = 'finished'
        updatedBattle.winner = updatedBattle.votes.player1 > updatedBattle.votes.player2 
          ? updatedBattle.player1.name 
          : updatedBattle.player2.name
      }
      set({ currentBattle: updatedBattle })
    }, 3000)
    
    set({ currentBattle: updatedBattle })
  },
  
  endBattle: () => {
    const { currentBattle, battleHistory } = get()
    if (!currentBattle) return
    
    set({ 
      currentBattle: null,
      battleHistory: [...battleHistory, currentBattle]
    })
  },
  
  loadLeaderboard: () => {
    set({ isLoading: true })
    // Simulate API call
    setTimeout(() => {
      set({ isLoading: false })
    }, 500)
  },
}))