import { IoIosLink } from 'react-icons/io';
import { LuCalendar1 } from 'react-icons/lu';

import { formatDate } from '@/utils/formatDate';

interface Props {
  date: Date;
  source: string;
}

export function TimeAndSource({ date, source }: Props) {
  return (
    <div className="flex items-center gap-4 mt-2 text-[10px] md:text-sm">
      <time className="flex items-center gap-2">
        <LuCalendar1 size={15} className="mb-0.5" />

        <span className="italic flex">{formatDate(date)}</span>
      </time>

      <div className="text-letter-500 flex items-center gap-2">
        <IoIosLink size={16} />
        <span>{source}</span>
      </div>
    </div>
  );
}
