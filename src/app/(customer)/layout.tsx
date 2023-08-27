import CustomerHeader from "@/components/customer/CustomerHeader";
import { FunctionComponent } from "react";

export type CustomerLayoutProps = {
  children: React.ReactNode;
};

const CustomerLayout: FunctionComponent<CustomerLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <CustomerHeader />
      <div className="container flex flex-1 flex-col px-16">{children}</div>
    </>
  );
};

export default CustomerLayout;
