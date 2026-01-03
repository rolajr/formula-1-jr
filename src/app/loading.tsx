export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-950 text-light-50">
      <div className="relative flex h-24 w-24">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-24 w-24 bg-accent-red-500 justify-center items-center text-3xl font-bold">
          F1
        </span>
      </div>
      <p className="mt-8 text-xl text-light-200">Cargando...</p>
    </div>
  );
}
