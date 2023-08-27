import CustomerHeader from "@/components/customer/CustomerHeader";
import { FunctionComponent } from "react";

export type CustomerLayoutProps = {
  children: React.ReactNode;
};

const CustomerLayout: FunctionComponent<CustomerLayoutProps> = ({
  children,
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <CustomerHeader />
      <div className="container flex flex-1 flex-col items-center px-16">
        {children}
      </div>
    </div>
  );
};

export default CustomerLayout;
