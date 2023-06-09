import { alpha, PaletteMode, SkeletonProps } from '@mui/material';
import darkScrollbar from '@mui/material/darkScrollbar';

// * refer the theme guide here https://mui.com/customization/default-theme/
const theme = (mode: PaletteMode) => ({
  // * dark scrollbar for dark theme https://mui.com/components/css-baseline/#scrollbars
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: mode === 'dark' ? darkScrollbar() : null
      }
    },
    MuiSkeleton: {
      defaultProps: {
        // The props to change the default for.
        animation: 'wave' as SkeletonProps['animation']
      }
    }
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // ? palette values for light mode
          primary: {
            main: '#232B43'
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
          },
          secondary: {
            main: '#FBB03B'
            // light: will be calculated from palette.secondary.main,
            // dark: will be calculated from palette.secondary.main,
            // contrastText: will be calculated to contrast with palette.secondary.main
          },
          background: {
            paper: '#fff',
            default: '#F9FAFF'
          }
        }
      : {
          // ? palette values for dark mode
          primary: {
            main: '#FF9677'
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
          },
          secondary: {
            main: '#41436A'
            // light: will be calculated from palette.secondary.main,
            // dark: will be calculated from palette.secondary.main,
            // contrastText: will be calculated to contrast with palette.secondary.main
          },
          background: {
            default: '#2D2E4A',
            paper: '#000000'
          }
        })
  },
  // * different custom theme options for vaggr app
  vaggr: {
    ...(mode === 'light'
      ? {
          tab: {
            borderColor: '#E2E7F2',
            backgroundColor: '#F9FAFF'
          },
          maxinput: {
            borderColor: '#E2E7F2',
            backgroundColor: '#fff'
          },
          selectinput: {
            borderColor: '#E2E7F2',
            backgroundColor: '#fff'
          },
          modal: {
            backgroundColor: '#fff',
            buttonContainerBackgroundColor: 'rgba(35, 43, 67, 0.06)'
          },
          card: {
            backgroundColor: '#fff'
          },
          datagrid: {
            chip: {
              red: {
                backgroundColor: '#DE5A5A',
                color: '#fff'
              },
              yellow: {
                backgroundColor: '#FFC107',
                color: '#000'
              },
              green: {
                backgroundColor: '#4AC47B',
                color: '#fff'
              }
            },
            header: {
              backgroundColor: '#F2F3F4'
            },
            border: {
              color: '#E2E7F2'
            }
          },
          chart: {
            linePoint: {
              color: '#18A0FB'
            },
            grid: {
              color: '#00000033'
            }
          },
          topbar: {
            backgroundColor: '#E2E7F2'
          }
        }
      : {
          tab: {
            borderColor: alpha('#fff', 0.09),
            backgroundColor: '#232B43'
          },
          maxinput: {
            borderColor: alpha('#fff', 0.09),
            backgroundColor: '#232B43'
          },
          selectinput: {
            borderColor: alpha('#fff', 0.09),
            backgroundColor: '#2D2E4A'
          },
          modal: {
            backgroundColor: '#2D2E4A',
            buttonContainerBackgroundColor: '#41436A'
          },
          card: {
            backgroundColor: '#2D2E3C'
          },
          datagrid: {
            chip: {
              red: {
                backgroundColor: '#DE5A5A',
                color: '#fff'
              },
              yellow: {
                backgroundColor: '#FFC107',
                color: '#000'
              },
              green: {
                backgroundColor: '#3B9B62',
                color: '#fff'
              }
            },
            header: {
              backgroundColor: '#41436A'
            },
            border: {
              color: '#ffffff17'
            }
          },
          chart: {
            linePoint: {
              color: '#18A0FB'
            },
            grid: {
              color: '#FFFFFF33'
            }
          },
          topbar: {
            backgroundColor: '#000000'
          }
        })
  }
});

// * adding custom variables to our theme, we'll in future separate this theme file into multiple files
// * reference link https://mui.com/customization/theming/#custom-variables
declare module '@mui/material/styles' {
  interface Theme {
    vaggr: {
      tab: {
        borderColor: string;
        backgroundColor: string;
      };
      maxinput: {
        borderColor: string;
        backgroundColor: string;
      };
      selectinput: {
        borderColor: string;
        backgroundColor: string;
      };
      modal: {
        backgroundColor: string;
        buttonContainerBackgroundColor: string;
      };
      card: {
        backgroundColor: string;
      };
      datagrid: {
        chip: {
          red: {
            backgroundColor: string;
            color: string;
          };
          yellow: {
            backgroundColor: string;
            color: string;
          };
          green: {
            backgroundColor: string;
            color: string;
          };
        };
        header: {
          backgroundColor: string;
        };
        border: {
          color: string;
        };
      };
      chart: {
        linePoint: {
          color: string;
        };
        grid: {
          color: string;
        };
      };
      topbar: {
        backgroundColor: string;
      };
    };
  }

  // ? allow configuration using `createTheme`
  interface ThemeOptions {
    vaggr?: {
      tab?: {
        borderColor?: string;
        backgroundColor?: string;
      };
      maxinput?: {
        borderColor?: string;
        backgroundColor?: string;
      };
      selectinput?: {
        borderColor?: string;
        backgroundColor?: string;
      };
      modal?: {
        backgroundColor?: string;
        buttonContainerBackgroundColor?: string;
      };
      card?: {
        backgroundColor?: string;
      };
      datagrid?: {
        chip?: {
          red?: {
            backgroundColor?: string;
            color?: string;
          };
          yellow?: {
            backgroundColor?: string;
            color?: string;
          };
          green?: {
            backgroundColor?: string;
            color?: string;
          };
        };
        header?: {
          backgroundColor?: string;
        };
        border?: {
          color?: string;
        };
      };
      chart?: {
        linePoint?: {
          color?: string;
        };
        grid?: {
          color?: string;
        };
      };
      topbar?: {
        backgroundColor?: string;
      };
    };
  }
}

export default theme;
