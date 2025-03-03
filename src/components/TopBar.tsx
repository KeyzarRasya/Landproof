
export default function TopBar() {
    return (
        <nav className="w-full flex justify-between items-center border-2 p-3">
            {/* logo & hamburger */}
            <div className="flex gap-3 items-center">
                <button className="cursor-pointer text-2xl"> = </button>
                <div>
                    <span>LandProof</span>

                </div>
            </div>
            {/* User Profile */}
            <div className="h-full bg-amber-100">
                <img src="" alt="Usr image" />
            </div>
        </nav>
    )
}
