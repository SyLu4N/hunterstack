import { limitString } from '@/utils/limitString';
import Link from 'next/link';

interface Props {
  href: string;
  text: string;
}

export function NavLink({ text, href }: Props) {
  return (
    <li>
      <Link href={href} className="hover:text-letter-100 transition-all">
        {text.length > 30 ? (
          <abbr title={text} className="no-underline">
            {limitString(text, 30)}
          </abbr>
        ) : (
          text
        )}
      </Link>
    </li>
  );
}
