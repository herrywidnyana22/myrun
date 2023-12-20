import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const LandingPageLayou = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div 
            className="
                h-full
                bg-slate-100
            "
        >
            <Navbar/>
            <main
                className="
                    pt-40
                    pb-20
                    bg-slate-100
                "
            >
                {children}             
            </main>
            <Footer/>
        </div>
    );
}
 
export default LandingPageLayou;