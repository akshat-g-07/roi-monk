import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GetRecentPortfolios } from "@/actions/portfolio";
import { useServerAction } from "@/hooks/useServerAction";
import { useRouter } from "next/navigation";

export default function RecentPortfolios({ open }) {
  const router = useRouter();
  const {
    isLoading,
    data: recentPortfolios,
    error,
  } = useServerAction(GetRecentPortfolios);

  if (isLoading) return <>Loading</>;

  if (error) return <>Error</>;

  return (
    <>
      {recentPortfolios.length > 0 && (
        <>
          <div className="w-full">
            <span
              className={`${open ? "inline-flex" : "hidden"} mx-5 text-nowrap`}
            >
              Recents:
            </span>
            <div
              className={`${open ? "mt-1" : "mt-7"} flex flex-col items-center`}
            >
              {recentPortfolios.map((portfolio, index) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center ${
                      open ? "justify-start" : "justify-evenly"
                    } w-full group cursor-pointer my-px hover:bg-accent`}
                    onClick={() => {
                      router.push(`/portfolio/${portfolio.portfolioName}`);
                      setOpen(false);
                    }}
                  >
                    <Avatar className={`m-2 ${open && "ml-3"}`}>
                      <AvatarFallback>
                        {portfolio.portfolioName.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      style={{
                        display: open ? "inline-flex" : "none",
                        margin: "0 0.5rem",
                        whiteSpace: "nowrap",
                        fontSize: "0.875rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "white",
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      {portfolio.portfolioName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`m-4 ${
              open ? "px-24" : "px-4"
            } border-b border-white duration-300 ease-in-out`}
          />
        </>
      )}
    </>
  );
}
