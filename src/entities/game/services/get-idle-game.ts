import { gameRepository } from "../repositories/game";
import { GameIdleEntity } from '@/entities/game/domain';

export async function getIdleGames(): Promise<GameIdleEntity[]> {
  const games = await gameRepository.gamesList({
    status: "idle",
  });

  return games as GameIdleEntity[];
}
