import { useCallback, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { useApiWithToast } from '@/hooks/use-api';

import Api from '@/lib/api';
import { CreateInstanceRequest } from '@/lib/api/type/domain/project/instance';

interface SshKeySettingProps {
  form: UseFormReturn<CreateInstanceRequest>;
}

export default function SshKeySetting({ form }: SshKeySettingProps) {
  const [isApi, startApi] = useApiWithToast();
  const [privateKey, setPrivateKey] = useState<string>();

  const createKeyPair = useCallback(() => {
    startApi(
      async () => {
        const { publicKey, privateKey } = await Api.Domain.Util.KeyPair.generate();
        form.setValue('publicKey', publicKey);
        setPrivateKey(privateKey);
        savePrivateKey(privateKey);
      },
      {
        loading: 'SSH 키 페어를 생성하고 있습니다',
        success: 'SSH 키 페어를 생성했습니다.',
      },
    );
  }, [form]);

  const savePrivateKey = useCallback(
    (privateKey: string) => {
      const blob = new Blob([privateKey], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wink-cloud:${form.getValues('name').replaceAll(' ', '_') || 'new_instance'}.key`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [form],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>SSH 키</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <FormField
          control={form.control}
          name="publicKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>공개 키</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-3">
                  <Input
                    placeholder="공개 키를 입력해주세요."
                    disabled={isApi}
                    readOnly={!!privateKey}
                    {...field}
                  />
                  <Separator />
                  {privateKey ? (
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          savePrivateKey(privateKey);
                        }}
                      >
                        개인 키 다운로드
                      </Button>

                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault();
                          setPrivateKey(undefined);
                          field.onChange('');
                        }}
                      >
                        수동으로 키 입력하기
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="secondary"
                      disabled={isApi}
                      onClick={(e) => {
                        e.preventDefault();
                        createKeyPair();
                      }}
                    >
                      자동으로 키 페어 생성하기
                    </Button>
                  )}
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
