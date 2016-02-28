import colors from 'material-ui/lib/styles/colors';

export default function getTheme(userAgent) {
  let style = {
    palette: {
    }
  };
  if (userAgent) {
    style.userAgent = userAgent;
  }
  return style;
}
