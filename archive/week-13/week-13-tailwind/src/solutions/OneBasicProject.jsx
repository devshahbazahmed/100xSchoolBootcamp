function SidebarClass1() {
    return (
        <div className="flex text-black h-screen">
            <div className="bg-red-300 md:w-96 w-0 sm:w-44 flex-col text-center transition-all delay-1000">
                <p>Home</p>
                <p>About</p>
                <p>Question</p>
                <p>Answer</p>
            </div>
            <div className="bg-green-300 w-full">Content</div>
        </div>
    );
}

export default SidebarClass1;