export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="h-screen w-screen">
        <h1>private</h1>
         {children}
       </div> 


  );
}
