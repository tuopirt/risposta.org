import IconLogout from "icons/logout.tsx";
import { FreshContext } from "$fresh/server.ts";
import type { DashboardState } from "lib/state.ts";
import { Themes } from "islands/Themes.tsx";
import { getCookies } from "$std/http/cookie.ts";

// deno-lint-ignore require-await
export default async function Dashboard(
  req: Request,
  ctx: FreshContext<DashboardState>,
) {
  const cookies = getCookies(req.headers);
  const user = ctx.state.user;

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="flex-grow flex justify-center items-center">
        <div
          className="w-3/6 bg-white rounded-lg shadow-md p-16 relative"
          style={{ height: "60vh" }}
        >
          <div className="absolute left-0 top-0 h-full w-1/3 bg-blue-500 rounded-l-lg flex justify-center" style={{ zIndex: 1 }}>
            <div className="text-white text-center">
                <img src={user.picture} alt="User Profile" className="w-40 h-40 ml-3 mb-12 mt-24" />
                <h1 className="text-3xl mb-24">{user.name}</h1>
                <div className="mt-4">
                    <a className="btn btn-error text-lg" href="/api/auth/logout" style={{ pointerEvents: 'auto' }}>
                        <IconLogout /> Log out
                    </a>
                </div>
            </div>
        </div>
          <div className="relative pl-8">
            <h1 className="text-4xl ml-64 mb-2">User Profile</h1>
            <hr className="border-b-2 border-gray-400 mb-0 ml-64" />
            <div className="flex items-center gap-12 p-12">
            <div className="flex flex-col ml-52">
                <h1 className="text-3xl mb-4">Email</h1>
                <h2 className="text-lg ml-1 mb-12">{user.email}</h2>
                <h1 className="text-3xl mb-4">Others</h1>
                <hr className="border-b-2 border-gray-400 mb-12 w-full" />
            </div>
            
              {/* Themes button */}
              <div className="absolute right-0 bottom-2 mr-64">
                <Themes theme={cookies.theme ?? "cupcake"} />
              </div>
              {/* Edit button */}
              <div className="absolute right-0 bottom-0 mb-3 mr-96">
                <a className="btn btn-primary mr-3" href="/class/edit_name">Edit User Name</a>
              </div>
            </div>
          </div>
          {/* Back button */}
          <div className="absolute right-0 bottom-0 mb-12 mr-16" >
                <a className="btn btn-primary" href="/class">Go Back</a>
              </div>
        </div>
      </div>
    </div>
  );
}
