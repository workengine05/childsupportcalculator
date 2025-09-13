import Link from 'next/link';
import { states } from '@/lib/states';
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function StateList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {states.map((state) => (
        <Link href={`/${state.slug}`} key={state.slug}>
          <Card className="h-full transition-all duration-300 hover:border-primary hover:shadow-md hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-lg">
                {state.name}
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
