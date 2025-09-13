"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calculator as CalculatorIcon, Download, FileText, BarChart, Undo2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Slider } from './ui/slider';

const formSchema = z.object({
  parent1Income: z.coerce.number().min(0, 'Income must be positive'),
  parent2Income: z.coerce.number().min(0, 'Income must be positive'),
  custodyPercentage: z.number().min(0).max(100),
  numChildren: z.coerce.number().int().min(1, 'Must have at least one child'),
  deductions: z.coerce.number().min(0, 'Deductions must be positive').optional().default(0),
});

type FormData = z.infer<typeof formSchema>;

export default function Calculator() {
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parent1Income: 5000,
      parent2Income: 4000,
      custodyPercentage: 50,
      numChildren: 1,
      deductions: 500,
    },
  });

  function onSubmit(values: FormData) {
    // Placeholder generic formula
    const totalIncome = values.parent1Income + values.parent2Income;
    const baseSupport = totalIncome * 0.2 * values.numChildren;
    const custodyAdjustment = baseSupport * (1 - values.custodyPercentage / 100);
    const finalSupport = Math.max(0, custodyAdjustment - values.deductions);

    setResult(finalSupport);
  }
  
  const handleExport = (format: 'PDF' | 'CSV') => {
    console.log(`Exporting result to ${format}...`);
    toast({
      title: 'Export Started',
      description: `Your results are being prepared for ${format} export. (This is a demo feature)`,
    });
  };

  const resetCalculator = () => {
    form.reset();
    setResult(null);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalculatorIcon className="h-6 w-6" />
          <span>Estimate Your Child Support</span>
        </CardTitle>
        <CardDescription>
          Enter the details below to get an unofficial estimate.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="parent1Income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent 1 Monthly Gross Income</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parent2Income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent 2 Monthly Gross Income</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 4000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="custodyPercentage"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Non-Custodial Parent's Time (%)</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                        <Slider
                            value={[value]}
                            onValueChange={(vals) => onChange(vals[0])}
                            max={100}
                            step={1}
                        />
                        <span className="font-bold text-primary w-12 text-center">{value}%</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="numChildren"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Children</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="deductions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Deductions (e.g., healthcare)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
             <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                <BarChart />
                Calculate Support
            </Button>
            {result !== null && (
                 <Button type="button" variant="outline" className="w-full" onClick={resetCalculator}>
                    <Undo2 />
                    Reset Calculator
                </Button>
            )}
          </CardContent>
        </form>
      </Form>
        {result !== null && (
        <CardFooter className="flex-col items-start gap-4 bg-secondary/50 p-6">
          <div className="w-full text-center">
             <p className="text-sm text-muted-foreground">Estimated Monthly Child Support</p>
             <p className="text-4xl font-bold text-primary">
                 {new Intl.NumberFormat('en-US', {
                 style: 'currency',
                 currency: 'USD',
                 }).format(result)}
             </p>
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => handleExport('PDF')}>
                  <FileText />
                  Export as PDF
              </Button>
              <Button variant="outline" onClick={() => handleExport('CSV')}>
                  <Download />
                  Export as CSV
              </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center w-full">Disclaimer: This is an estimate for informational purposes only and is not a substitute for legal advice.</p>
        </CardFooter>
      )}
    </Card>
  );
}
