'use client';

import { useParams, usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
  credentialsPath,
  invitationsPath,
  membershipsPath,
  organizationsPath,
  subscriptionPath,
} from '@/paths';

const OrganizationBreadcrumbs = () => {
  const params = useParams<{ organizationId: string }>();
  const pathName = usePathname();

  const title = {
    memberships: 'Memberships' as const,
    invitations: 'Invitations' as const,
    credentials: 'Credentials' as const,
    subscription: 'Subscription' as const,
  }[
    pathName.split('/').at(-1) as
      | 'memberships'
      | 'invitations'
      | 'credentials'
      | 'subscription'
  ];

  return (
    <Breadcrumbs
      breadcrumbs={[
        { title: '그룹', href: organizationsPath() },
        {
          title,
          dropdown: [
            {
              title: '멤버쉽',
              href: membershipsPath(params.organizationId),
            },
            {
              title: '초대',
              href: invitationsPath(params.organizationId),
            },
            {
              title: '크레덴셜',
              href: credentialsPath(params.organizationId),
            },
            {
              title: '구독',
              href: subscriptionPath(params.organizationId),
            },
          ],
        },
      ]}
    />
  );
};
export { OrganizationBreadcrumbs };
