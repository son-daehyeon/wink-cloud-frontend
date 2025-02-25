import { UseFormReturn } from 'react-hook-form';

import { formatMemory } from '@/app/instance/new/_util/format';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { UpdateInstanceRequest } from '@/lib/api/type/domain/project/instance';
import Instance from '@/lib/api/type/schema/project/instance';
import { cn } from '@/lib/utils';

interface PerformanceSettingProps {
  instance: Instance;
  form: UseFormReturn<UpdateInstanceRequest>;
}

export default function PerformanceSetting({ instance, form }: PerformanceSettingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>성능</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        <FormField
          control={form.control}
          name="core"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPU 코어</FormLabel>
              <FormControl>
                <div className="flex rounded-lg shadow-sm">
                  {[1, 2, 3, 4].map((option) => (
                    <Button
                      key={option}
                      variant={field.value === option ? 'default' : 'outline'}
                      className="flex-1 rounded-none first:rounded-l-md last:rounded-r-md h-12"
                      onClick={(e) => {
                        e.preventDefault();
                        field.onChange(option);
                      }}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="memory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>메모리</FormLabel>
              <FormControl>
                <div className="flex rounded-lg shadow-sm">
                  {[512, 1024, 2048, 4096].map((option) => (
                    <Button
                      key={option}
                      variant={field.value === option ? 'default' : 'outline'}
                      className="flex-1 rounded-none first:rounded-l-md last:rounded-r-md h-12"
                      onClick={(e) => {
                        e.preventDefault();
                        field.onChange(option);
                      }}
                    >
                      {formatMemory(option)}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="swap"
          render={({ field }) => (
            <FormItem>
              <FormLabel>스왑 메모리</FormLabel>
              <FormControl>
                <div className="flex rounded-lg shadow-sm">
                  {[0, 512, 1024, 2048, 4096].map((option) => (
                    <Button
                      key={option}
                      variant={field.value === option ? 'default' : 'outline'}
                      className="flex-1 rounded-none first:rounded-l-md last:rounded-r-md h-12"
                      onClick={(e) => {
                        e.preventDefault();
                        field.onChange(option);
                      }}
                    >
                      {formatMemory(option)}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="disk"
          render={({ field }) => (
            <FormItem>
              <FormLabel>디스크</FormLabel>
              <FormControl>
                <div className="flex flex-wrap rounded-lg shadow-sm">
                  {[8, 16, 24, 32, 48, 64, 96, 128].map((option, index) => (
                    <Button
                      key={option}
                      disabled={option < instance.disk}
                      variant={field.value === option ? 'default' : 'outline'}
                      className={cn('flex-[1_0_25%] rounded-none h-12', {
                        'rounded-tl-md': index === 0,
                        'rounded-tr-md': index === 3,
                        'rounded-bl-md': index === 4,
                        'rounded-br-md': index === 7,
                        'border-t-0': index > 3,
                      })}
                      onClick={(e) => {
                        e.preventDefault();
                        field.onChange(option);
                      }}
                    >
                      {option}GB
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
