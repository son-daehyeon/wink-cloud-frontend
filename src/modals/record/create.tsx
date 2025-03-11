import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useApiWithToast } from '@/hooks/use-api';

import Api from '@/lib/api';
import { CreateRecordRequest, CreateRecordRequestSchema } from '@/lib/api/type/domain/record';
import Record, {
  RRType,
  getDescription,
  getFormat,
  getPlaceholder,
} from '@/lib/api/type/schema/record';
import { useModalStore } from '@/lib/store/modal';

import { zodResolver } from '@hookform/resolvers/zod';

export interface RecordCreateProps {
  onCreate: (record: Record) => void;
}

export default function RecordCreateModal({ onCreate }: RecordCreateProps) {
  const [isApi, startApi] = useApiWithToast();

  const { close } = useModalStore();

  const form = useForm<CreateRecordRequest>({
    resolver: zodResolver(CreateRecordRequestSchema),
    defaultValues: {
      name: '',
      type: RRType.A,
      ttl: 300,
      records: [],
    },
  });

  const onSubmit = useCallback(
    (values: CreateRecordRequest) => {
      startApi(
        async () => {
          const { record: _record } = await Api.Domain.Record.createRecord(values);
          onCreate(_record);
        },
        {
          loading: `레코드를 추가하고 있습니다.`,
          success: `레코드를 추가했습니다.`,
          finally: () => close(),
        },
      );
    },
    [onCreate],
  );

  const type = form.watch('type');

  return (
    <>
      <DialogHeader>
        <DialogTitle>레코드 추가</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 items-center"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>레코드 이름</FormLabel>
                <FormControl>
                  <div className="flex gap-4 items-center">
                    <Input placeholder="레코드 이름을 입력해주세요." {...field} />
                    <p>.wink.io.kr</p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>레코드 종류</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value as string}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(RRType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>{getDescription(field.value)}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ttl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TTL</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="TTL을 입력해주세요."
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="records"
            render={({ field }) => (
              <FormItem>
                <FormLabel>값</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={getPlaceholder(type)}
                    className="resize-none"
                    {...field}
                    value={field.value.join('\n')}
                    onChange={(e) => field.onChange(e.target.value.split('\n'))}
                  />
                </FormControl>
                {type && <FormDescription>{getFormat(type)}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="self-end" disabled={isApi}>
            레코드 추가
          </Button>
        </form>
      </Form>
    </>
  );
}
