import BgImage from "../assets/cats.webp";
import Header from "./Header/Header";
import Table from "./Table/Table";

function TablePage() {
    return (
        <div className='bgContainer'>
            <img src={BgImage} alt='bg-image' className='bgImage' />
            <Header />
            <Table />
        </div>
    );

}

export default TablePage;