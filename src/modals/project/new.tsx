import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useApiWithToast } from '@/hooks/use-api';

import Api from '@/lib/api';
import { CreateProjectRequest, CreateProjectRequestSchema } from '@/lib/api/type/domain/project';
import Project from '@/lib/api/type/schema/project';
import { useModalStore } from '@/lib/store/modal';

import { zodResolver } from '@hookform/resolvers/zod';
import { DynamicIcon, IconName, iconNames } from 'lucide-react/dynamic';

export interface NewProjectProps {
  onCreate: (project: Project) => void;
}

export default function NewProjectModal({ onCreate }: NewProjectProps) {
  const [isApi, startApi] = useApiWithToast();

  const { close } = useModalStore();

  const [iconSelectOpen, setIconSelectOpen] = useState(false);

  const form = useForm<CreateProjectRequest>({
    resolver: zodResolver(CreateProjectRequestSchema),
    defaultValues: {
      icon: 'box',
      name: '',
    },
  });

  const onSubmit = useCallback(
    (values: CreateProjectRequest) => {
      startApi(
        async () => {
          const { project } = await Api.Domain.Project.Index.createProject(values);
          onCreate(project);
        },
        {
          loading: '프로젝트를 생성하고 있습니다.',
          success: '프로젝트를 생성했습니다.',
          finally: () => close(),
        },
      );
    },
    [onCreate],
  );

  return (
    <>
      <DialogHeader>
        <DialogTitle>새로운 프로젝트</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 items-center"
        >
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="w-fit">
                <FormControl>
                  <Popover open={iconSelectOpen} onOpenChange={setIconSelectOpen} modal={true}>
                    <PopoverTrigger asChild>
                      <div className="flex size-18 items-center justify-center rounded-sm border cursor-pointer hover:bg-accent">
                        <DynamicIcon name={field.value as IconName} className="size-8 shrink-0" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[307px]">
                      <IconSelector
                        onSelect={(icon) => {
                          field.onChange(icon);
                          setIconSelectOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>프로젝트 이름</FormLabel>
                <FormControl>
                  <Input placeholder="프로젝트 이름을 입력해주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="self-end" disabled={isApi}>
            프로젝트 생성
          </Button>
        </form>
      </Form>
    </>
  );
}

// ####################################################################################################

interface IconSelectorProps {
  onSelect: (icon: IconName) => void;
}

export function IconSelector({ onSelect }: IconSelectorProps) {
  const [query, setQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(50);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setDisplayCount((prev) => Math.min(prev + 50, iconNames.length));
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <Input
        placeholder="검색..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setDisplayCount(50);
        }}
      />
      <ScrollArea className="h-[250px]">
        <div className="flex flex-wrap gap-2">
          {iconNames
            .filter((icon) => (query ? icon.startsWith(query) : true))
            .slice(0, displayCount)
            .map((name) => (
              <div
                key={name}
                className="flex size-12 items-center justify-center rounded-sm border cursor-pointer hover:bg-accent"
              >
                <DynamicIcon
                  name={name}
                  className="size-6 shrink-0"
                  onClick={() => onSelect(name)}
                />
              </div>
            ))}
          <div ref={observerRef} className="w-full h-4" />
        </div>
      </ScrollArea>
    </div>
  );
}
