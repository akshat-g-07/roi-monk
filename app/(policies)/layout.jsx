export default function PoliciesLayout({ children }) {
  return (
    <section className="prose dark:prose-invert prose-sm mx-auto my-10 max-w-7xl w-full flex justify-center">
      <div className="w-[90%]">{children}</div>
    </section>
  );
}
