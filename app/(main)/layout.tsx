import GroupInputPeserta from "./dashboard/components/dashboard-inputPesertaGroup"
import MenuDashboard from "./dashboard/components/dashboard-menu"

const MainLayout = ({
    children
}:{
    children: React.ReactNode
}) =>{
    return(
      <div
        className="
          h-full
          mx-auto
          space-y-4
          items-center
          gap-4
          p-4
          px-8
          md:max-w-screen-2xl
        "
      >
        <MenuDashboard/>
        { children }
      </div>
          
    )
}

export default MainLayout