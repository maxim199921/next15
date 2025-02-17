import { GamesList } from '@/features/game-list/ui/containers/games-list';
import { Test } from '@/features/game-list/ui/containers/Test';

export default async function Home() {
  return (
    <div className='flex flex-col gap-4 container mx-auto pt-[100px]'>
      <Test />
      <h1 className='text-4xl gap-8 font-bold'>Games</h1>
      <GamesList />
    </div>
  );
}
