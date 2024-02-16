export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`antialiased bg-gradient-to-r from-slate-500 to-black`}>
        <div className="h-screen bg-gradient-to-r from-slate-500 to-black">
          <div className="flex justify-center w-full p-10">
            <span className="text-4xl font-semibold text-white"> Conference Room Booking </span>
          </div>
          <div className="p-3">{children}</div>;
        </div>
      </body>
    </html>
  );
}
