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
import { Layout } from 'components/common/Layout/Layout';

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
    title: 'Widgets',
    link: AppRoute.WIDGETS,
    icon: <InvoiceIcon />,
  },
  {
    title: 'Moneybox',
    link: AppRoute.MONEY_BOX,
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
    <div className="flex ">
      <SideBar logoLink={AppRoute.DASHBOARD} structure={menuStructure} />
      <div className="w-full">
        <Header />
        <Layout>
          <Outlet />
        </Layout>
      </div>
    </div>
  );
};

export default PortalPage;
