import Typography from '@mui/material/Typography';

export default function HeroTitle({ title, subtitle }: any) {
  return (
    <>
      {title && (
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
      )}
      {subtitle && <Typography>{subtitle}</Typography>}
    </>
  );
}
