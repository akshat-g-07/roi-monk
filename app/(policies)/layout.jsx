export default function PoliciesLayout({ children }) {
  return (
    <section className="prose prose-sm mx-auto my-10 max-w-7xl w-full flex justify-center">
      <div className="w-[90%] *:text-white">{children}</div>
    </section>
  );
}
