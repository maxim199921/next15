import { GameEntity } from '@/entities/game/domain';

export const gameRepository = {
  gamesList: (): Promise<GameEntity[]> => {return  {} as Promise<GameEntity[]>},
}
