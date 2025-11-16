// src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'LEWS - Lock-in Early Warning System',
  description: 'A simple tool that detects when emerging animal-related technologies are approaching lock-in using early-warning signals inspired by historical patterns.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}