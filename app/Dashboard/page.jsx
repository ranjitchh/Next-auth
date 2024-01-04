import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className=" flex min-h-screen flex-col items-center justify-center p-24 ">
      <h1 className=" text-2xl rounded border p-4 bg-green-500 text-white">
        User successfully logged In, Here you can put anything you want.
      </h1>
    </div>
  );
};

export default Dashboard;