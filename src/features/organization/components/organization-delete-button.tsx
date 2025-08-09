'use client';

import { useConfirmDialog } from '@/components/confirm-dialog';
import { deleteOrganization } from '@/features/organization/actions/delete-organization';

type OrganizationDeleteButtonProps = {
  organizationId: string;
};

const OrganizationDeleteButton = ({
  organizationId,
}: OrganizationDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteOrganization.bind(null, organizationId),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};
export { OrganizationDeleteButton };
