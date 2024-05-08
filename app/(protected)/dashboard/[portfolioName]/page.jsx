export default function Page({ params }) {
  return (
    <>
      This is private route
      {params.portfolioName}
      <br />
    </>
  );
}
