import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAdminOrRedirect } from '@/features/membership/queries/get-admin-or-redirect';
import z from 'zod';
import { generateCredential } from '@/features/credential/utils/generate-crendential';

const createCredentialSchema = z.object({
  name: z.string().min(1, { message: 'Is required' }).max(191),
});

export const createCredential = async (
  organizationId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  await getAdminOrRedirect(organizationId);

  let secret;

  try {
    const { name } = createCredentialSchema.parse({
      name: formData.get('name'),
    });
    secret = await generateCredential(organizationId, name);
  } catch (error) {
    return fromErrorToActionState(error);
  }
  return toActionState('SUCCESS', `암호를 복사해주세요!: ${secret}`);
};
