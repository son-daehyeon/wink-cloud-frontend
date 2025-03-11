import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { ImageType, images } from '@/app/project/instance/new/_constant/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

import { CreateInstanceRequest } from '@/lib/api/type/domain/project/instance';

interface ImageSettingProps {
  form: UseFormReturn<CreateInstanceRequest>;
}

export default function ImageSetting({ form }: ImageSettingProps) {
  const [imageType, setImageType] = useState<ImageType>(images[0]);

  useEffect(() => {
    form.setValue('osType', imageType.version[0].raw);
  }, [imageType.os]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>이미지</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <RadioGroup
          value={imageType.os}
          onValueChange={(value) => setImageType(images.find((image) => image.os === value)!)}
          className="flex flex-wrap gap-4"
        >
          {images.map((image) => (
            <div key={image.os}>
              <RadioGroupItem value={image.os} id={image.os} className="peer sr-only" />
              <Label
                htmlFor={image.os}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <image.icon className="mb-3 size-8" />
                {image.os}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <Separator />
        <FormField
          control={form.control}
          name="osType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-col gap-2"
                >
                  {imageType.version.map((version) => (
                    <div key={version.raw}>
                      <RadioGroupItem
                        value={version.raw}
                        id={version.raw}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={version.raw}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        {version.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
