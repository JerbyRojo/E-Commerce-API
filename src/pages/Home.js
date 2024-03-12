import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home(){
    const data = {
        title: "Welcome to Our Online Store",
        content: "Explore a wide range of products from the comfort of your home.",
        destination: "/products",
        label: "SHOP NOW!"
    }

    return (
        <div className="home-container">
            <Banner data={data}/>
            <div className="featured-products-container">
                
                <FeaturedProducts />
            </div>
            <div className="highlights-container">
               
                <Highlights />
            </div>
        </div>
    )
}