import { UseFormReturn } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { CreateInstanceRequest } from '@/lib/api/type/domain/project/instance';

interface GeneralSettingProps {
  form: UseFormReturn<CreateInstanceRequest>;
}

export default function GeneralSetting({ form }: GeneralSettingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>일반</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>인스턴스 이름</FormLabel>
              <FormControl>
                <Input placeholder="인스턴스 이름을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
