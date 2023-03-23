import TabButton from 'components/Common/TabButton';
import { Grid, styled, Theme, Tooltip, useMediaQuery } from '@mui/material';
import { includes, map } from 'lodash-es';
import { useRouter } from 'next/router';
import { TopbarItems } from 'constants/TopbarConstants';

interface TopbarPanelComponentProps {
  marginright: string;
  active: boolean;
}

type TopbarProps = {};

const TopbarPanelComponent = styled(Grid)(({ theme }) => ({
  color: 'darkslategray',
  backgroundColor: theme.vaggr.topbar.backgroundColor,
  padding: 6,
  borderRadius: '1.75rem',
  width: 'fit-content'
}));

const ModifiedTabButton = styled(TabButton, {
  // ? should these props be passed even to the actual html component, include any props which you only want for this styled block
  shouldForwardProp: (prop) => !includes(['active'], prop)
})<TopbarPanelComponentProps>({}, ({ theme, marginright, active = false }) => {
  let basicStyling: any = {
    marginRight: marginright
  };

  // ? if it's not active then make it look dull
  if (!active) {
    basicStyling = {
      ...basicStyling,
      backgroundColor: 'transparent',
      color: theme.palette.action.disabled,
      '&:hover': {
        color: theme.palette.primary.contrastText
      },
      [theme.breakpoints.down('lg')]: {
        '& .MuiButton-startIcon': {
          marginRight: 0
        }
      }
    };
  }

  return basicStyling;
});

function Topbar({}: TopbarProps) {
  const router = useRouter();
  const isLgScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  // * redirect route to a certain page
  function routeLink(url: string) {
    router.push(url);
  }

  // ? if the pattern matches
  function isPatternMatch(pathname: string, pattern: RegExp) {
    return pattern?.test(pathname);
  }

  return (
    <TopbarPanelComponent item>
      {map(TopbarItems, ({ icon, link, text, patterns = [/(?!.*)./] }, index) => {
        let props = { marginright: '' };
        const active = router.pathname === link || isPatternMatch(router.pathname, patterns[0]);

        // ? if it's not the last item then pass a margin
        if (index < TopbarItems.length - 1) {
          props.marginright = '1rem';
        }

        if (isLgScreen) {
          return (
            <ModifiedTabButton
              startIcon={icon()}
              key={link}
              variant="contained"
              // TODO patterns to support the entire array
              active={active}
              onClick={() => routeLink(link)}
              {...props}
            >
              {text}
            </ModifiedTabButton>
          );
        }

        return (
          <Tooltip key={link} title={text}>
            <ModifiedTabButton
              startIcon={icon()}
              variant="contained"
              // TODO patterns to support the entire array
              active={active}
              onClick={() => routeLink(link)}
              {...props}
            >
              {active && text}
            </ModifiedTabButton>
          </Tooltip>
        );
      })}
    </TopbarPanelComponent>
  );
}

export default Topbar;
