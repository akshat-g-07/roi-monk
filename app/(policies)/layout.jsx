export default function Layout({ children }) {
  return (
    <div className="prose prose-sm mx-auto dark:*:text-white dark:[&_strong]:text-white my-10">
      {children}
    </div>
  );
}
