import {
  Box,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useBrand } from '../../hooks/useBrand';

const LogoWrapper = styled(Box)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    width: 53px;
    margin: 0 auto;
    font-weight: ${theme.typography.fontWeightBold};
    cursor: default;
  `
);

const LogoSignWrapper = styled(Box)(
  () => `
    width: 52px;
    height: 52px;
  `
);

interface OwnProps {
  white?: boolean;
}

function Logo({ white }: OwnProps) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { logo } = useBrand();

  const width = 60;
  const height = 60;

  return (
    <LogoWrapper>
      <LogoSignWrapper>
        <img
          src={white ? logo.white : logo.dark}
          width={`${width * (mobile ? 0.7 : 1)}px`}
          height={`${height * (mobile ? 0.7 : 1)}px`}
          alt=""
        />
      </LogoSignWrapper>
    </LogoWrapper>
  );
}

export default Logo;
