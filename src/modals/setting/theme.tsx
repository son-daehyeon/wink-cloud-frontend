import { useTheme } from 'next-themes';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { Moon, Sun, SunMoon } from 'lucide-react';

export default function ThemeSettingModal() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <DialogHeader>
        <DialogTitle>테마 설정</DialogTitle>
      </DialogHeader>

      <RadioGroup defaultValue={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
        <div>
          <RadioGroupItem value="system" id="system" className="peer sr-only" />
          <Label
            htmlFor="system"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <SunMoon className="mb-3 h-6 w-6" />
            시스템 설정
          </Label>
        </div>
        <div>
          <RadioGroupItem value="light" id="light" className="peer sr-only" />
          <Label
            htmlFor="light"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Sun className="mb-3 h-6 w-6" />
            라이트 모드
          </Label>
        </div>
        <div>
          <RadioGroupItem value="dark" id="dark" className="peer sr-only" aria-label="Apple" />
          <Label
            htmlFor="dark"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary "
          >
            <Moon className="mb-3 h-6 w-6" />
            다크 모드
          </Label>
        </div>
      </RadioGroup>
    </>
  );
}
