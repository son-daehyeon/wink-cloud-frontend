import { useCallback, useEffect } from 'react';
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
import { UpdateRecordRequest, UpdateRecordRequestSchema } from '@/lib/api/type/domain/record';
import Record, {
  RRType,
  getDescription,
  getFormat,
  getPlaceholder,
} from '@/lib/api/type/schema/record';
import { useModalStore } from '@/lib/store/modal';

import { zodResolver } from '@hookform/resolvers/zod';

export interface RecordUpdateProps {
  record: Record;
  onUpdate: (record: Record) => void;
  onDelete: (recordId: string) => void;
}

export default function RecordUpdateModal({ record, onUpdate, onDelete }: RecordUpdateProps) {
  const [isApi, startApi] = useApiWithToast();

  const { close } = useModalStore();

  const form = useForm<UpdateRecordRequest>({
    resolver: zodResolver(UpdateRecordRequestSchema),
    defaultValues: {
      type: undefined,
      ttl: 300,
      records: [],
    },
  });

  const onSubmit = useCallback(
    (values: UpdateRecordRequest) => {
      startApi(
        async () => {
          const { record: _record } = await Api.Domain.Record.updateRecord(record.id, values);
          onUpdate(_record);
        },
        {
          loading: `레코드를 수정하고 있습니다.`,
          success: `레코드를 수정했습니다.`,
          finally: () => close(),
        },
      );
    },
    [record, onUpdate],
  );

  const onDeleteRecord = useCallback((record: Record) => {
    startApi(
      async () => {
        await Api.Domain.Record.deleteRecord(record.id);
        onDelete(record.id);
      },
      {
        loading: `레코드를 삭제하고 있습니다.`,
        success: `레코드를 삭제했습니다.`,
        finally: () => close(),
      },
    );
  }, []);

  const type = form.watch('type');

  useEffect(() => {
    if (!record) return;

    form.setValue('type', record.type);
    form.setValue('ttl', record.ttl);
    form.setValue('records', record.record);
  }, [record]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>레코드 수정</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 items-center"
        >
          <FormItem>
            <FormLabel>레코드 이름</FormLabel>
            <FormControl>
              <div className="flex gap-4 items-center">
                <Input
                  value={record.name.substring(0, record.name.length - '.wink.io.kr'.length)}
                  readOnly
                />
                <p>.wink.io.kr</p>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>레코드 종류</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={record.type}
                  >
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
          <div className="flex w-full gap-2 justify-end">
            <Button variant="destructive" onClick={() => onDeleteRecord(record)} disabled={isApi}>
              레코드 삭제
            </Button>
            <Button disabled={isApi}>레코드 변경</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
