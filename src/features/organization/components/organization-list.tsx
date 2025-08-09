import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getOrganizationsByUser } from '../queries/get-organizations-by-user';
import { SubmitButton } from '@/components/form/submit-button';
import {
  LucideArrowLeftRight,
  LucideArrowUpRightFromSquare,
  LucidePen,
} from 'lucide-react';
import { OrganizationSwitchButton } from './organization-switch-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { membershipsPath } from '@/paths';
import { OrganizationDeleteButton } from '@/features/organization/components/organization-delete-button';
import { MembershipDeleteButton } from '@/features/membership/components/membership-delete-button';
import { format } from 'date-fns';

type OrganizationListProps = {
  limitedAccess?: boolean;
};

const OrganizationList = async ({ limitedAccess }: OrganizationListProps) => {
  const organizations = await getOrganizationsByUser();

  const hasActive = organizations.some((organization) => {
    return organization.membershipByUser.isActive;
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>아이디</TableHead>
          <TableHead>이름</TableHead>
          <TableHead>가입일</TableHead>
          <TableHead>멤버</TableHead>
          <TableHead>등급</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>

      <TableBody>
        {organizations.map((organization) => {
          const isActive = organization.membershipByUser.isActive;
          const isAdmin =
            organization.membershipByUser.membershipRole === 'ADMIN';

          const switchButton = (
            <OrganizationSwitchButton
              organizationId={organization.id}
              trigger={
                <SubmitButton
                  icon={<LucideArrowLeftRight />}
                  label={
                    !hasActive ? 'Activate' : isActive ? 'Active' : 'Switch'
                  }
                  variant={
                    !hasActive ? 'secondary' : isActive ? 'default' : 'outline'
                  }
                />
              }
            />
          );

          const detailButton = (
            <Button variant="outline" size="icon" asChild>
              <Link href={membershipsPath(organization.id)}>
                <LucideArrowUpRightFromSquare className="w-4 h-4" />
              </Link>
            </Button>
          );

          const editButton = (
            <Button variant="outline" size="icon">
              <LucidePen className="w-4 h-4" />
            </Button>
          );

          const leaveButton = (
            <MembershipDeleteButton
              organizationId={organization.id}
              userId={organization.membershipByUser.userId}
            />
          );

          const deleteButton = (
            <OrganizationDeleteButton organizationId={organization.id} />
          );

          const placeholder = (
            <Button size="icon" disabled className="disabled:opacity-0" />
          );

          const buttons = (
            <>
              {switchButton}
              {limitedAccess ? null : isAdmin ? detailButton : placeholder}
              {limitedAccess ? null : isAdmin ? editButton : placeholder}
              {limitedAccess ? null : leaveButton}
              {limitedAccess ? null : isAdmin ? deleteButton : placeholder}
            </>
          );

          return (
            <TableRow key={organization.id}>
              <TableCell>{organization.id}</TableCell>
              <TableCell>{organization.name}</TableCell>
              <TableCell>
                {format(
                  organization.membershipByUser.joinedAt,
                  'yyyy-MM-dd, HH:mm',
                )}
              </TableCell>
              <TableCell>{organization._count.memberships}</TableCell>
              <TableCell>
                {organization.membershipByUser.membershipRole}
              </TableCell>
              <TableCell className="flex justify-end gap-x-2">
                {buttons}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export { OrganizationList };
