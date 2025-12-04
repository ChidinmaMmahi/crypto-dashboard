import type { ReactNode } from "react";

type CryptoCardLayoutProps = {
  children: ReactNode;
};

export const CryptoCardLayout = ({ children }: CryptoCardLayoutProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-32 sm:pt-20">
      {children}
    </div>
  );
};
