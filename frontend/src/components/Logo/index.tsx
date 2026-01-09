import {
  Box,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useBrand } from '../../hooks/useBrand';

const LogoWrapper = styled(Box)(
  ({ theme }) => `
    color: ${theme.palette.text.primary};
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

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm
  }
}));

interface OwnProps {
  white?: boolean;
}

function Logo({ white }: OwnProps) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { logo, name: brandName } = useBrand();

  const width = 60;
  const height = 60;

  return (
    <TooltipWrapper title={brandName} arrow>
      <LogoWrapper>
        <LogoSignWrapper>
          <img
            src={white ? logo.white : logo.dark}
            width={`${width * (mobile ? 0.7 : 1)}px`}
            height={`${height * (mobile ? 0.7 : 1)}px`}
            alt={brandName}
          />
        </LogoSignWrapper>
      </LogoWrapper>
    </TooltipWrapper>
  );
}

export default Logo;
