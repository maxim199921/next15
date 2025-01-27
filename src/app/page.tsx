import { Button } from '@/shared/ui/button';
import { prismaDB } from '@/shared/lib/db';
import { Card, CardTitle } from '@/shared/ui/card';

export default async function Home() {
  const games = await prismaDB.game.findMany();

  return (
    <div>
      <Button size="lg" variant="destructive">
        Hello
      </Button>

      {games.map(game => {
        return (
          <Card key={game.id}>
            <CardTitle>{game.name}</CardTitle>
          </Card>
        );
      })}
    </div>
  );
}
