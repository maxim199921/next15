import { getIdleGames } from '@/entities/game/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

export async function GamesList() {
  const games = await getIdleGames();

  return (
    <div className="grid grid-cols-2 gap-4">
      {games.map(game => {
        return (
          <Card key={game.id}>
            <CardHeader>
              <CardTitle>Games with: {game.creator.login}</CardTitle>
            </CardHeader>
            <CardContent>Rating: {game.creator.rating}</CardContent>
            <Button>Add</Button>
          </Card>
        );
      })}
    </div>
  );
}
