export default function TextInput({ isDarkMode, value, handleInputChange, textarea, label }) {
    const InputComponent = textarea ? "textarea" : "input";

    return (
        <div className="relative">
            <InputComponent
                type={textarea ? undefined : "text"}
                className={`w-full px-4 pt-6 pb-2 border rounded-xl transition-all duration-200 outline-none resize-none
                        ${
                            isDarkMode
                                ? "bg-zinc-900/60 border-white/10 text-white focus:border-orange-500/60 focus:bg-zinc-900/80 focus:shadow-sm focus:shadow-orange-500/20"
                                : "bg-white/80 border-gray-300 text-gray-900 focus:border-orange-400 focus:bg-white"
                        }`}
                value={value}
                onChange={({ target }) => handleInputChange(target.value)}
                rows={textarea ? 5 : undefined}
            />

            <label className="text-sm absolute left-4 top-2 pointer-events-none origin-left text-gray-500">
                {label}
            </label>
        </div>
    );
}
