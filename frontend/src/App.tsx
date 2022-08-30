import { Route, Routes } from 'react-router-dom';
import { AppRoute } from 'common/enums/app-route.enum';
import PortalPage from 'pages/PortalPage';
import {
  Chats,
  Dashboard,
  MoneyBox,
  Settings,
  MyWallet,
  Transactions,
  Widgets,
} from 'pages/portalPages';
import NotFoundPage from 'pages/NotFoundPage';

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path={AppRoute.HOME} element={<PortalPage />} />
        <Route path={AppRoute.PORTAL} element={<PortalPage />}>
          <Route index element={<Dashboard />} />
          <Route path={'dashboard'} element={<Dashboard />} />
          <Route path={'transactions'} element={<Transactions />} />
          <Route path={'my-wallets'} element={<MyWallet />} />
          <Route path={'widgets'} element={<Widgets />} />
          <Route path={'money-box'} element={<MoneyBox />} />
          <Route path={'chats'} element={<Chats />} />
          <Route path={'settings'} element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
