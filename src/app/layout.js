import { metadata } from './metadata';
import ClientLayout from './ClientLayout';

export { metadata };

export default function RootLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}
