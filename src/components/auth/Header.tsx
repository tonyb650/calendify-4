import { cn } from "@/lib/utils";

type HeaderProps = {
  label: string;
};

const Header = ({ label }: HeaderProps) => {
  return (
    <div
      className={"w-full flex flex-col gap-y-4 items-center justify-between"}
    >
      <h1 className={cn("text-5xl font-zain")}>📆 Calendify</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default Header;
