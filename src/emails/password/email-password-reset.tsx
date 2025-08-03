import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

type EmailPasswordResetProps = {
  toName: string;
  url: string;
};

const EmailPasswordReset = ({ toName, url }: EmailPasswordResetProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans m-8 text-center">
          <Container>
            <Section>
              <Text>
                {toName}님, 아래 버튼을 눌러서 비밀번호 초기화를 진행해주세요.
              </Text>
            </Section>
            <Section>
              <Button
                href={url}
                className="bg-black rounded text-white p-2 m-2"
              >
                비밀번호 초기화
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailPasswordReset.PreviewProps = {
  toName: '김동하',
  url: 'http://localhost:3000/password-reset/abc123',
} as EmailPasswordResetProps;

export default EmailPasswordReset;
