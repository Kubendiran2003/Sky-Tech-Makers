export default function LoadingSpinner({ size = "lg", text = "Loading..." }) {
  const sizes = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-2",
    lg: "w-14 h-14 border-2",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className={`${sizes[size]} border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin`} />
      {text && <p className="text-slate-500 text-sm font-medium">{text}</p>}
    </div>
  );
}