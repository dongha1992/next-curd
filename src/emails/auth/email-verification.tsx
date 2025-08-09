import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

type EmailVerificationProps = {
  toName: string;
  code: string;
};

const EmailVerification = ({ toName, code }: EmailVerificationProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans m-8 text-center">
          <Container>
            <Section>
              <Text>
                안녕하세요. {toName}님, 아래 코드를 통해 이메일 인증을
                진행해주세요.
              </Text>
            </Section>
            <Section>
              <Text className="bg-black rounded text-white p-2 m-2">
                {code}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailVerification.PreviewProps = {
  toName: 'DONGHA KIM',
  code: 'OEKRNDWD',
} as EmailVerificationProps;

export default EmailVerification;
