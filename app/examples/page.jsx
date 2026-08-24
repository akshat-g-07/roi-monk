import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  EXAMPLE_PORTFOLIOS,
  getExamplePortfolioSummary,
} from "@/data/example-portfolios";
import GetStartedButton from "@/components/landing-page/get-started";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: "Example Investment Portfolios",
  description:
    "Example portfolios across real-life business & ventures like retail, rental property, cafés, manufacturing and freelancing - and financial assets — crypto, stocks, funds, commodities. See how ROI Monk tracks return on investment.",
  alternates: { canonical: "/examples" },
  openGraph: {
    title: "Example Investment Portfolios | ROI Monk",
    description:
      "Example portfolios across real-life business & ventures and financial assets. See how ROI Monk tracks return on investment.",
    url: "/examples",
    type: "website",
  },
};

function formatSignedPercent(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

function PortfolioCard({ portfolio }) {
  const summary = getExamplePortfolioSummary(portfolio);
  const isPositive = summary.netRoiPercent >= 0;

  return (
    <Link href={`/examples/${portfolio.slug}`} className="block h-full">
      <Card className="h-full transition-colors hover:border-primary/50">
        <CardHeader>
          <span className="w-fit rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {portfolio.category}
          </span>
          <CardTitle className="mt-2 text-xl">{portfolio.name}</CardTitle>
          <CardDescription>{portfolio.summary}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-muted-foreground">Net ROI</span>
            <span
              className={`text-xl font-bold ${
                isPositive ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {formatSignedPercent(summary.netRoiPercent)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ExamplesIndexPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Example Investment Portfolios",
    numberOfItems: EXAMPLE_PORTFOLIOS.length,
    itemListElement: EXAMPLE_PORTFOLIOS.map((portfolio, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_CONFIG.URL}/examples/${portfolio.slug}`,
      name: portfolio.name,
    })),
  };

  return (
    <div className="w-full bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-x-2">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-foreground">Examples</li>
          </ol>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Example Investment Portfolios
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Browse illustrative portfolios across <b>financial assets</b> and
            real-life <b>business &amp; ventures</b> to see how ROI Monk tracks
            return on investment. These examples use synthetic data — your own
            portfolios are always&nbsp;<b>private and secure</b>.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMPLE_PORTFOLIOS.map((portfolio) => (
            <li key={portfolio.slug}>
              <PortfolioCard portfolio={portfolio} />
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-semibold">
            Ready to track your own returns?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Create a private portfolio in ROI Monk. Your financial data stays
            yours — it is never made public or indexed by search engines.
          </p>
          <GetStartedButton className={"mt-8"} />
        </div>
      </div>
    </div>
  );
}
