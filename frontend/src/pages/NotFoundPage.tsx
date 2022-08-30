import React from 'react';
import { AppRoute } from 'common/enums/app-route.enum';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    // <div classNameName="flex justify-center items-center h-screen notFound">
    //   <h1 classNameName="text-5xl font-extrabold">Error 404 😔</h1>
    // </div>

    <main className="h-screen w-full flex flex-col justify-center items-center bg-blue-dark">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-error px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <Link
          to={AppRoute.HOME}
          className="relative inline-block text-sm font-medium text-error group active:text-orange-500 focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-error group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-blue-dark border border-current">
            Go Home
          </span>
        </Link>
      </button>
    </main>
  );
};

export default NotFoundPage;
