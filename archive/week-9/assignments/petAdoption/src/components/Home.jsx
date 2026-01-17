import BgImage from "../assets/cats.webp";
import Header from "./Header/Header";
import Form from "./Form/Form";


function Home() {
    return (
        <div className='bgContainer'>
            <img src={BgImage} alt='bg-image' className='bgImage' />
            <Header />
            <Form />
        </div>
    );
}

export default Home;