
import './globals.css';

export const metadata = {
  title: 'AventIQ — Discover Beyond Boundaries',
  description:
    'Discover opportunities, connect with mentors and grow through a worldwide community.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
