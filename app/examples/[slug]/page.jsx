import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SITE_CONFIG } from "@/config/site";
import {
  EXAMPLE_PORTFOLIOS,
  getExamplePortfolioBySlug,
} from "@/data/example-portfolios";
import ExamplePortfolioView from "@/components/examples/example-portfolio-view";
import GetStartedButton from "@/components/landing-page/get-started";

export function generateStaticParams() {
  return EXAMPLE_PORTFOLIOS.map((portfolio) => ({ slug: portfolio.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const portfolio = getExamplePortfolioBySlug(slug);

  if (!portfolio) return {};

  const title = `${portfolio.name} — Example ${portfolio.category} Portfolio`;
  const canonical = `/examples/${portfolio.slug}`;

  return {
    title,
    description: portfolio.description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${SITE_CONFIG.NAME}`,
      description: portfolio.description,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.NAME}`,
      description: portfolio.description,
    },
  };
}

export default async function ExamplePortfolioPage({ params }) {
  const { slug } = await params;
  const portfolio = getExamplePortfolioBySlug(slug);

  if (!portfolio) notFound();

  const otherPortfolios = EXAMPLE_PORTFOLIOS.filter((p) => p.slug !== slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_CONFIG.URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Examples",
        item: `${SITE_CONFIG.URL}/examples`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: portfolio.name,
        item: `${SITE_CONFIG.URL}/examples/${portfolio.slug}`,
      },
    ],
  };

  return (
    <div className="w-full bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
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
            <li>
              <Link href="/examples" className="hover:text-foreground">
                Examples
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-foreground">{portfolio.name}</li>
          </ol>
        </nav>

        <header className="mb-8">
          <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
            {portfolio.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            {portfolio.name}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {portfolio.description}
          </p>
        </header>

        <ExamplePortfolioView
          initialTransactions={portfolio.transactions.map(
            (transaction, index) => ({
              ...transaction,
              id: `${portfolio.slug}-${index}`,
            }),
          )}
        />

        <Card className="mt-8 border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle>Track your own portfolio</CardTitle>
            <CardDescription>
              This is an illustrative example. Create a private, secure
              portfolio of your own in ROI Monk — your data is never public.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GetStartedButton className="w-full justify-center font-bold py-8" />
          </CardContent>
        </Card>

        <section aria-label="More examples" className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">
            More example portfolios
          </h2>
          <ul className="grid grid-cols-1 gap-y-2 gap-x-6 sm:grid-cols-2">
            {otherPortfolios.slice(0, 4).map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/examples/${other.slug}`}
                  className="flex flex-col rounded-lg border border-border p-3 transition-colors hover:border-primary/50"
                >
                  <span className="font-medium">{other.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {other.category}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-xs text-muted-foreground">
          Example portfolio with illustrative data. Not investment advice and
          not representative of any real user&apos;s holdings.
        </p>
      </div>
    </div>
  );
}
