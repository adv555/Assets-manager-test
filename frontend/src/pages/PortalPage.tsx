import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppRoute } from 'common/enums/app-route.enum';
import Header from 'components/header/Header';
import SideBar from 'components/sideBar/SideBar';
import { ReactComponent as DashboardIcon } from 'assets/icons/dashboard.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg';
import { ReactComponent as TransactionIcon } from 'assets/icons/transaction.svg';
import { ReactComponent as InvoiceIcon } from 'assets/icons/invoices.svg';
import { ReactComponent as WalletIcon } from 'assets/icons/wallet.svg';
import { ReactComponent as ChatIcon } from 'assets/icons/chat.svg';

const menuStructure = [
  {
    title: 'Dashboard',
    link: AppRoute.DASHBOARD,
    icon: <DashboardIcon />,
  },
  {
    title: 'Transactions',
    link: AppRoute.TRANSACTIONS,
    icon: <TransactionIcon />,
  },
  {
    title: 'My Wallets',
    link: AppRoute.MY_WALLETS,
    icon: <WalletIcon />,
  },
  {
    title: 'Invoices',
    link: AppRoute.INVOICES,
    icon: <InvoiceIcon />,
  },
  {
    title: 'Chats',
    link: AppRoute.CHATS,
    icon: <ChatIcon />,
  },
  {
    title: 'Settings',
    link: AppRoute.SETTINGS,
    icon: <SettingsIcon />,
  },
];

const PortalPage: React.FC = () => {
  return (
    <div className="flex">
      <SideBar logoLink={AppRoute.DASHBOARD} structure={menuStructure} />
      <div className="w-full">
        <Header />
        <div className="flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PortalPage;
