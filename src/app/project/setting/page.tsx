import GeneralSetting from '@/app/project/setting/_component/general';
import MemberSetting from '@/app/project/setting/_component/member';

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_2fr]">
      <GeneralSetting />
      <MemberSetting />
    </div>
  );
}
