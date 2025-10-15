import CalendifyLogo from "../CalendifyLogo";

type HeaderProps = {
  label: string;
};

const Header = ({ label }: HeaderProps) => {
  return (
    <div className={"w-full flex flex-col gap-y-4 items-center justify-between"}>
      <CalendifyLogo className="text-[#0964cf]" />
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default Header;
