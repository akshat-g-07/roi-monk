import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-4">
        <Link href="/" className="text-primary">
          Home
        </Link>{" "}
        / Privacy Policy
      </div>
      <div className="dark:*:text-white dark:[&_strong]:text-white [&_a]:text-blue-500">{children}</div>
    </div>
  );
}
