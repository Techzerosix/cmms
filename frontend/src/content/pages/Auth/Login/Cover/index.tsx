import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Container, Link, styled, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import JWTLogin from '../LoginJWT';

import { useTranslation } from 'react-i18next';
import Logo from 'src/components/LogoSign';

const Content = styled(Box)(
  () => `
    display: flex;
    flex: 1;
    width: 100%;
`
);

function LoginCover() {
  const { t }: { t: any } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('Login')}</title>
      </Helmet>

      <Content>
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Card
            sx={{
              p: { xs: 3, sm: 4 },
              my: { xs: 3, sm: 4 },
              width: '100%',
              borderRadius: 3
            }}
          >
            <Box textAlign="center" sx={{ mb: 2 }}>
              {/* */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: { xs: 3, sm: 4 }, // razmak do "Log In"
                  mt: { xs: 0.5, sm: 1 },
                  '& svg, & img': {
                    width: { xs: 64, sm: 80, md: 92 },
                    height: 'auto',
                    display: 'block'
                  }
                }}
              >
                <Logo />
              </Box>

              <Typography
                variant="h2"
                sx={{
                  mb: 1.5,
                  lineHeight: 1.15,
                  fontWeight: 700
                }}
              >
                {t('login')}
              </Typography>

              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{
                  mb: { xs: 3, sm: 3.5 },
                  lineHeight: 1.4
                }}
              >
                {t('login_description')}
              </Typography>
            </Box>

            {/* */}
            <Box sx={{ mt: 1 }}>
              <JWTLogin />
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography
                component="span"
                variant="subtitle2"
                color="text.primary"
                fontWeight="bold"
              >
                {t('no_account_yet')}
              </Typography>{' '}
              <Box display={{ xs: 'block', md: 'inline-block' }}>
                <Link component={RouterLink} to="/account/register">
                  <b>{t('signup_here')}</b>
                </Link>
              </Box>
            </Box>
          </Card>
        </Container>
      </Content>
    </>
  );
}

export default LoginCover;
