export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
}) {
    return (
        <button
            disabled={disabled}
            onClick={onclick}
            className={`flex cursor-pointer items-center gap-x-2 rounded-xl px-5 py-2 font-semibold transition duration-200 ${outline ? "border border-secondary-500 bg-transparent text-secondary-500 hover:bg-secondary-500/10" : "bg-secondary-500 text-white hover:bg-secondary-600"} ${customClasses}`}
            type={type}
        >
            {children ? (
                <>
                    <span className={`${outline && "text-secondary-500"}`}>{text}</span>
                    {children}
                </>
            ) : (
                text
            )}
        </button>
    )
}