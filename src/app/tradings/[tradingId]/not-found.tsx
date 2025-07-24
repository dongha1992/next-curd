import Link from 'next/link';
import { Placeholder } from '@/components/placeholder';
import { Button } from '@/components/ui/button';
import { tradingsPath } from '@/paths';

export default function NotFound() {
  return (
    <Placeholder
      label="없는 페이지 입니다."
      button={
        <Button asChild variant="outline">
          <Link href={tradingsPath()}>Go to Tickets</Link>
        </Button>
      }
    />
  );
}
