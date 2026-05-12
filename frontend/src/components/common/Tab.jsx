
export default function Tab({ tabData, field, setField }){
    return (
        <div className="flex max-w-max gap-x-1 my-6 rounded-full border border-gray-700 bg-primary-700 p-1 shadow-sm shadow-black/20">
            {
                tabData.map( (tab) => (
                    <button key={tab.id} onClick={() => setField(tab.type)} 
                        className={`${ field === tab.type ? "bg-primary-800 text-white shadow-sm" : "bg-transparent text-gray-300 hover:text-white" } rounded-full px-5 py-2 transition-all duration-200`}
                    >
                        {tab?.tabName}
                    </button>
                ))
            }
        </div>
    );
}