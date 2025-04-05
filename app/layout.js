import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import ToastContainerComp from "@/components/common/toast-container-comp";
import { SITE_CONFIG } from "@/config/site";
import { UserTypeProvider } from "@/contexts/user-type";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: `${SITE_CONFIG.NAME} | ${SITE_CONFIG.TITLE_DESCRIPTION}`,
    template: `%s | ${SITE_CONFIG.NAME}`,
  },
  description: SITE_CONFIG.DESCRIPTION,
  metadataBase: new URL(SITE_CONFIG.URL),
  creator: SITE_CONFIG.NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: new URL(SITE_CONFIG.URL),
    title: SITE_CONFIG.NAME + " | " + SITE_CONFIG.TITLE_DESCRIPTION,
    description: SITE_CONFIG.DESCRIPTION,
    siteName: SITE_CONFIG.NAME,
    images: [
      {
        url: SITE_CONFIG.OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.NAME + " | " + SITE_CONFIG.TITLE_DESCRIPTION,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.NAME + " | " + SITE_CONFIG.TITLE_DESCRIPTION,
    description: SITE_CONFIG.DESCRIPTION,
    images: [SITE_CONFIG.OG_IMAGE],
    creator: SITE_CONFIG.TWITTER_USERNAME,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${SITE_CONFIG.URL}/site.webmanifest`,
  authors: [
    {
      name: SITE_CONFIG.NAME,
      url: new URL(SITE_CONFIG.URL),
    },
  ],
  keywords: [
    "Investment",
    "Portfolio",
    "ROI",
    "Returns",
    "Investment Tracking",
    "Portfolio Management",
    "ROI Calculator",
    "Dashboard",
    "Financial Insights",
    "Investment Analytics",
    "Track Your Investments",
    "Personal Finance Tool",
    "Investment Returns Calculator",
    "Investment Performance Reports",
  ],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={`${inter.className} dark`}>
          <UserTypeProvider>
            <section className="w-full min-h-svh flex justify-center">
              {children}
            </section>
            <ToastContainerComp />
          </UserTypeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
