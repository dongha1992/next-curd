import Linkify from 'linkify-react';
import Link from 'next/link';
import { IntermediateRepresentation } from 'linkifyjs';
import { getBaseUrl } from '@/utils/url';

const renderLink = ({ attributes, content }: IntermediateRepresentation) => {
  const { href, ...props } = attributes;
  const isInternal = href.includes(getBaseUrl());
  const url = isInternal ? href.replace(getBaseUrl(), '') : href;

  const handleClick = (event: React.SyntheticEvent) => {
    if (isInternal) return;
    if (!confirm('정말 가실 건가요...?')) {
      event.preventDefault();
    }
  };

  let maybeParsedContent = content;
  if (url.startsWith('/tradings/')) {
    maybeParsedContent = url.replace('/tradings/', 'Trading: #');
  }

  return (
    <Link href={url} {...props} onClick={handleClick} className="underline">
      {maybeParsedContent}
    </Link>
  );
};

type ContentProps = {
  children: string;
};

const Content = ({ children }: ContentProps) => {
  return (
    <Linkify
      as="p"
      className="whitespace-pre-line"
      options={{ render: renderLink }}
    >
      {children}
    </Linkify>
  );
};

export { Content };
