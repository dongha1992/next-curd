import { getCredentials } from '@/features/credential/queries/get-credentials';
import { Placeholder } from '@/components/placeholder';
import {
  Table,
  TableBody,
  TableCell,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type CredentialListProps = {
  organizationId: string;
};

const CredentialList = async ({ organizationId }: CredentialListProps) => {
  const credentials = await getCredentials(organizationId);

  if (!credentials.length) {
    return <Placeholder label="해당 그룹에 접근하지 못 합니다." />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>생성일</TableHead>
          <TableHead>최근 사용일</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {credentials.map((credential) => {
          const buttons = <></>;

          return (
            <TableRow key={credential.id}>
              <TableCell>{credential.name}</TableCell>
              <TableCell>
                {format(credential.createdAt, 'yyyy-MM-dd, HH:mm')}
              </TableCell>
              <TableCell>
                {credential.lastUsed
                  ? format(credential.lastUsed, 'yyyy-MM-dd, HH:mm')
                  : '접속 없음'}
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

export { CredentialList };
