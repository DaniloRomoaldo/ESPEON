import HamburguerMenu from "../components/HamburguerMenu";
import Datatable from "../layouts/Datatable";

export default function Permissions() {
  return (
    <div className="h-screen grid grid-cols-[3%_97%] ">
      <div>
        <HamburguerMenu />
      </div>

      <div className="flex items-center justify-center">
        <Datatable />
      </div>
    </div>
  );
}
